using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.UserRepository;
using CleanerProducts.Api.Services.Interfaces.UserServices;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CleanerProducts.Api.Services.UserService
{
    public class TokenService : ITokenService
    {
        private readonly ITokenRepository _tokenRepository;
        private readonly IUserRepository _userRepository;

        public TokenService(ITokenRepository tokenRepository, IUserRepository userRepository)
        {
            _tokenRepository = tokenRepository;
            _userRepository = userRepository;
        }

        public string GenerateToken(User user)
        {
            // Step 1: Create user claims
            var Claim = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.UserType.ToString())
            };

            // Step 2: Create a symmetric security key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecretKey1234567890123456!"));

            // Step 3: Define the credentials to sign the token
            var Credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Step 4: Define the token
            var token = new JwtSecurityToken(
                issuer: "yourdomain.com",
                audience : "yourdomain.com",
                claims: Claim,
                expires: DateTime.Now.AddMinutes(5), // Token valid for 5 minutes
                signingCredentials: Credentials
            );

            // Step 5: Create the token handler
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken(Guid userId)
        {
            var randomBytes = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);

            var refreshToken = Convert.ToBase64String(randomBytes);

            _tokenRepository.Save(userId, refreshToken);

            return refreshToken;
        }

        public async Task<string> ValidateRefreshTokenAsync(string refreshToken)
        {
            var storedToken = _tokenRepository.Get(refreshToken);

            if (storedToken == null || storedToken.IsExpired)
            {
                return string.Empty;
            }

            var user =  await _userRepository.GetUserByIdAsync(storedToken.UserId);

            return GenerateToken(user);
        }
    }
}
