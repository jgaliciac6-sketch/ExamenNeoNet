import "server-only";
import { cookies } from "next/headers";

import { ErrorResponseSchema } from "@/schemas";

export const API_BASE_URL = process.env.NEXT_PUBLIC_URL_API ?? "http://localhost:4000/api";

// Lee el JWT guardado en la cookie que setea src/actions/auth/login-action.ts
// (NEXT_PUBLIC_TOKEN_COOKIE porque el mismo nombre lo necesitan los queries
// client-side en src/queries/ para leerla vía document.cookie).
export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(process.env.NEXT_PUBLIC_TOKEN_COOKIE!)?.value;
}

export async function authHeaders(): Promise<Record<string, string>> {
  const token = await getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Los endpoints de error del backend devuelven { msg: string } (ver ErrorResponseSchema).
export async function parseErrorMessage(res: Response, fallback: string): Promise<string> {
  const json = await res.json().catch(() => null);
  const parsed = ErrorResponseSchema.safeParse(json);
  return parsed.success ? parsed.data.msg : fallback;
}
