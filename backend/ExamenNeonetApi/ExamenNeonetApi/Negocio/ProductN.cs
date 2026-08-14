using ExamenNeonetApi.Datos;
using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using RegistroSucursales.Datos;

namespace ExamenNeonetApi.Negocio
{
	public class ProductN
	{
		public async Task<List<Product>> GetProduct()
		{
			List<Product> lstEmpresa = new List<Product>();

			using (SqlConnection conn = new SqlConnection(new Conexion().GetCadenaSQL()))
			{
				await conn.OpenAsync();

				try
				{
					lstEmpresa = await new ProductDT().GetProduct(conn);

					return lstEmpresa;
				}
				catch (Exception e)
				{
					return new List<Product>();
				}
			}
		}
	}
}
