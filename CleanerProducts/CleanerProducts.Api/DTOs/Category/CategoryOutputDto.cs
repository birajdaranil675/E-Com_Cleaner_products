using System.ComponentModel.DataAnnotations;

namespace CleanerProducts.Api.DTOs.Category
{
    public class CategoryOutputDto
    {
        public int CategoryId { get; set; }

        public string? Name { get; set; }
    }
}
