using Microsoft.AspNetCore.Mvc;

namespace ExamenNeonetApi.Controllers
{
	public class ClientController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
