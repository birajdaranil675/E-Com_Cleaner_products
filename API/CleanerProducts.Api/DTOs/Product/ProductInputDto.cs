using CleanerProducts.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace CleanerProducts.Api.DTOs.Product
{
    public class ProductInputDto
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        public int CategoryId { get; set; }

    }
}
