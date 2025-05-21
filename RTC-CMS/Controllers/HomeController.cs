using Microsoft.AspNetCore.Mvc;

namespace RTC_CMS.Controllers
{
    [Route("home")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }




    }
}
