"use client";

import { clientFetchJson } from "@/lib/client-fetch";
import type { Cliente } from "@/lib/types";

// GET /api/Client/GetClients (ClientController.cs: [Authorize]).
export function getAllClientes(): Promise<Cliente[]> {
  return clientFetchJson<Cliente[]>(
    "/Client/GetClients",
    "No se pudo cargar el listado de clientes.",
  );
}
