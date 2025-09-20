using AutoMapper;
using CleanerProducts.Api.DTOs.Category;
using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.CategoryRepository;
using CleanerProducts.Api.Repositories.Interfaces.ProductRepository;
using CleanerProducts.Api.Services.Interfaces.CategoryService;

namespace CleanerProducts.Api.Services.CategoryServices
{
    public class CategoryService : ICategoryServices
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IProductRepository productRepository)
        {
            _categoryRepository = categoryRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<CategoryOutputDto> CreateCategory(CategoryInputDto categoryInputDto)
        {
            var input = _mapper.Map<Category>(categoryInputDto);
            input.CategoryId = new Random().Next(100000, 10000000);
            var res = await _categoryRepository.CreateCategory(input);

            return _mapper.Map<CategoryOutputDto>(res);
        }

        public async Task<bool> DeleteCategory(int categoryId)
        {
            var productUnderThisCategory = await _productRepository.GetAllProducts();

            var isAnyProducts = productUnderThisCategory.Any(p=> p.CategoryId == categoryId);

            if (isAnyProducts)
                throw new ArgumentException($"Cannot delete this category {categoryId},Prdoucts are associated with this category");
                                       
            return await _categoryRepository.DeleteCategory(categoryId);
        }

        public async Task<IEnumerable<CategoryOutputDto>> GetAllCategories()
        {
            var res = await _categoryRepository.GetAllCategories();
            return _mapper.Map<IEnumerable<CategoryOutputDto>>(res);
        }

        public async Task<CategoryOutputDto> GetCategoryById(int id)
        {
            var res = await _categoryRepository.GetCategoryById(id);

            return _mapper.Map<CategoryOutputDto>(res);
        }

        public async Task<CategoryOutputDto> UpdateCategory(CategoryInputDto categoryInputDto)
        {
            var res = await _categoryRepository.UpdateCategory(_mapper.Map<Category>(categoryInputDto));
            return _mapper.Map<CategoryOutputDto>(res);
        }

    }
}
