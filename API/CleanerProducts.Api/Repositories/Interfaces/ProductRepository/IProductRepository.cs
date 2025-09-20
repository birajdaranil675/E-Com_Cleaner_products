using CleanerProducts.Api.DTOs.Product;
using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.Repositories.Interfaces.ProductRepository
{
    public interface IProductRepository
    {
        public Task<Product> CreateProduct(Product productInput);

        public Task<Product> UpdateProduct(Product productInput);

        public Task<bool> DeleteProduct(Guid productId);

        public Task<Product> GetProductById(Guid productId);

        public Task<IEnumerable<Product>> GetAllProducts();

        public Task<IEnumerable<Product>> SearchProducts(int? categoryId, decimal? minPrice, decimal? maxPrice, string? keyword);
    }
}
