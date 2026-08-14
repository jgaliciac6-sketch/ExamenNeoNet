using ExamenNeonetApi.Model;
using ExamenNeonetApi.Negocio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExamenNeonetApi.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	public class SaleController : Controller
	{
		[HttpGet]
		[Route("GetSalesByClient/{cliId}")]
		public async Task<IActionResult> GetSalesByClient(int cliId)
		{
			List<Venta> lstVentas = new List<Venta>();
			lstVentas = await new VentaN().GetSalesByClient(cliId);
			return StatusCode(200, lstVentas);
		}

		[HttpPost]
		[Route("SetSales/{cliId}")]
		public async Task<IActionResult> SetSalesByClient([FromBody] List<DetalleVenta> lstDetalle,  int cliId)
		{
			Response respuesta = new Response();

			try
			{
				respuesta = await new VentaN().CreateSale(cliId, lstDetalle);

				if (!respuesta.success)
				{
					return StatusCode(respuesta.code, new { msg = respuesta.message });
				}

				return StatusCode(200, new { msg = "Operación exitosa" });
			}
			catch (Exception e)
			{
				return StatusCode(500, new { msg = e.Message });
			}
		}
	}
}
