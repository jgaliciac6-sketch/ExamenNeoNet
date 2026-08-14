using ExamenNeonetApi.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExamenNeonetApi.Utils
{
	public class JwtUtils
	{
		private readonly IConfiguration _configuration;

		public JwtUtils(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public string GenerateToken(Usuario usuario)
		{
			string secretKey =
				_configuration["Jwt:SecretKey"]!;

			string issuer =
				_configuration["Jwt:Issuer"]!;

			string audience =
				_configuration["Jwt:Audience"]!;

			int expirationMinutes =
				_configuration.GetValue<int>(
					"Jwt:ExpirationMinutes"
				);

			var claims = new[]
			{
				new Claim(
					"USRId",
					usuario.USRId.ToString()
				),

				new Claim(
					"USRNombre",
					usuario.USRNombre
				),

				new Claim(
					JwtRegisteredClaimNames.Jti,
					Guid.NewGuid().ToString()
				)
			};

			var key = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(secretKey)
			);

			var credentials = new SigningCredentials(
				key,
				SecurityAlgorithms.HmacSha256
			);

			var token = new JwtSecurityToken(
				issuer: issuer,
				audience: audience,
				claims: claims,
				expires: DateTime.UtcNow
					.AddMinutes(expirationMinutes),
				signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler()
				.WriteToken(token);
		}
	}
}