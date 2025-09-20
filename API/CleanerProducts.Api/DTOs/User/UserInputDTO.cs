namespace CleanerProducts.Api.DTOs.User
{
    public class UserInputDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; } // plain password from frontend
        public string? UserType { get; set; } // or UserType enum if using enum binding
    }
}
