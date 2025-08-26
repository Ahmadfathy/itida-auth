using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace Api.Controllers;

[ApiController]
[Route("profile")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly IStringLocalizer<ProfileController> _localizer;
    public ProfileController(IStringLocalizer<ProfileController> localizer)
    {
        _localizer = localizer;
    }

    [HttpGet]
    public IActionResult GetProfile()
    {
        // Placeholder CRM mapping response
        var result = new
        {
            company = new { name = "", ucr = "", taxRegistrationNumber = "", iprLicenseNumber = "", office = new { id = "", label = "" } },
            lookups = new { },
            meta = new { etag = "W/\"placeholder\"" }
        };
        return Ok(result);
    }

    [HttpPut]
    public IActionResult UpdateProfile([FromBody] object body)
    {
        Response.Headers["ETag"] = "W/\"placeholder\"";
        return Ok(new { auditId = Guid.NewGuid(), company = body, meta = new { etag = "W/\"placeholder\"" } });
    }
}
