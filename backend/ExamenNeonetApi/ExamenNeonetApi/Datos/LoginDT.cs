using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenNeonetApi.Datos
{
	public class LoginDT
	{
		public async Task<Usuario?> Login(
			SqlConnection conn,
			int usuario,
			string password)
		{
			Usuario? objUsuario = null;

			try
			{
				string sp = "USP_GET_USER";

				SqlCommand cmd = new SqlCommand(sp, conn);
				cmd.CommandType = CommandType.StoredProcedure;

				cmd.Parameters.AddWithValue("@USRId", usuario);
				cmd.Parameters.AddWithValue("@USRPassword", password);

				SqlDataReader dr = await cmd.ExecuteReaderAsync();

				if (await dr.ReadAsync())
				{
					objUsuario = new Usuario()
					{
						USRId = Convert.ToInt32(dr["USRId"]),
						USRNombre = dr["USRNombre"].ToString()!,
						USREstado = Convert.ToBoolean(dr["USREstado"])
					};
				}

				await dr.CloseAsync();
			}
			catch (Exception)
			{
				return null;
			}

			return objUsuario;
		}
	}
}