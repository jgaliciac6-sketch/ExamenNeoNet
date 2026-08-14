using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExamenNeonetApi.Datos
{
	public class ClientDT
	{
		public async Task<List<Cliente>> GetClient(SqlConnection conn)
		{
			List<Cliente> lstEmpresa = new List<Cliente>();

			try
			{
				string sp = "USP_GET_CLIENTE";
				SqlCommand cmd = new SqlCommand(sp, conn);
				cmd.CommandType = CommandType.StoredProcedure;

				SqlDataReader dr = cmd.ExecuteReader();

				while (dr.Read())
				{
					lstEmpresa.Add(new Cliente()
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

			return lstEmpresa;
		}
	}
}
