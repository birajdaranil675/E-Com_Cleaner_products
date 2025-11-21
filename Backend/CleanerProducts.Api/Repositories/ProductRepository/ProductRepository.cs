using CleanerProducts.Api.Data;
using CleanerProducts.Api.Models;
using CleanerProducts.Api.Repositories.Interfaces.ProductRepository;
using Microsoft.EntityFrameworkCore;

namespace CleanerProducts.Api.Repositories.ProductRepository
{
    public class ProductRepository : IProductRepository
    {
        private readonly MyDbContext _context;

        public ProductRepository(MyDbContext myDbContext)
        {
            _context = myDbContext;
        }

        public async Task<Product> CreateProduct(Product productInput)
        {
            var res = await _context.Products.AddAsync(productInput);
            await _context.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<bool> DeleteProduct(Guid productId)
        {
            var productToBeremoved = await GetProductById(productId);
            var res = _context.Products.Remove(productToBeremoved);
            await _context.SaveChangesAsync();

            return res.Entity != null ? true : false;
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            var res = await _context.Products
                .Include(p=> p.Category)
                .ToListAsync();
            return res;
        }

        public async Task<Product> GetProductById(Guid productId)
        {
            var res = await _context.Products.Include(p=>p.Category).FirstAsync(p=>p.ProductId.Equals(productId));

            if (res == null)
                throw new ArgumentException($"Product with id {productId} not found.");

            return res;
        }

        public async Task<IEnumerable<Product>> SearchProducts(int? categoryId, decimal? minPrice, decimal? maxPrice, string? keyword)
        {
            var query = _context.Products.AsQueryable();

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId.Value);

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(p => p.Name.Contains(keyword) || p.Description.Contains(keyword));

            return await query.Include(p => p.Category).ToListAsync();
        }

        public async Task<Product> UpdateProduct(Product productInput)
        {
            _context.Products.Update(productInput);
            await _context.SaveChangesAsync();

            return productInput;
        }
    }
}
