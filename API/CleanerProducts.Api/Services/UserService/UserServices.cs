using AutoMapper;
using CleanerProducts.Api.DTOs.User;
using CleanerProducts.Api.Helpers;
using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.UserRepository;
using CleanerProducts.Api.Services.Interfaces.UserService;

namespace CleanerProducts.Api.Services.UserService
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserServices(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<UserOutputDTO> AddUserAsync(UserInputDTO user)
        {
            if(string.IsNullOrEmpty(user.Password))
                throw new ArgumentNullException("Password can not be null");

            var inputUser = _mapper.Map<User>(user);
            Encryption.CreatePasswordHash(user.Password, out string hash, out string salt);
            inputUser.PasswordHash = hash;
            inputUser.PasswordSalt = salt;
            var newUser = await _userRepository.AddUserAsync(inputUser);

            return _mapper.Map<UserOutputDTO>(newUser);
        }

        public async Task<UserOutputDTO> DeleteUser(string userName)
        {
            var res = await _userRepository.DeleteUserAsync(userName);

            return _mapper.Map<UserOutputDTO>(res);
        }

        public List<UserOutputDTO> GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();

            return _mapper.Map<List<UserOutputDTO>>(users);
        }

        public async Task<UserOutputDTO> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            return _mapper.Map<UserOutputDTO>(user);
        }

        public async Task<UserOutputDTO> UpdateUser(UserInputDTO user)
        {
            var updatedUser = await _userRepository.UpdateUserAsync(_mapper.Map<User>(user));

            return _mapper.Map<UserOutputDTO>(updatedUser);
        }
    }
}
