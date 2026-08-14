// Espejo de backend/ExamenNeonetApi/ExamenNeonetApi/Model/Cliente.cs
// El backend serializa con System.Text.Json en camelCase (JsonSerializerDefaults.Web),
// verificado contra GET /api/Client/GetClients: { cliId, cliNombre, cliEmail, cliEstado }.

export interface Cliente {
  cliId: number;
  cliNombre: string;
  cliEmail: string;
  cliEstado: boolean;
}

export interface CrearClienteRequest {
  cliNombre: string;
  cliEmail: string;
  cliEstado: boolean;
}
