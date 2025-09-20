namespace CleanerProducts.Api.Models
{
    public class StoredToken
    {
        public Guid? UserId { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime Expiration { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expiration;
    }
}
