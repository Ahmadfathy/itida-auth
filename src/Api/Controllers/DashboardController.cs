using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace Api.Controllers;

[ApiController]
[Route("dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IStringLocalizer<DashboardController> _localizer;
    public DashboardController(IStringLocalizer<DashboardController> localizer)
    {
        _localizer = localizer;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var now = DateTime.UtcNow;
        var result = new
        {
            profileSummary = new
            {
                name = "",
                ucr = "",
                taxRegistrationNumber = "",
                iprLicenseNumber = "",
                office = new { id = "", label = "" }
            },
            status = new
            {
                profileStatusCode = "0",
                profileStatusLabel = _localizer["Incomplete"],
                lastUpdatedAt = now,
                pendingFields = new[] { "industry", "companySize" },
                completenessPercent = 0
            },
            actions = new[]
            {
                new { key = "update-missing-fields", label = _localizer["Update missing fields"], href = "/profile" }
            },
            notices = new[]
            {
                new { severity = "info", message = _localizer["Your profile is under review."] }
            }
        };
        return Ok(result);
    }
}
