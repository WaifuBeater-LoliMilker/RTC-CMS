using Microsoft.AspNetCore.Mvc;

namespace RTC_CMS.Controllers
{
    [Route("conveyor_detail")]
    public class ConveyorDetailController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
