using ExamenNeonetApi.Datos;
using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using RegistroSucursales.Datos;

namespace ExamenNeonetApi.Negocio
{
	public class ClienteN
	{
		public async Task<List<Cliente>> GetClients()
		{
			List<Cliente> lstCliente = new List<Cliente>();

			using (SqlConnection conn = new SqlConnection(new Conexion().GetCadenaSQL()))
			{
				await conn.OpenAsync();

				try
				{
					lstCliente = await new ClientDT().GetClient(conn);

					return lstCliente;
				}
				catch (Exception e)
				{
					return new List<Cliente>();
				}
			}
		}
	}
}
