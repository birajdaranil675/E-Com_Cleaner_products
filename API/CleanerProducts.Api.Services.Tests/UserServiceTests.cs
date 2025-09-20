using AutoMapper;
using CleanerProducts.Api.DTOs.User;
using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.UserRepository;
using CleanerProducts.Api.Services.Interfaces.User;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace CleanerProducts.Api.Services.Tests
{
    [TestClass]
    public class UserServiceTests
    {
        private Mock<IUserRepository>? _userRepositoryMock;
        private Mock<IMapper>? _mockMapper;
        private IUserServices? _userServices;

        [TestInitialize]
        public void Setup()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _mockMapper = new Mock<IMapper>();
            _userServices = new UserServices(_userRepositoryMock.Object, _mockMapper.Object);
        }

        [TestMethod]
        public async Task AddUserAsync_ShouldReturnUserOutputDTO_WhenValidInput()
        {
            var inputDto = new UserInputDTO() { 
                FirstName = "Test",
                LastName = "User",
                Email = "Test@gmail.com",
                Password = "password",
                UserType = "Normal"
            };

            var userEntity = new User(); // entity mapped from inputDto
            var savedUser = new User();  // returned from repository
            var outputDto = new UserOutputDTO { Email = "Test@gmail.com" };

            _mockMapper.Setup(m => m.Map<User>(inputDto)).Returns(userEntity);
            _userRepositoryMock.Setup(r => r.AddUserAsync(It.IsAny<User>())).ReturnsAsync(savedUser);
            _mockMapper.Setup(m => m.Map<UserOutputDTO>(savedUser)).Returns(outputDto);

            // Act
            var result = await _userServices.AddUserAsync(inputDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Test@gmail.com", result.Email);
            _userRepositoryMock.Verify(r => r.AddUserAsync(It.IsAny<User>()), Times.Once);
        }
    }
}
