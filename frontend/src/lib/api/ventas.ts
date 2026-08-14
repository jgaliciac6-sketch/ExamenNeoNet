import { fetchJson } from "./config";
import type { Venta, VentaDetalleResponse, CrearVentaRequest } from "@/lib/types";

// Placeholders: ajustar con las rutas reales que expondrá el backend.
const GET_VENTAS_PATH = "/api/Venta/GetVentas";
const GET_VENTA_DETALLE_PATH = (id: number | string) => `/api/Venta/GetDetalleVenta/${id}`;
const CREATE_VENTA_PATH = "/api/Venta/CreateVenta";

export function getVentas() {
  return fetchJson<Venta[]>(GET_VENTAS_PATH);
}

export function getVentaDetalle(id: number | string) {
  return fetchJson<VentaDetalleResponse>(GET_VENTA_DETALLE_PATH(id));
}

export function crearVenta(data: CrearVentaRequest) {
  return fetchJson<Venta>(CREATE_VENTA_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
