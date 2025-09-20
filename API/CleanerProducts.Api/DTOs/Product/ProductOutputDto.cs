using CleanerProducts.Api.DTOs.Category;
using System.ComponentModel.DataAnnotations;

namespace CleanerProducts.Api.DTOs.Product
{
    public class ProductOutputDto
    {
        public Guid ProductId { get; set; }
        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        //public string? CategoryName { get; set; }

        public CategoryOutputDto? Category { get; set; }
    }
}
