using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.Repositories.Interfaces.UserRepository
{
    public interface ITokenRepository
    {
        StoredToken Get(string refreshToken);
        void Save(Guid userId, string refreshToken);
    }
}
