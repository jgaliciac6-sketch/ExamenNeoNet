using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenNeonetApi.Datos
{
	public class ProductDT
	{
		public async Task<List<Product>> GetProduct(SqlConnection conn)
		{
			List<Product> lstEmpresa = new List<Product>();

			try
			{
				string sp = "USP_GET_PRODUCTO";
				SqlCommand cmd = new SqlCommand(sp, conn);
				cmd.CommandType = CommandType.StoredProcedure;

				SqlDataReader dr = cmd.ExecuteReader();

				while (dr.Read())
				{
					lstEmpresa.Add(new Product()
					{
						PROId = Convert.ToInt32(dr["PROId"]),
						PRONombre = dr["PRONombre"].ToString(),
						PROPrecio = Convert.ToDouble(dr["PROPrecio"]),
						PROStock = Convert.ToInt32(dr["PROStock"]),
						PROEstado = Convert.ToBoolean(dr["PROEstado"])
					});
				}
				dr.Close();
			}
			catch (Exception e)
			{
				new List<Product>();
			}

			return lstEmpresa;
		}
	}
}
