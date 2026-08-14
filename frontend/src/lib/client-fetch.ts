"use client";

import { authHeader } from "./client-session";

export const API_BASE_URL = process.env.NEXT_PUBLIC_URL_API ?? "http://localhost:4000/api";

// Helper compartido para los GET (queries/), que corren en el navegador y
// adjuntan el token leído de la cookie. Los endpoints de error del backend
// devuelven { msg: string }.
export async function clientFetchJson<T>(path: string, fallbackError: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: authHeader(),
    cache: "no-store",
  });

  if (!res.ok) {
    let message = fallbackError;
    try {
      const json = (await res.json()) as { msg?: string; message?: string };
      message = json.msg ?? json.message ?? fallbackError;
    } catch {
      // El cuerpo del error no era JSON; se usa el mensaje genérico.
    }
    throw new Error(message);
  }

  return res.json();
}
