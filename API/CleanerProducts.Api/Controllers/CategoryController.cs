using CleanerProducts.Api.DTOs.Category;
using CleanerProducts.Api.Services.Interfaces.CategoryService;
using Microsoft.AspNetCore.Mvc;

namespace CleanerProducts.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryServices _services;

        public CategoryController(ICategoryServices categoryServices)
        {
            _services = categoryServices;
        }

        [HttpPost]
        public async Task<ActionResult<CategoryOutputDto>> CreateCategory(CategoryInputDto categoryInputDto)
        {
            var res = await _services.CreateCategory(categoryInputDto);

            return Ok(res);
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<CategoryOutputDto>>> GetAllCategories()
        {
            return Ok(await _services.GetAllCategories());
        }

        [HttpGet]
        public async Task<ActionResult<CategoryOutputDto>> GetCategoryById(int id)
        {
            return Ok( await _services.GetCategoryById(id));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            var res = await _services.DeleteCategory(categoryId);

            if(!res)
                return NotFound();
            return NoContent();
        }
    }
}
