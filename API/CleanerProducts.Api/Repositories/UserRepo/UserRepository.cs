using CleanerProducts.Api.Data;
using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.UserRepository;
using Microsoft.EntityFrameworkCore;

namespace CleanerProducts.Api.Repositories.UserRepo
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _myDbContext;
        public UserRepository(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }
        public async Task<User> AddUserAsync(User user)
        {
            if(user == null)
                throw new ArgumentNullException("user is null");

            if (user.Email == null)
                throw new ArgumentNullException("Username can not be null is null");

            var existingUser = GetUser(user.Email);

            if (existingUser != null)
                throw new ArgumentException($"User with {user.Email} already exists...");
            
            user.Id = Guid.NewGuid();

            var res = await _myDbContext.Users.AddAsync(user);

            await _myDbContext.SaveChangesAsync();


            if (res == null)
                throw new ArgumentException($"Add user failed for user : {user.Email}");

            return res.Entity;
        }

        public async Task<User> DeleteUserAsync(string email)
        {
            var existingUser = GetUser(email);

            if (existingUser == null)
                throw new ArgumentException($"User with {email} does not exists...");

            var removedUser = _myDbContext.Users.Remove(existingUser);
            await _myDbContext.SaveChangesAsync();

            return removedUser.Entity;
        }

        public List<User> GetAllUsers()
        {
            var users = _myDbContext.Users;

            return users.ToList();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await _myDbContext.Users
                                        .FirstOrDefaultAsync(u => u.Email != null && u.Email.ToLower() == email.ToLower());

            if (user == null)
                return new User();

            return user;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            if (user.Email == null)
                throw new ArgumentException("Username can not be null..");
            var userToBeUpdated = await _myDbContext.Users
                                        .FirstOrDefaultAsync(u => u.Email != null && u.Email.ToLower() == user.Email.ToLower());
            if (userToBeUpdated == null)
                throw new ArgumentException($"User with email id {user.Email} not found in records.");

            userToBeUpdated.FirstName = user.FirstName;
            userToBeUpdated.LastName = user.LastName;
            userToBeUpdated.Email = user.Email;
            userToBeUpdated.UserType = user.UserType;
            userToBeUpdated.UpdatedAt = DateTime.UtcNow;

            _myDbContext.SaveChanges();

            return userToBeUpdated;
        }

        private User? GetUser(string userName)
        {
            var user = GetAllUsers().Find(user=> user.Email != null && user.Email.Equals(userName));

            return user;
        }

        public async Task<User> GetUserByIdAsync(Guid? userId)
        {
            return await _myDbContext.Users.FindAsync(userId) ?? new User();
        }
    }
}
