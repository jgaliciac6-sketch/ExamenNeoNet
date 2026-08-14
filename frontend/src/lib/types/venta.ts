// Espejo de backend/ExamenNeonetApi/ExamenNeonetApi/Model/Venta.cs y DetalleVenta.cs
// Verificado contra GET /api/Sale/GetSalesByClient/{cliId}: cada venta trae sus
// líneas embebidas en lstDetalleVenta (no hace falta un fetch de detalle aparte).
// Nota: vencliId solo trae cliId poblado (cliNombre/cliEmail vienen null desde el
// SP), así que el nombre del cliente hay que resolverlo desde el listado de clientes.

import type { Cliente } from "./cliente";

export interface DetalleVenta {
  dvnId: number;
  dvnvenId: number;
  dvnproId: number;
  dvnCantidad: number;
  dvnPrecioUnitario: number;
  dvnEstado: boolean;
}

export interface Venta {
  venId: number;
  vencliId: Cliente;
  venFecha: string;
  venEstado: boolean;
  lstDetalleVenta: DetalleVenta[] | null;
}
