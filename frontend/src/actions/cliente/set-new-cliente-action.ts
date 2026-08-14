"use server";

import { ClienteSchema } from "@/schemas";
import { API_BASE_URL, authHeaders, parseErrorMessage } from "@/lib/server-fetch";
import type { MessageResponse } from "@/lib/types";
import type { ActionStateType } from "../action-state";

// Crea un cliente enviando los datos validados a POST /api/Client/SetClient.
export async function setNewCliente(
  prevState: ActionStateType,
  formData: FormData,
): Promise<ActionStateType> {
  const objCliente = {
    cliNombre: formData.get("cliNombre"),
    cliEmail: formData.get("cliEmail"),
  };

  const cliente = ClienteSchema.safeParse(objCliente);
  if (!cliente.success) {
    return {
      errors: cliente.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const url = `${API_BASE_URL}/Client/SetClient`;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      cache: "no-store",
      body: JSON.stringify({ ...cliente.data, cliEstado: true }),
    });
  } catch {
    return {
      errors: ["No se pudo conectar con el servidor. Intenta de nuevo más tarde."],
      success: false,
    };
  }

  if (!req.ok) {
    return {
      errors: [await parseErrorMessage(req, "No fue posible crear el cliente.")],
      success: false,
    };
  }

  const json = (await req.json().catch(() => ({}))) as Partial<MessageResponse>;

  return {
    errors: [],
    success: true,
    message: json.msg ?? "Cliente creado correctamente.",
  };
}
