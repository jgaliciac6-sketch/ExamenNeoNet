import { getToken } from "@/lib/auth-storage";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...authHeader(), ...init?.headers },
      ...init,
    });
  } catch {
    throw new ApiError("No se pudo conectar con el servidor. Verifica que la API esté disponible.");
  }

  if (!res.ok) {
    throw new ApiError(`La solicitud a ${path} falló (${res.status}).`, res.status);
  }

  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}
