using CleanerProducts.Api.DTOs.Category;
using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.Services.Interfaces.CategoryService
{
    public interface ICategoryServices
    {
        public Task<CategoryOutputDto> CreateCategory(CategoryInputDto categoryInputDto);
        public Task<CategoryOutputDto> UpdateCategory(CategoryInputDto categoryInputDto);
        public Task<IEnumerable<CategoryOutputDto>> GetAllCategories();

        public Task<CategoryOutputDto> GetCategoryById(int id);

        public Task<bool> DeleteCategory(int categoryId);
    }
}
