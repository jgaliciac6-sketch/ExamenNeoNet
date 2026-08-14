using ExamenNeonetApi.Model;
using ExamenNeonetApi.Negocio;
using ExamenNeonetApi.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExamenNeonetApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class LoginController : ControllerBase
	{
		private readonly IConfiguration _configuration;

		public LoginController(
			IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[AllowAnonymous]
		[HttpPost]
		[Route("Login")]
		public async Task<IActionResult> Login(
			[FromBody] Usuario objUser)
		{
			try
			{
				Usuario? usuario =
					await new LoginN().Login(objUser);

				if (usuario == null)
				{
					return Unauthorized(new
					{
						msg = "Usuario o contraseña incorrectos"
					});
				}

				JwtUtils jwt =
					new JwtUtils(_configuration);

				string token =
					jwt.GenerateToken(usuario);

				return Ok(new
				{
					token = token,
					id = usuario.USRId,
					nombre = usuario.USRNombre
				});
			}
			catch (Exception e)
			{
				return StatusCode(500, new
				{
					msg = e.Message
				});
			}
		}
	}
}