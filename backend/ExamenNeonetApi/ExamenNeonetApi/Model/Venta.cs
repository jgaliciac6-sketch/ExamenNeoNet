using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;

namespace ExamenNeonetApi.Model
{
	public class Venta
	{
		public int VENId { get; set; }
		public Cliente VENCLIId { get; set; }
		public string VENFecha {  get; set; }
		public bool VENEstado { get; set; }
	}
}
