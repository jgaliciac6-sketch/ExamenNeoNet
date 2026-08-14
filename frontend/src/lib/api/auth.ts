import { fetchJson } from "./config";
import type { LoginRequest, LoginResponse } from "@/lib/types";

// Controllers/LoginController.cs -> ruta "api/[controller]/[action]" = api/Login/Login.
const LOGIN_PATH = "/api/Login/Login";

export function login(data: LoginRequest) {
  return fetchJson<LoginResponse>(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
