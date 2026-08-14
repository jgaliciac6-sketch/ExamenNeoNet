using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenNeonetApi.Datos
{
	public class ProductDT
	{
		public async Task<List<Product>> GetProduct(SqlConnection conn)
		{
			List<Product> lstProducts = new List<Product>();

			try
			{
				string sp = "USP_GET_PRODUCTO";
				SqlCommand cmd = new SqlCommand(sp, conn);
				cmd.CommandType = CommandType.StoredProcedure;

				SqlDataReader dr = cmd.ExecuteReader();

				while (dr.Read())
				{
					lstProducts.Add(new Product()
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

			return lstProducts;
		}

		public async Task<Response> PutCantidadStock(SqlConnection conn, SqlTransaction tx, int proId, int cantidad)
		{
			Response respuesta = new Response();

			try
			{
				string sp = "USP_PUT_STOCK_PRODUCT";
				SqlCommand cmd = new SqlCommand(sp, conn, tx);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@PROId", proId);
				cmd.Parameters.AddWithValue("@Cantidad", cantidad);
				cmd.Parameters.Add("@SUCCESS", SqlDbType.Int).Direction = ParameterDirection.Output;
				cmd.Parameters.Add("@MESSAGE", SqlDbType.VarChar, 250).Direction = ParameterDirection.Output;

				cmd.ExecuteNonQuery();

				respuesta.success = Convert.ToBoolean(cmd.Parameters["@SUCCESS"].Value);

				if (!respuesta.success)
				{
					respuesta.message = cmd.Parameters["@MESSAGE"].Value.ToString();
					respuesta.success = false;
					respuesta.code = 500;
				}

				return respuesta;
			}

			catch (Exception e)
			{
				respuesta.success = false;
				respuesta.message = e.Message;
				respuesta.id = 0;
				respuesta.code = 500;

				return respuesta;
			}
		}
	}
}
