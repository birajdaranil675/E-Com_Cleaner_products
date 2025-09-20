using CleanerProducts.Api.DTOs.Product;
using CleanerProducts.Api.Models;
using System.Xml.Linq;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace CleanerProducts.Api.Services.Interfaces.ProductServices
{
    public interface IProductService
    {
        public Task<ProductOutputDto> CreateProduct(ProductInputDto productInputDto);

        public Task<ProductOutputDto> UpdateProduct(ProductInputDto productInputDto);

        public Task<bool> DeleteProduct(Guid productId);

        public Task<ProductOutputDto> GetProductById(Guid productId);

        public Task<IEnumerable<ProductOutputDto>> GetAllProducts();

        public Task<IEnumerable<ProductOutputDto>> SearchProducts(int? categoryId, decimal? minPrice, decimal? maxPrice, string? keyword);
    }
}
