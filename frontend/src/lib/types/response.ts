// Espejo de backend/ExamenNeonetApi/ExamenNeonetApi/Model/Response.cs

export interface ApiResponse {
  id: number;
  message: string;
  success: boolean;
  code: number;
}

// Forma real que devuelven los endpoints de creación (SetClient, etc.):
// { msg: "Operación exitosa" } o { msg: <detalle del error> } con el status code del Response.
export interface MessageResponse {
  msg: string;
}
