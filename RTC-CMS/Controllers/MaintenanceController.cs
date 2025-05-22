using Microsoft.AspNetCore.Mvc;

namespace RTC_CMS.Controllers
{
    [Route("maintenance")]
    public class MaintenanceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
