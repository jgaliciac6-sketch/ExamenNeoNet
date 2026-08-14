import { z } from "zod";

// Model/Cliente.cs: CLINombre, CLIEmail son los únicos campos que captura el formulario.
export const ClienteSchema = z.object({
  cliNombre: z.string().min(1, "El nombre es obligatorio."),
  cliEmail: z.string().min(1, "El email es obligatorio.").email("Ingresa un correo válido."),
});

export type ClienteInput = z.infer<typeof ClienteSchema>;
