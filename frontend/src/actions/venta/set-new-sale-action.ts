"use server";

import { VentaSchema } from "@/schemas";
import { API_BASE_URL, authHeaders, parseErrorMessage } from "@/lib/server-fetch";
import type { MessageResponse, Producto } from "@/lib/types";
import type { ActionStateType } from "../action-state";

// Crea una venta para un cliente: POST /api/Sale/SetSales/{cliId}, con el
// cliId en la URL y un arreglo plano de líneas en el body (no un objeto).
// Antes de enviar, valida que ninguna línea pida más cantidad de la que hay
// en stock (el backend no valida esto, así que queda como defensa aquí). El
// fetch de productos va inline (no se puede importar de src/queries/, que es
// "use client") en vez de reusar un GET compartido.
export async function setNewSale(
  prevState: ActionStateType,
  formData: FormData,
): Promise<ActionStateType> {
  const objVenta = {
    cliId: formData.get("cliId"),
    detalles: formData.get("detalles"),
  };

  const venta = VentaSchema.safeParse(objVenta);
  if (!venta.success) {
    return {
      errors: venta.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const productosRes = await fetch(`${API_BASE_URL}/Product/GetProduct`, {
    headers: await authHeaders(),
    cache: "no-store",
  }).catch(() => null);
  const productos: Producto[] = productosRes?.ok ? await productosRes.json() : [];

  const stockErrors: string[] = [];
  for (const linea of venta.data.detalles) {
    const producto = productos.find((p) => p.proId === linea.dvnproId);
    if (producto && linea.dvnCantidad > producto.proStock) {
      stockErrors.push(
        `${producto.proNombre}: solo hay ${producto.proStock} en stock, pediste ${linea.dvnCantidad}.`,
      );
    }
  }
  if (stockErrors.length > 0) {
    return { errors: stockErrors, success: false };
  }

  const url = `${API_BASE_URL}/Sale/SetSales/${venta.data.cliId}`;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      cache: "no-store",
      body: JSON.stringify(venta.data.detalles),
    });
  } catch {
    return {
      errors: ["No se pudo conectar con el servidor. Intenta de nuevo más tarde."],
      success: false,
    };
  }

  if (!req.ok) {
    return {
      errors: [await parseErrorMessage(req, "No fue posible registrar la venta.")],
      success: false,
    };
  }

  const json = (await req.json().catch(() => ({}))) as Partial<MessageResponse>;

  return {
    errors: [],
    success: true,
    message: json.msg ?? "Venta registrada correctamente.",
  };
}
