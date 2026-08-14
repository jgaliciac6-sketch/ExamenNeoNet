"use server";

import { ProductoSchema } from "@/schemas";
import { API_BASE_URL, authHeaders, parseErrorMessage } from "@/lib/server-fetch";
import type { MessageResponse } from "@/lib/types";
import type { ActionStateType } from "../action-state";

// Placeholder por simetría con Client/SetClient: ProductController todavía no
// expone la creación de productos (solo GetProduct). Ajustar la ruta cuando
// exista SetProduct en el backend.
export async function setNewProducto(
  prevState: ActionStateType,
  formData: FormData,
): Promise<ActionStateType> {
  const objProducto = {
    proNombre: formData.get("proNombre"),
    proPrecio: formData.get("proPrecio"),
    proStock: formData.get("proStock"),
  };

  const producto = ProductoSchema.safeParse(objProducto);
  if (!producto.success) {
    return {
      errors: producto.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const url = `${API_BASE_URL}/Product/SetProduct`;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      cache: "no-store",
      body: JSON.stringify({ ...producto.data, proEstado: true }),
    });
  } catch {
    return {
      errors: ["No se pudo conectar con el servidor. Intenta de nuevo más tarde."],
      success: false,
    };
  }

  if (!req.ok) {
    return {
      errors: [await parseErrorMessage(req, "No fue posible crear el producto.")],
      success: false,
    };
  }

  const json = (await req.json().catch(() => ({}))) as Partial<MessageResponse>;

  return {
    errors: [],
    success: true,
    message: json.msg ?? "Producto creado correctamente.",
  };
}
