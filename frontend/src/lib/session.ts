import "server-only";

import { getAuthToken } from "./server-fetch";

export interface Session {
  usrId: number;
  usrNombre: string;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

// Lee el nombre/id del usuario desde los claims del JWT guardado en la cookie
// httpOnly, sin exponer el token en sí al cliente. Solo para mostrar en la UI:
// la validación real de la sesión ocurre en el backend en cada request.
export async function getSession(): Promise<Session | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const claims = decodeJwtPayload(token);
  const usrId = Number(claims?.["USRId"]);
  const usrNombre = String(claims?.["USRNombre"] ?? "");
  if (!usrId || !usrNombre) return null;

  return { usrId, usrNombre };
}
