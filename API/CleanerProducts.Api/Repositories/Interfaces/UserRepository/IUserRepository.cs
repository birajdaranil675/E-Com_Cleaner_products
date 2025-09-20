using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.Repositories.Interfaces.UserRepository
{
    public interface IUserRepository
    {
        public Task<User> AddUserAsync(User user);
        public Task<User> UpdateUserAsync(User user);
        public Task<User> DeleteUserAsync(string userName);
        public Task<User> GetUserByEmailAsync(string name);
        public Task<User> GetUserByIdAsync(Guid? userId);
        public List<User> GetAllUsers();
    }
}
