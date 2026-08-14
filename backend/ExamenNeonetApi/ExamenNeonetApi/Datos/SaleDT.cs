using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenNeonetApi.Datos
{
	public class SaleDT
	{
		public async Task<List<Venta>> GetSaleByCliente(SqlConnection conn, int cliId)
		{
			List<Venta> lstVenta = new List<Venta>();

			try
			{
				string sp = "USP_GET_VENTA";
				SqlCommand cmd = new SqlCommand(sp, conn);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@CLIId", cliId);

				SqlDataReader dr = cmd.ExecuteReader();

				while (dr.Read())
				{
					lstVenta.Add(new Venta()
					{
						VENId = Convert.ToInt32(dr["VENId"]),
						VENFecha = dr["VENFecha"].ToString(),
						VENCLIId = new Cliente() { CLIId = Convert.ToInt32(dr["VENCLIId"])},
						VENEstado = Convert.ToBoolean(dr["VENEstado"])
					});
				}
				dr.Close();
			}
			catch (Exception e)
			{
				new List<Venta>();
			}

			return lstVenta;
		}

		public async Task<Response> SetVenta(SqlConnection conn, SqlTransaction tx, int CLIId)
		{
			Response respuesta = new Response();

			try
			{
				string sp = "USP_SET_SALE";
				SqlCommand cmd = new SqlCommand(sp, conn, tx);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@VENCLIId", CLIId);
				cmd.Parameters.Add("@VENId", SqlDbType.Int).Direction = ParameterDirection.Output;
				cmd.Parameters.Add("@MESSAGE", SqlDbType.VarChar, 250).Direction = ParameterDirection.Output;

				cmd.ExecuteNonQuery();

				respuesta.success = true;

				respuesta.id = Convert.ToInt32(cmd.Parameters["@VENId"].Value);

				if (respuesta.id == 0)
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
