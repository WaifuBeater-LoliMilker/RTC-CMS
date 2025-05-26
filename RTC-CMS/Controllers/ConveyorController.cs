using Microsoft.AspNetCore.Mvc;

namespace RTC_CMS.Controllers
{
    [Route("conveyor")]
    public class ConveyorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
