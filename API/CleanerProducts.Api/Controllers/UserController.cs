using CleanerProducts.Api.DTOs.User;
using CleanerProducts.Api.Services.Interfaces.UserService;
using Microsoft.AspNetCore.Mvc;

namespace CleanerProducts.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserServices _userService;
        public UserController(IUserServices userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> AddUserAsync(UserInputDTO userInputDTO)
        {
            var res = await _userService.AddUserAsync(userInputDTO);

            if (res == null)
                return BadRequest();

            return Ok(res);
        }

        [HttpGet("GetAll")]
        public IActionResult GetAllUsers()
        {
            var res = _userService.GetAllUsers();

            return Ok(res);
        }

        [HttpGet("ByEmail")]
        public async Task<UserOutputDTO> GetByEmail(string email)
        {
            var res = await _userService.GetUserByEmail(email);

            return res;
        }

        [HttpPatch]
        public async Task<UserOutputDTO> UpdateUser(UserInputDTO userInputDTO)
        { 
            var res = await _userService.UpdateUser(userInputDTO);

            return res;
        }

        [HttpDelete]
        public async Task<UserOutputDTO> DeleteUser(string userName)
        {
            var res = await _userService.DeleteUser(userName);

            return res;
        }
    }
}
