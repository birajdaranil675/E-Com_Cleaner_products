using AutoMapper;
using CleanerProducts.Api.DTOs.Product;
using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.CategoryRepository;
using CleanerProducts.Api.Repositories.Interfaces.ProductRepository;
using CleanerProducts.Api.Services.Interfaces.ProductServices;

namespace CleanerProducts.Api.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryRepository;

        public ProductService(IProductRepository productRepository, IMapper mapper, ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }
        public async Task<ProductOutputDto> CreateProduct(ProductInputDto productInputDto)
        {
            if (productInputDto == null) 
                throw new ArgumentNullException("Product can not be null...");

            if(productInputDto.Price <= 0)
                throw new ArgumentNullException("Product price should be greater than 0");

            if(productInputDto.Quantity <= 0)
                throw new ArgumentNullException("Product Quantity should be greater than 0");

            var products = await GetAllProducts();

            var isAnyProductWithSameName = products.Any(p => p.Category.CategoryId == productInputDto.CategoryId && p.Name.Equals(productInputDto.Name));

            if (isAnyProductWithSameName)
                throw new ArgumentException($"Product with name {productInputDto.Name} within the category {productInputDto.CategoryId} already exists...");

            var input = _mapper.Map<Product>(productInputDto);

            input.ProductId = Guid.NewGuid();
            input.Category = await _categoryRepository.GetCategoryById(productInputDto.CategoryId);

            

            var res =  await _productRepository.CreateProduct(input);

            return _mapper.Map<ProductOutputDto>(res);
        }

        public async Task<bool> DeleteProduct(Guid productId)
        {
           return await _productRepository.DeleteProduct(productId);
        }

        public async Task<IEnumerable<ProductOutputDto>> GetAllProducts()
        {
            var res = await _productRepository.GetAllProducts();
            return _mapper.Map<IEnumerable<ProductOutputDto>>(res);
        }

        public async Task<ProductOutputDto> GetProductById(Guid productId)
        {
            var res = await _productRepository.GetProductById(productId);
            return _mapper.Map<ProductOutputDto>(res);
        }

        public async Task<IEnumerable<ProductOutputDto>> SearchProducts(int? categoryId, decimal? minPrice, decimal? maxPrice, string? keyword)
        {
            var res = await _productRepository.SearchProducts(categoryId, minPrice, maxPrice, keyword);
            return _mapper.Map<IEnumerable<ProductOutputDto>>(res);
        }

        public async Task<ProductOutputDto> UpdateProduct(ProductInputDto productInputDto)
        {
            var res = await _productRepository.UpdateProduct(_mapper.Map<Product>(productInputDto));
            return _mapper.Map<ProductOutputDto>(res);
        }
    }
}
