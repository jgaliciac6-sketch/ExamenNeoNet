import { fetchJson } from "./config";
import type { Producto, CrearProductoRequest } from "@/lib/types";

// Existente en el backend.
const GET_PRODUCTS_PATH = "/api/Product/GetProduct";
// Placeholder: ajustar cuando el backend exponga la creación de productos.
const CREATE_PRODUCT_PATH = "/api/Product/CreateProduct";

export function getProductos() {
  return fetchJson<Producto[]>(GET_PRODUCTS_PATH);
}

export function crearProducto(data: CrearProductoRequest) {
  return fetchJson<Producto>(CREATE_PRODUCT_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
