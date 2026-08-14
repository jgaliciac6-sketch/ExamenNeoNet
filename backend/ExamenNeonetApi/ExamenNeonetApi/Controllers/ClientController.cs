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
	}
}
