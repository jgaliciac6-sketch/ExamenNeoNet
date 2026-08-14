using ExamenNeonetApi.Datos;
using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using RegistroSucursales.Datos;
using RegistroSucursales.Utils.Validaciones;
using System.Text.Json;

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

		public async Task<Response> CreateCliente(Cliente objCliente)
		{
			Response respuesta = new Response();

			try
			{
				using (SqlConnection conn = new SqlConnection(new Conexion().GetCadenaSQL()))
				{
					// Validar cliente.
					respuesta = await new Validaciones().ValidarCliente(objCliente);

					if (!respuesta.success)
					{
						respuesta.code = 400;
						return respuesta;
					}

					await conn.OpenAsync();

					using var tx = conn.BeginTransaction();

					//Validar email existente
					respuesta = await new ClientDT().ValidateEmail(conn, tx, objCliente);

					if (!respuesta.success)
					{
						respuesta.code = 400;
						tx.Rollback();
						return respuesta;
					}

					respuesta = await new ClientDT().SetCliente(conn, tx, objCliente);

					if (!respuesta.success)
					{
						tx.Rollback();
						return respuesta;
					}

					tx.Commit();
					conn.Close();

					return respuesta;
				}
			}
			catch (JsonException)
			{
				respuesta.id = 0;
				respuesta.success = false;
				respuesta.message = "El contenido del archivo JSON no tiene un formato válido.";
				respuesta.code = 400;

				return respuesta;
			}
			catch (Exception e)
			{
				respuesta.id = 0;
				respuesta.success = false;
				respuesta.message = e.Message;
				respuesta.code = 500;

				return respuesta;
			}
		}
	}
}
