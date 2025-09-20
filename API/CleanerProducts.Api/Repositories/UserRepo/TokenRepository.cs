using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.UserRepository;
using Microsoft.Extensions.Caching.Memory;

namespace CleanerProducts.Api.Repositories.UserRepository.UserRepo
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IMemoryCache _cache;


        public TokenRepository(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }


        public StoredToken Get(string refreshToken)
        {
            if (_cache.TryGetValue(refreshToken, out StoredToken storedToken))
            {
                return storedToken;
            }

            return new StoredToken();
        }

        public void Save(Guid userId, string refreshToken)
        {
            _cache.Set(refreshToken, new StoredToken { UserId = userId, Expiration = DateTime.UtcNow.AddHours(1), RefreshToken = refreshToken});
        }
    }
}
