using ExamenNeonetApi.Datos;
using ExamenNeonetApi.Model;
using ExamenNeonetApi.Negocio;
using Microsoft.AspNetCore.Mvc;

namespace ExamenNeonetApi.Controllers
{
	[Route("api/[controller]")]
	public class ProductController : Controller
	{
		[HttpGet]
		[Route("GetProduct")]
		public async Task<IActionResult> GetProduct()
		{
			List<Product> lstEmpresa = new List<Product>();
			lstEmpresa = await new ProductN().GetProduct();
			return StatusCode(200, lstEmpresa);
		}
	}
}
