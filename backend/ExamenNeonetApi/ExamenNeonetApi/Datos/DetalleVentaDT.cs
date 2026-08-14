using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenNeonetApi.Datos
{
	public class DetalleVentaDT
	{
		public async Task<List<DetalleVenta>> GetSaleDetail(SqlConnection conn, int venId)
		{
			List<DetalleVenta> lstDetalleVenta = new List<DetalleVenta>();

			try
			{
				string sp = "USP_GET_DETALLE_VENTA";
				SqlCommand cmd = new SqlCommand(sp, conn);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@VENId", venId);

				SqlDataReader dr = cmd.ExecuteReader();

				while (dr.Read())
				{
					lstDetalleVenta.Add(new DetalleVenta()
					{
						DVNId = Convert.ToInt32(dr["DVNId"]),
						DVNCantidad = Convert.ToInt32(dr["DVNCantidad"]),
						DVNPROId = Convert.ToInt32(dr["DVNPROId"]),
						DVNPrecioUnitario = Convert.ToDouble(dr["DVNPrecioUnitario"]),
						DVNVENId = Convert.ToInt32(dr["DVNVENId"]),
						DVNEstado = Convert.ToBoolean(dr["DVNEstado"])
					});
				}
				dr.Close();
			}
			catch (Exception e)
			{
				new List<Venta>();
			}

			return lstDetalleVenta;
		}

		public async Task<Response> SetDetalleVenta(SqlConnection conn, SqlTransaction tx, int venId, DetalleVenta objDetalle)
		{
			Response respuesta = new Response();

			try
			{
				string sp = "USP_SET_SALE_DETAIL";
				SqlCommand cmd = new SqlCommand(sp, conn, tx);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@DVNVENId", venId);
				cmd.Parameters.AddWithValue("@DVNPROId", objDetalle.DVNPROId);
				cmd.Parameters.AddWithValue("@DVNCantidad", objDetalle.DVNCantidad);
				cmd.Parameters.AddWithValue("@DVNPrecioUnitario", objDetalle.DVNPrecioUnitario);
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
