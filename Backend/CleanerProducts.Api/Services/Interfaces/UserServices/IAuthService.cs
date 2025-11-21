using CleanerProducts.Api.DTOs.User;

namespace CleanerProducts.Api.Services.Interfaces.UserServices
{
    public interface IAuthService
    {
        Task<UserTokenDTO> Login(UserInputDTO userInputDTO);
    }
}
