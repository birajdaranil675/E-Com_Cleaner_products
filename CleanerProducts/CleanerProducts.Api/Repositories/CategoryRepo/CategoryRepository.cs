using CleanerProducts.Api.Data;
using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.CategoryRepository;
using Microsoft.EntityFrameworkCore;

namespace CleanerProducts.Api.Repositories.CategoryRepo
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly MyDbContext _myDbContext;

        public CategoryRepository(MyDbContext myDbContext)
        {
            _myDbContext = myDbContext;
        }

        public async Task<Category> CreateCategory(Category inputCategory)
        {
            var res = await _myDbContext.Categories.AddAsync(inputCategory);
            await _myDbContext.SaveChangesAsync();

            return res.Entity;
        }

        public async Task<bool> DeleteCategory(int categoryId)
        {
            var categoryToBeRemoved = await GetCategoryById(categoryId);
            var res = _myDbContext.Categories.Remove(categoryToBeRemoved);
            await  _myDbContext.SaveChangesAsync();
            return res.Entity != null ? true:false ;
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _myDbContext.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            var res = await _myDbContext.Categories.FindAsync(id);

            if (res == null)
                throw new ArgumentException($"Category with id {id} not found.");

            return res;
        }

        public async Task<Category> UpdateCategory(Category inputCategory)
        {
            var res = _myDbContext.Categories.Update(inputCategory);
            await _myDbContext.SaveChangesAsync();

            return res.Entity;
        }
    }
}
