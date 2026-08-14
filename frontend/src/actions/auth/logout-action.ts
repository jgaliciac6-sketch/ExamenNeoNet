"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Cierra la sesión eliminando la cookie que guarda el JWT.
export async function Logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(process.env.NEXT_PUBLIC_TOKEN_COOKIE!);
  redirect("/login");
}
