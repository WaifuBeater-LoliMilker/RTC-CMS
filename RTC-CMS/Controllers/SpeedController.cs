using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace RTC_CMS.Controllers
{
    [Route("speed")]
    public class SpeedController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("speed-chart")]
        public IActionResult SpeedChart()
        {
            var today = DateTime.Today;
            var now = DateTime.Now;
            var pointCount = (int)(now - today).TotalMinutes;

            var conveyorData = new Dictionary<string, List<object[]>>();

            for (int conveyor = 1; conveyor <= 4; conveyor++)
            {
                var data = new List<object[]>();

                for (int i = 0; i < pointCount; i++)
                {
                    var time = today.AddMinutes(i);
                    double speed;

                    var hour = time.Hour + time.Minute / 60.0;

                    if (hour < 6)
                    {
                        speed = 0;
                    }
                    else if (hour >= 6 && hour < 6.1)
                    {
                        // Tăng tuyến tính từ 0 -> 0.7 trong 1 giờ
                        speed = (hour - 6) * 0.7;
                    }
                    else if (hour >= 7 && hour < 18)
                    {
                        speed = 0.7;
                    }
                    else if (hour >= 18 && hour < 18.1)
                    {
                        // Giảm tuyến tính từ 0.7 -> 0 trong 1 giờ
                        speed = (18.1 - hour) * 0.7;
                    }
                    else
                    {
                        speed = 0.7;
                    }

                    // Làm tròn 1 chữ số sau dấu phẩy
                    speed = Math.Round(speed, 2);

                    data.Add(new object[] { time.ToString("yyyy-MM-dd HH:mm:ss"), speed });
                }

                conveyorData.Add("Conveyor " + conveyor, data);
            }

            return Ok(conveyorData);
        }

    }
}
