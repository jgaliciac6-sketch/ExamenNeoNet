"use client";

import { clientFetchJson } from "@/lib/client-fetch";
import type { Venta } from "@/lib/types";

// GET /api/Sale/GetSalesByClient/{cliId} (SaleController.cs: [Authorize]).
// Cada venta ya trae sus líneas embebidas en lstDetalleVenta.
export function getSalesByClient(cliId: number | string): Promise<Venta[]> {
  return clientFetchJson<Venta[]>(
    `/Sale/GetSalesByClient/${cliId}`,
    "No se pudo cargar el historial de ventas del cliente.",
  );
}
