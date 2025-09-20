namespace CleanerProducts.Api.DTOs.User
{
    public class UserOutputDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? UserType { get; set; } // Enum as string
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
