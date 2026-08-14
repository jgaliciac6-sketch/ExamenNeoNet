using ExamenNeonetApi.Model;
using ExamenNeonetApi.Negocio;
using Microsoft.AspNetCore.Mvc;

namespace ExamenNeonetApi.Controllers
{
	[Route("api/[controller]")]
	public class ClientController : Controller
	{
		[HttpGet]
		[Route("GetClients")]
		public async Task<IActionResult> GetClients()
		{
			List<Cliente> lstCliente = new List<Cliente>();
			lstCliente = await new ClienteN().GetClients();
			return StatusCode(200, lstCliente);
		}

		[HttpPost]
		[Route("SetClient")]
		public async Task<IActionResult> SetClient([FromBody] Cliente objCliente)
		{
			Response respuesta = new Response();

			try
			{
				respuesta = await new ClienteN().CreateCliente(objCliente);

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
