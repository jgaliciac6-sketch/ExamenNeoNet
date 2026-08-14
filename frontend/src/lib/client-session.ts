"use client";

// El token se guarda en una cookie NO httpOnly (ver actions/auth/login-action.ts)
// justamente para que los GET, que corren en el cliente, puedan leerla y armar
// el header Authorization. Trade-off: un XSS podría robar el token; aceptable
// para este proyecto, pero vale la pena tenerlo presente.
const COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_COOKIE!;

export function getClientToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function authHeader(): Record<string, string> {
  const token = getClientToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
