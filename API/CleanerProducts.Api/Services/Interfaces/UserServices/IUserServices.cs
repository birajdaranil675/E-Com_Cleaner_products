using CleanerProducts.Api.DTOs.User;
using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.Services.Interfaces.UserService
{
    public interface IUserServices
    {
        public Task<UserOutputDTO> AddUserAsync(UserInputDTO user);
        public Task<UserOutputDTO> UpdateUser(UserInputDTO user);
        public Task<UserOutputDTO> DeleteUser(string userName);
        public Task<UserOutputDTO> GetUserByEmail(string email);
        public List<UserOutputDTO> GetAllUsers();
    }
}
