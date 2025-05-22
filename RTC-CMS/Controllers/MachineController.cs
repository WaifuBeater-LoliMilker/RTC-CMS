using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RTC_CMS.Models;

namespace RTC_CMS.Controllers
{
	[Route("machines")]
	public class MachineController : Controller
	{
		IGenericRepo _repo;
		public MachineController(IGenericRepo repo)
		{
			_repo = repo;
		}
		public IActionResult Index()
		{
            ViewData["Title"] = "Machines";
            return View();
		}

		[HttpGet("get-all")]
		public async Task<IActionResult> GetAll()
        {
            try
			{
                var machines = await _repo.GetAll<Machines>();
                return Ok(machines);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("create")]
		public async Task<IActionResult> Create([FromBody] Machines machine)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			try
			{
				var machines = await _repo.Insert<Machines>(machine);
				return Ok(machines);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
		[HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] Machines machine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var machines = await _repo.Update<Machines>(machine);
                return Ok(machines);
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
                var result = await _repo.DeleteById<Machines>(ID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
