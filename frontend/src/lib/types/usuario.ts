// Espejo de backend/ExamenNeonetApi/ExamenNeonetApi/Model/Usuario.cs (camelCase, ver venta.ts).

export interface Usuario {
  usrId: number;
  usrNombre: string;
  usrFechaCreacion: string;
  usrEstado: boolean;
}

export interface LoginRequest {
  usrNombre: string;
  usrPassword: string;
}

export interface LoginResponse {
  usrId: number;
  usrNombre: string;
}
