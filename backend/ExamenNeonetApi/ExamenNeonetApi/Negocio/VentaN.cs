using ExamenNeonetApi.Datos;
using ExamenNeonetApi.Model;
using Microsoft.Data.SqlClient;
using RegistroSucursales.Datos;
using RegistroSucursales.Utils.Validaciones;
using System.Text.Json;

namespace ExamenNeonetApi.Negocio
{
	public class VentaN
	{
		public async Task<List<Venta>> GetSalesByClient(int cliId)
		{
			List<Venta> lstVenta = new List<Venta>();

			using (SqlConnection conn = new SqlConnection(new Conexion().GetCadenaSQL()))
			{
				await conn.OpenAsync();

				try
				{
					lstVenta = await new SaleDT().GetSaleByCliente(conn, cliId);
					foreach(var venta in lstVenta) {
						venta.lstDetalleVenta = await new DetalleVentaDT().GetSaleDetail(conn, venta.VENId);
					}

					return lstVenta;
				}
				catch (Exception e)
				{
					return new List<Venta>();
				}
			}
		}

		public async Task<Response> CreateSale(int cliId, List<DetalleVenta> lstDetalleVenta)
		{
			Response respuesta = new Response();
			Venta objVenta = new Venta();

			try
			{
				using (SqlConnection conn = new SqlConnection(new Conexion().GetCadenaSQL()))
				{
					await conn.OpenAsync();

					using var tx = conn.BeginTransaction();

					respuesta = await new SaleDT().SetVenta(conn, tx, cliId);

					if (!respuesta.success)
					{
						tx.Rollback();
						return respuesta;
					}

					objVenta.VENId = respuesta.id;

					foreach(var detalle in lstDetalleVenta)
					{
						detalle.DVNVENId = objVenta.VENId;

						respuesta = await new Validaciones().ValidarDetalleVEnta(detalle);
						if (!respuesta.success)
						{
							tx.Rollback();
							return respuesta;
						}

						respuesta = await new DetalleVentaDT().SetDetalleVenta(conn, tx, objVenta.VENId, detalle);

						if (!respuesta.success)
						{
							tx.Rollback();
							return respuesta;
						}

						respuesta = await new ProductDT().PutCantidadStock(conn, tx, detalle.DVNPROId, detalle.DVNCantidad);
						if (!respuesta.success)
						{
							tx.Rollback();
							return respuesta;
						}

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
