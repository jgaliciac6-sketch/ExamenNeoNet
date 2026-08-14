using ExamenNeonetApi.Datos;
using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using RegistroSucursales.Datos;

namespace ExamenNeonetApi.Negocio
{
	public class LoginN
	{
		public async Task<Usuario?> Login(Usuario objUser)
		{
			using (SqlConnection conn =
				new SqlConnection(new Conexion().GetCadenaSQL()))
			{
				await conn.OpenAsync();

				try
				{
					Usuario? usuario = await new LoginDT().Login(
						conn,
						objUser.USRId,
						objUser.USRPassword
					);

					return usuario;
				}
				catch (Exception)
				{
					return null;
				}
			}
		}
	}
}