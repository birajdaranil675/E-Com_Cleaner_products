using CleanerProducts.Api.DTOs.User;
using CleanerProducts.Api.Services.Interfaces.UserServices;
using Microsoft.AspNetCore.Mvc;

namespace CleanerProducts.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;
        public AuthController(IAuthService authService, ITokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserTokenDTO>> Login([FromBody] UserInputDTO userInputDTO)
        {
            var result = await _authService.Login(userInputDTO);

            if (result != null)
            {
                return result;
            }
            else
            {
                return Unauthorized("Invalid email or password");
            }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshAsync([FromBody] string refreshToken)
        {
            var newToken = await _tokenService.ValidateRefreshTokenAsync(refreshToken);

            if(string.IsNullOrEmpty(newToken))
                return Unauthorized("Invalid or expired refresh token");

            return Ok(newToken);
        }
    }
}
