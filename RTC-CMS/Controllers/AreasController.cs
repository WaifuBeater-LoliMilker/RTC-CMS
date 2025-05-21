using Microsoft.AspNetCore.Mvc;
using RTC_CMS.Models;

namespace RTC_CMS.Controllers
{
    [Route("areas")]
    public class AreasController : Controller
    {
        IGenericRepo _repo;
        public AreasController(IGenericRepo repo)
        {
            _repo = repo;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var areas = await _repo.GetAll<Areas>();
                return Ok(areas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var area = await _repo.GetById<Areas>(id);
                return Ok(area);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost("post-data")]
        public async Task<IActionResult> PostData([FromBody] Areas area)
        {
            try
            {
                if (area.Id > 0) await _repo.Update(area);
                else await _repo.Insert(area);
                return Ok(area);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool result = await _repo.DeleteById<Areas>(id);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
