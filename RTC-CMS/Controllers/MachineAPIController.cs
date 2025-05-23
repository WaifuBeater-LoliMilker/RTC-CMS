using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RTC_CMS.Models;

namespace RTC_CMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineAPIController : ControllerBase
    {
        private readonly IGenericRepo _genericRepo;

        public MachineAPIController(IGenericRepo genericRepo)
        {
            _genericRepo = genericRepo;
        }

        [HttpGet("GetAllMachines")]
        public async Task<IActionResult> GetAllMachines()
        {
            var machines = await _genericRepo.GetAll<MachineAdressPlc>();
            return Ok(machines);
        }
           

    }
}
