import { z } from "zod";

// Forma real de los errores que devuelve el backend (LoginController, ClientController, etc.): { msg: string }.
export const ErrorResponseSchema = z.object({
  msg: z.string(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
