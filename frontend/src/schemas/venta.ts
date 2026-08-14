import { z } from "zod";

// POST /api/Sale/SetSales/{cliId} (SaleController.cs) recibe un arreglo JSON
// plano de líneas [FromBody] List<DetalleVenta> — el cliId va en la URL, no en
// el body, y la fecha/estado los asigna el backend. Llegan como JSON
// serializado en un campo oculto del FormData (la cantidad de líneas es
// dinámica, FormData plano no la modela bien).
export const VentaDetalleLineSchema = z.object({
  dvnproId: z.number().int().positive("Selecciona un producto."),
  dvnCantidad: z.number().int().positive("La cantidad debe ser mayor a 0."),
  dvnPrecioUnitario: z.number().nonnegative("El precio unitario no puede ser negativo."),
});

export const VentaSchema = z.object({
  cliId: z.coerce.number({ message: "Cliente inválido." }).int().positive("Cliente inválido."),
  detalles: z
    .string()
    .min(1, "Agrega al menos un producto.")
    .transform((raw, ctx) => {
      try {
        return JSON.parse(raw) as unknown;
      } catch {
        ctx.addIssue({ code: "custom", message: "Los productos de la venta no son válidos." });
        return z.NEVER;
      }
    })
    .pipe(z.array(VentaDetalleLineSchema).min(1, "Agrega al menos un producto.")),
});

export type VentaInput = z.infer<typeof VentaSchema>;
