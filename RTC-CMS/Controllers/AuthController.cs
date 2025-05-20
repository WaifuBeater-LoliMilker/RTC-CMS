using Microsoft.AspNetCore.Mvc;

namespace RTC_CMS.Controllers
{
    [Route("")]
    public class AuthController : Controller
    {
        [HttpGet("login")]
        public IActionResult Login()
        {
            return View();
        }
    }
}
