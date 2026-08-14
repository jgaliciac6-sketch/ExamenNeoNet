using ExamenNeonetApi.Model;
using Microsoft.AspNetCore.Http;

namespace RegistroSucursales.Utils.Validaciones
{
    public class Validaciones
    {
        public async Task<Response> ValidarCliente(Cliente objCliente)
        {
            Response respuesta = new Response
			{
                success = true
            };

            // Primero se valida el objeto para no acceder a sus propiedades
            // cuando sea null.
            if (objCliente == null)
            {
                respuesta.id = 0;
                respuesta.message = "No se ha ingresado la información completa del cliente.";
                respuesta.success = false;

                return respuesta;
            }

            if (string.IsNullOrWhiteSpace(objCliente.CLINombre) || string.IsNullOrWhiteSpace(objCliente.CLIEmail))
            {
                respuesta.id = 0;
                respuesta.message = "No se ha ingresado el nombre o correo del cliente.";
                respuesta.success = false;

                return respuesta;
            }

            return respuesta;
        }
    }
}