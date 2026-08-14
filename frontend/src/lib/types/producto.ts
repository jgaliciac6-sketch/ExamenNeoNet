// Espejo de backend/ExamenNeonetApi/ExamenNeonetApi/Model/Product.cs
// Verificado contra GET /api/Product/GetProduct: { proId, proNombre, proStock, proPrecio, proEstado }.
// El body de POST /api/Product/SetProduct se valida con ProductoSchema (src/schemas/producto.ts).

export interface Producto {
  proId: number;
  proNombre: string;
  proStock: number;
  proPrecio: number;
  proEstado: boolean;
}
