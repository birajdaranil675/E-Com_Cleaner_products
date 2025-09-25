using Microsoft.Extensions.Options;
using System;
using System.ComponentModel.DataAnnotations;

namespace CleanerProducts.Api.Models
{
    public class Product
    {
        public Guid ProductId { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        public int CategoryId { get; set; }

        public Category? Category { get; set; }

        public DateTime CreatedDate = DateTime.UtcNow;

        public DateTime UpdatedDate = DateTime.UtcNow;
    }
}
