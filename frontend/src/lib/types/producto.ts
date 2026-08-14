// Espejo de backend/ExamenNeonetApi/ExamenNeonetApi/Model/Product.cs
// Verificado contra GET /api/Product/GetProduct: { proId, proNombre, proStock, proPrecio, proEstado }.

export interface Producto {
  proId: number;
  proNombre: string;
  proStock: number;
  proPrecio: number;
  proEstado: boolean;
}

export interface CrearProductoRequest {
  proNombre: string;
  proStock: number;
  proPrecio: number;
  proEstado: boolean;
}
