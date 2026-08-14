import { fetchJson } from "./config";
import type { LoginRequest, LoginResponse } from "@/lib/types";

// Placeholder: ajustar cuando el backend exponga el login.
const LOGIN_PATH = "/api/Usuario/Login";

export function login(data: LoginRequest) {
  return fetchJson<LoginResponse>(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
