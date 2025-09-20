using CleanerProducts.Api.Models;

namespace CleanerProducts.Api.Repositories.Interfaces.CategoryRepository
{
    public interface ICategoryRepository
    {
        public Task<Category> CreateCategory(Category inputCategory);
        public Task<Category> UpdateCategory(Category inputCategory);

        public Task<IEnumerable<Category>> GetAllCategories();

        public Task<Category> GetCategoryById(int id);

        public Task<bool> DeleteCategory(int categoryId);
    }
}
