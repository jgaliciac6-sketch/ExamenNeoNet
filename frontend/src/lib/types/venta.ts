// Espejo de backend/ExamenNeonetApi/ExamenNeonetApi/Model/Venta.cs y DetalleVenta.cs
//
// El backend aún no expone estos endpoints (ver lib/api/ventas.ts), así que los nombres
// camelCase de VENCLIId/DVNVENId/DVNPROId están inferidos aplicando la misma regla de
// System.Text.Json verificada en Cliente/Producto (un bloque de mayúsculas consecutivas
// se pasa a minúscula excepto la última letra, que inicia la siguiente palabra):
// VENId -> venId, VENCLIId -> vencliId, VENFecha -> venFecha, VENEstado -> venEstado,
// DVNId -> dvnId, DVNVENId -> dvnvenId, DVNPROId -> dvnproId. Ajustar si al conectar el
// endpoint real el nombre no coincide.

import type { Cliente } from "./cliente";

export interface Venta {
  venId: number;
  vencliId: Cliente;
  venFecha: string;
  venEstado: boolean;
}

export interface DetalleVenta {
  dvnId: number;
  dvnvenId: number;
  dvnproId: number;
  dvnCantidad: number;
  dvnPrecioUnitario: number;
}

export interface CrearVentaDetalleRequest {
  dvnproId: number;
  dvnCantidad: number;
  dvnPrecioUnitario: number;
}

export interface CrearVentaRequest {
  vencliId: number;
  venFecha: string;
  venEstado: boolean;
  detalles: CrearVentaDetalleRequest[];
}

export interface VentaDetalleResponse {
  venta: Venta;
  detalles: DetalleVenta[];
}
