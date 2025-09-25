using AutoMapper;
using CleanerProducts.Api.DTOs.User;
using CleanerProducts.Api.Helpers;
using CleanerProducts.Api.Repositories.Interfaces.UserRepository;
using CleanerProducts.Api.Services.Interfaces.UserServices;

namespace CleanerProducts.Api.Services.UserService
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthService(IUserRepository userRepository, ITokenService tokenService, IMapper mapper)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task<UserTokenDTO> Login(UserInputDTO userInputDTO)
        {
            if (string.IsNullOrEmpty(userInputDTO.Email))
            {
                throw new ArgumentException("Email cannot be null or empty", nameof(userInputDTO.Email));
            }

            var user = await _userRepository.GetUserByEmailAsync(userInputDTO.Email);

            if(user == null)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            // Convert PasswordHash and PasswordSalt from Base64 strings to byte arrays
            var passwordHashBytes = Convert.FromBase64String(user.PasswordHash ?? "");
            var passwordSaltBytes = Convert.FromBase64String(user.PasswordSalt ?? "");

            var token = string.Empty;
            var refreshToken = string.Empty;

            if (Encryption.VerifyPassword(userInputDTO.Password ?? "", user.PasswordHash ?? "", user.PasswordSalt ?? ""))
            {
               token =  _tokenService.GenerateToken(user);
               refreshToken = _tokenService.GenerateRefreshToken(user.Id);
            }

            return new UserTokenDTO { 
                Token = token,
                RefreshToken = refreshToken,
                User = _mapper.Map<UserOutputDTO>(user)
            };
        }

        
    }
}
