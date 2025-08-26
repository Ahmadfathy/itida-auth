using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.IdentityModel.Tokens;

namespace Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;
    private readonly IStringLocalizer<AuthController> _localizer;

    public AuthController(UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        AppDbContext db,
        IConfiguration config,
        IStringLocalizer<AuthController> localizer)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _db = db;
        _config = config;
        _localizer = localizer;
    }

    public record RegisterRequest(string Email, string Password, string? PreferredCulture);
    public record LoginRequest(string Email, string Password);

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var user = new ApplicationUser
        {
            Id = Guid.NewGuid().ToString(),
            UserName = request.Email,
            Email = request.Email,
            PreferredCulture = string.IsNullOrWhiteSpace(request.PreferredCulture) ? "en-US" : request.PreferredCulture!
        };
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(new ProblemDetails
            {
                Title = _localizer["RegistrationFailed"],
                Detail = string.Join("; ", result.Errors.Select(e => e.Description)),
                Status = StatusCodes.Status400BadRequest,
                Type = "about:blank",
                Extensions = { ["code"] = "REGISTRATION_FAILED" }
            });
        }
        return Ok(new { user = new { id = user.Id, email = user.Email, preferredCulture = user.PreferredCulture } });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
        {
            await Task.Delay(Random.Shared.Next(50, 150));
            return Unauthorized(new ProblemDetails
            {
                Title = _localizer["InvalidCredentials"],
                Status = StatusCodes.Status401Unauthorized,
                Extensions = { ["code"] = "INVALID_CREDENTIALS" }
            });
        }

        var passwordOk = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!passwordOk)
        {
            return Unauthorized(new ProblemDetails
            {
                Title = _localizer["InvalidCredentials"],
                Status = StatusCodes.Status401Unauthorized,
                Extensions = { ["code"] = "INVALID_CREDENTIALS" }
            });
        }

        user.LastLoginAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        var tokens = GenerateTokens(user);
        return Ok(new
        {
            accessToken = tokens.AccessToken,
            refreshToken = tokens.RefreshToken,
            user = new { id = user.Id, email = user.Email, preferredCulture = user.PreferredCulture }
        });
    }

    private (string AccessToken, string RefreshToken) GenerateTokens(ApplicationUser user)
    {
        var issuer = _config["JWT__ISSUER"] ?? "https://itida.udb.local";
        var audience = _config["JWT__AUDIENCE"] ?? "https://itida.udb.local";
        var signingKey = _config["JWT__SIGNING_KEY"] ?? "dev_signing_key_change_me";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty)
        };
        var token = new JwtSecurityToken(issuer, audience, claims, expires: DateTime.UtcNow.AddMinutes(15), signingCredentials: creds);
        var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

        var refreshToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray()) + Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        var hash = Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(refreshToken)));
        _db.RefreshTokens.Add(new RefreshToken
        {
            UserId = user.Id,
            TokenHash = hash,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(7)
        });
        _db.SaveChanges();
        return (accessToken, refreshToken);
    }
}
