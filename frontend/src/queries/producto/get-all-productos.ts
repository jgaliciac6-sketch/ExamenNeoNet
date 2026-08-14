"use client";

import { clientFetchJson } from "@/lib/client-fetch";
import type { Producto } from "@/lib/types";

// GET /api/Product/GetProduct (ProductController.cs: [Authorize]).
export function getAllProductos(): Promise<Producto[]> {
  return clientFetchJson<Producto[]>(
    "/Product/GetProduct",
    "No se pudo cargar el catálogo de productos.",
  );
}
