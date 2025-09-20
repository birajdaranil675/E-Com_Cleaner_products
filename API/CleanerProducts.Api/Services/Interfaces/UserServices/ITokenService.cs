using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.Services.Interfaces.UserServices
{
    public interface ITokenService
    {
        string GenerateToken(User user);
        string GenerateRefreshToken(Guid userId);
        Task<string> ValidateRefreshTokenAsync(string refreshToken);
    }
}
