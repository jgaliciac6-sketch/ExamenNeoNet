"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginSchema } from "@/schemas";
import { API_BASE_URL, parseErrorMessage } from "@/lib/server-fetch";
import type { LoginResponse } from "@/lib/types";
import type { ActionStateType } from "../action-state";

// Autentica contra POST /api/Login/Login (valida por USRId, no por nombre) y
// guarda el JWT recibido en una cookie para que tanto los server actions como
// los queries client-side (src/queries/, que corren en el navegador) puedan
// adjuntarlo como Authorization: Bearer <token>. Por eso NO es httpOnly: los
// GET necesitan leerla desde el cliente. Trade-off de seguridad aceptado.
export async function Login(
  prevState: ActionStateType,
  formData: FormData,
): Promise<ActionStateType> {
  const objLogin = {
    usrId: formData.get("usrId"),
    usrPassword: formData.get("usrPassword"),
  };

  const login = LoginSchema.safeParse(objLogin);
  if (!login.success) {
    return {
      errors: login.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const url = `${API_BASE_URL}/Login/Login`;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(login.data),
    });
  } catch {
    return {
      errors: ["No se pudo conectar con el servidor. Intenta de nuevo más tarde."],
      success: false,
    };
  }

  if (!req.ok) {
    return {
      errors: [await parseErrorMessage(req, "Usuario o contraseña incorrectos.")],
      success: false,
    };
  }

  const data = (await req.json()) as LoginResponse;

  const cookieStore = await cookies();
  cookieStore.set(process.env.NEXT_PUBLIC_TOKEN_COOKIE!, data.token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  redirect("/clientes");
}
