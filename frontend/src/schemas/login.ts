import { z } from "zod";

// LoginController valida por USRId (no por nombre) contra USP_GET_USER.
export const LoginSchema = z.object({
  usrId: z.coerce
    .number({ message: "Ingresa un ID de usuario válido." })
    .int("El ID de usuario debe ser un número entero.")
    .positive("Ingresa un ID de usuario válido."),
  usrPassword: z.string().min(1, "La contraseña es obligatoria."),
});

export type LoginInput = z.infer<typeof LoginSchema>;
