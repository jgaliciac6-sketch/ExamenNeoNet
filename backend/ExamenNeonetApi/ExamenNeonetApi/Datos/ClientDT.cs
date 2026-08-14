using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenNeonetApi.Datos
{
	public class ClientDT
	{
		public async Task<List<Cliente>> GetClient(SqlConnection conn)
		{
			List<Cliente> lstCliente = new List<Cliente>();

			try
			{
				string sp = "USP_GET_CLIENTE";
				SqlCommand cmd = new SqlCommand(sp, conn);
				cmd.CommandType = CommandType.StoredProcedure;

				SqlDataReader dr = cmd.ExecuteReader();

				while (dr.Read())
				{
					lstCliente.Add(new Cliente()
					{
						CLIId = Convert.ToInt32(dr["CLIId"]),
						CLINombre = dr["CLINombre"].ToString(),
						CLIEmail = dr["CLIEmail"].ToString(),
						CLIEstado = Convert.ToBoolean(dr["CLIEstado"])
					});
				}
				dr.Close();
			}
			catch (Exception e)
			{
				new List<Cliente>();
			}

			return lstCliente;
		}

		public async Task<Response> ValidateEmail(SqlConnection conn, SqlTransaction tx, Cliente objCliente)
		{
			Response respuesta = new Response();

			try
			{
				string sp = "USP_GET_EMAIL_CLIENTE_VALIDATION";
				SqlCommand cmd = new SqlCommand(sp, conn, tx);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@CLIEmail", objCliente.CLIEmail);
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

		public async Task<Response> SetCliente(SqlConnection conn, SqlTransaction tx, Cliente objCliente)
		{
			Response respuesta = new Response();

			try
			{
				string sp = "USP_SET_CLIENTE";
				SqlCommand cmd = new SqlCommand(sp, conn, tx);
				cmd.CommandType = CommandType.StoredProcedure;
				cmd.Parameters.AddWithValue("@CLINombre", objCliente.CLINombre);
				cmd.Parameters.AddWithValue("@CLIEmail", objCliente.CLIEmail);
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
