using Microsoft.AspNetCore.Mvc;
using Serilog;
using LoggingService.Models;

namespace LoggingService.Controllers
{
    [ApiController]
    [Route("logs")]
    public class LogController : ControllerBase
    {
        [HttpPost]
        public IActionResult ReceiveLog([FromBody] LogRequest request)
        {
            Log.Information(
                "Service: {Service}, Level: {Level}, Message: {Message}, Timestamp: {Timestamp}",
                request.Service,
                request.Level,
                request.Message,
                request.Timestamp
            );

            return Ok(new { status = "logged" });
        }
    }
}
