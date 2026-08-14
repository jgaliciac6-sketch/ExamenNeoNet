import { z } from "zod";

// Model/Product.cs: PRONombre, PROPrecio, PROStock son los campos del formulario.
export const ProductoSchema = z.object({
  proNombre: z.string().min(1, "El nombre es obligatorio."),
  proPrecio: z.coerce
    .number({ message: "Ingresa un precio válido." })
    .positive("Ingresa un precio válido."),
  proStock: z.coerce
    .number({ message: "Ingresa un stock válido." })
    .int("El stock debe ser un número entero.")
    .min(0, "Ingresa un stock válido."),
});

export type ProductoInput = z.infer<typeof ProductoSchema>;
