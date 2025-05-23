using Microsoft.AspNetCore.Mvc;
using RTC_CMS.Models;

namespace RTC_CMS.Controllers
{
    [Route("roles")]
    public class RoleController : Controller
    {
        IGenericRepo _repo;
        public IActionResult Index()
        {
            return View();
        }
        public RoleController(IGenericRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var roles = await _repo.GetAll<Roles>();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Roles role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _repo.Insert<Roles>(role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] Roles role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _repo.Update<Roles>(role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteByID(int ID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _repo.DeleteById<Roles>(ID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
