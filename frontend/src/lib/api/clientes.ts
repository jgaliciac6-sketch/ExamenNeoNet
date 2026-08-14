import { fetchJson } from "./config";
import type { Cliente, CrearClienteRequest } from "@/lib/types";

// Existente en el backend.
const GET_CLIENTS_PATH = "/api/Client/GetClients";
// Placeholder: ajustar cuando el backend exponga la creación de clientes.
const CREATE_CLIENT_PATH = "/api/Client/CreateClient";

export function getClientes() {
  return fetchJson<Cliente[]>(GET_CLIENTS_PATH);
}

export function crearCliente(data: CrearClienteRequest) {
  return fetchJson<Cliente>(CREATE_CLIENT_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
