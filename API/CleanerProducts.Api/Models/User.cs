
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CleanerProducts.Api.Models
{
    [Table("UsersTable")]
    public class User
    {
        //Users Table: Id, Username, Email, PasswordHash, PasswordSalt, UserType(Admin/Normal), CreatedAt, UpdatedAt.

        [Key]
        public Guid Id { get; set; }
        [MaxLength(100)]
        public string? FirstName { get; set; }
        [MaxLength(100)]
        public string? LastName { get; set; }
        [Required]
        [MaxLength(255)]
        public string? Email { get; set; }
        [Required]
        public string? PasswordSalt { get; set; }
        [Required]
        public string? PasswordHash { get; set; }
        [Required]
        public UserType UserType { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum UserType
    {
        Admin = 0,
        Normal = 1
    }
}
