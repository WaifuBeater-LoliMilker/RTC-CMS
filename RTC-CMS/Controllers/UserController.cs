using Microsoft.AspNetCore.Mvc;
using RTC_CMS.Models;

namespace RTC_CMS.Controllers
{
    [Route("users")]
    public class UserController : Controller
    {
        IGenericRepo _repo;
        public UserController(IGenericRepo repo)
        {
            _repo = repo;
        }
        public IActionResult Index()
        {
            ViewData["Title"] = "Users";
            return View();
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var users = await _repo.GetAll<Users>();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Users user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _repo.Insert<Users>(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] Users user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _repo.Update<Users>(user);
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
                var result = await _repo.DeleteById<Users>(ID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

