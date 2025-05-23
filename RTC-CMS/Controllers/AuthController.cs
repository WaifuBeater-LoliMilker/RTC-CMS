using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RTC_CMS.Common;
using RTC_CMS.Models;
using System.Security.Claims;

namespace RTC_CMS.Controllers
{
    [Route("")]
    public class AuthController(IGenericRepo repo) : Controller
    {
        private IGenericRepo _repo = repo;

        [HttpGet("login")]
        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromForm] string username, [FromForm] string password)
        {
            try
            {
                //var user = await _repo.FindModel<Users>
                //    (u => u.UserName == username && u.Password == password);
                //if (user == null) return Unauthorized("Sai tên đăng nhập hoặc mật khẩu");



                //var claims = new List<Claim> {
                //    new (ClaimTypes.Name, user.UserName),
                //    new (ClaimTypes.Role, user.RoleId.ToString()!)
                //};


                var user = new Users()
                {
                    Id = 1,
                    UserName = "Admin",
                    FullName= "Lê Minh Khôi",
                    RoleId = 1

                };
                var claims = new List<Claim> {
                    new (ClaimTypes.Name, "Lê Minh KHôi"),
                    new (ClaimTypes.Role, "Admin")
                };


                var identity = new ClaimsIdentity(claims, "RTC_CMS_Cookie"); //cookie name from Program.cs
                var principal = new ClaimsPrincipal(identity);
                await HttpContext.SignInAsync("RTC_CMS_Cookie", principal);
                HttpContext.Session.SetObject<Users>("User", user);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("RTC_CMS_Cookie");
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }

        [HttpGet("unauthorized")]
        [AllowAnonymous]
        public IActionResult UnauthorizedView()
        {
            return View();
        }
    }
}