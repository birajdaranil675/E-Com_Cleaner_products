using CleanerProducts.Api.DTOs.Product;
using CleanerProducts.Api.Services.Interfaces.ProductServices;
using Microsoft.AspNetCore.Mvc;

namespace CleanerProducts.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<ProductOutputDto> CreateProduct(ProductInputDto productInput)
        { 
            var res = await _productService.CreateProduct(productInput);

            return res;
        }

        [HttpPatch]
        public async Task<ActionResult<ProductOutputDto>> UpdateProduct(ProductInputDto productInputDto)
        {
           var res = await _productService.UpdateProduct(productInputDto);
           
            if(res == null)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var res = await _productService.DeleteProduct(id);

            if (!res)
                return NotFound();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductOutputDto>> GetProductById(Guid id)
        { 
            var res = await _productService.GetProductById(id);

            if (res == null)
                return NotFound();

            return Ok(res);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ProductOutputDto>>> GetAllProducts()
        {
            var res = await _productService.GetAllProducts();

            if (res == null)
                return NotFound();

            return Ok(res);
        }

        [HttpGet("search")]
        public async Task<ActionResult> SearchProducts([FromQuery]int? categoryId, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice, [FromQuery] string? keyword)
        {
            var res = await _productService.SearchProducts(categoryId, minPrice, maxPrice, keyword);

            if (res == null)
                return NotFound();

            return Ok(res);
        }

    }
}
