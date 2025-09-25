using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.DTOs.User
{
    public class UserTokenDTO
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? Expiration { get; set; }
        public UserOutputDTO? User { get; set; }
    }
}
