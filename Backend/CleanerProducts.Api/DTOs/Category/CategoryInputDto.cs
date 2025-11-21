using System.ComponentModel.DataAnnotations;

namespace CleanerProducts.Api.DTOs.Category
{
    public class CategoryInputDto
    {
        [Required]
        public string? Name { get; set; }
    }
}
