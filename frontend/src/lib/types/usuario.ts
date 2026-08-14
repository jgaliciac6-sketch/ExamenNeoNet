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

// Forma real de la respuesta de POST /api/Login/Login (LoginController.cs), que
// devuelve un objeto anónimo, no el modelo Usuario.
export interface LoginResponse {
  token: string;
  id: number;
  nombre: string;
}
