using Microsoft.AspNetCore.Mvc;

namespace AgriRegistry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloWorldController : ControllerBase
    {
        [HttpGet]
        public IActionResult HelloWorld()
        {
            return Ok("Hello World!");
        }
    }
}
