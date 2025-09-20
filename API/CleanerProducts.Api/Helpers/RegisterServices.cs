using CleanerProducts.Api.Repositories.Interfaces.ProductRepository;
using CleanerProducts.Api.Repositories.Interfaces.UserRepository;
using CleanerProducts.Api.Repositories.ProductRepository;
using CleanerProducts.Api.Repositories.UserRepo;
using CleanerProducts.Api.Repositories.UserRepository.UserRepo;
using CleanerProducts.Api.Services.Interfaces.ProductServices;
using CleanerProducts.Api.Services.UserService;
using CleanerProducts.Api.Services.Interfaces.UserServices;
using CleanerProducts.Api.Services.Interfaces.UserService;
using CleanerProducts.Api.Services;
using CleanerProducts.Api.Repositories.Interfaces.CategoryRepository;
using CleanerProducts.Api.Repositories.CategoryRepo;
using CleanerProducts.Api.Services.Interfaces.CategoryService;
using CleanerProducts.Api.Services.CategoryServices;

namespace CleanerProducts.Api.Helpers
{
    public static class RegisterServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserServices, UserServices>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ITokenRepository, TokenRepository>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICategoryServices, CategoryService>();

            return services;
        }
    }
}
