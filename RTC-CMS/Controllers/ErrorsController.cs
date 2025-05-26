using Microsoft.AspNetCore.Mvc;

namespace RTC_CMS.Controllers
{
    [Route("errors")]
    public class ErrorsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
