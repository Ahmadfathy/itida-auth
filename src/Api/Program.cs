using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Domain.Entities;
using FluentValidation.AspNetCore;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Serilog
builder.Host.UseSerilog((context, config) =>
{
    config.ReadFrom.Configuration(context.Configuration)
          .Enrich.FromLogContext()
          .WriteTo.Console();
});

// Config
var sqlConnectionString = builder.Configuration["SQL__CONNECTION_STRING"] ??
                           builder.Configuration.GetConnectionString("Default") ??
                           "Server=localhost;Database=itida_udb;User Id=sa;Password=Your_strong_password_123!;TrustServerCertificate=True";

var supportedCultures = (builder.Configuration["LOCALIZATION__SUPPORTED_CULTURES"] ?? "en-US,ar-EG")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
var defaultCulture = builder.Configuration["LOCALIZATION__DEFAULT_CULTURE"] ?? "en-US";

// DbContext + Identity
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(sqlConnectionString));

builder.Services.AddIdentityCore<ApplicationUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Lockout.MaxFailedAccessAttempts = 5;
})
    .AddRoles<IdentityRole<string>>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();

// JWT Auth
var issuer = builder.Configuration["JWT__ISSUER"] ?? "https://itida.udb.local";
var audience = builder.Configuration["JWT__AUDIENCE"] ?? "https://itida.udb.local";
var signingKey = builder.Configuration["JWT__SIGNING_KEY"] ?? "dev_signing_key_change_me";
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = key,
        ClockSkew = TimeSpan.FromMinutes(1)
    };
});

builder.Services.AddAuthorization();

// Localization
builder.Services.AddLocalization();
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var cultures = supportedCultures.Select(c => new CultureInfo(c)).ToList();
    options.SupportedCultures = cultures;
    options.SupportedUICultures = cultures;
    options.SetDefaultCulture(defaultCulture);
});

// CORS
var allowedOriginsCsv = builder.Configuration["ALLOWED_ORIGINS"] ?? "http://localhost:5173";
var allowedOrigins = allowedOriginsCsv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("spa", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .WithHeaders("content-type", "authorization")
              .WithMethods("GET", "POST", "PUT", "DELETE")
              .AllowCredentials();
    });
});

// Controllers + ProblemDetails + FluentValidation
builder.Services.AddControllers()
    .AddDataAnnotationsLocalization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddFluentValidationAutoValidation();

var app = builder.Build();

// Middleware
app.UseSerilogRequestLogging();
app.Use((ctx, next) =>
{
    ctx.Response.Headers["X-Content-Type-Options"] = "nosniff";
    ctx.Response.Headers["Referrer-Policy"] = "no-referrer";
    ctx.Response.Headers["Permissions-Policy"] = "geolocation=()";
    return next();
});

var locOptions = app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>();
app.UseRequestLocalization(locOptions.Value);

app.UseCors("spa");
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/healthz", () => Results.Ok(new { status = "ok" }));
app.MapGet("/readiness", () => Results.Ok(new { ready = true }));

// Placeholder routes to be implemented
app.MapControllers();

app.Run();
