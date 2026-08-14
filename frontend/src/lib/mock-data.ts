// Mock data local. Reemplazar por consultas reales más adelante.

export type ProductStatus = "disponible" | "stock_bajo" | "agotado";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  platform: string;
  cover: string; // gradiente placeholder (clases tailwind)
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  purchases: number;
  totalSpent: number;
}

export type SaleStatus = "completada" | "pendiente" | "cancelada";

export interface Sale {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  date: string; // ISO
  itemsCount: number;
  total: number;
  status: SaleStatus;
}

export interface SaleDetailItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface SaleDetail {
  saleId: string;
  items: SaleDetailItem[];
}

export interface User {
  username: string;
  name: string;
  role: string;
}

export const currentUser: User = {
  username: "admin",
  name: "Administrador",
  role: "Administrador",
};

export const users: User[] = [currentUser];

export const products: Product[] = [
  {
    id: "p1",
    name: "The Legend of Zelda",
    price: 599,
    stock: 12,
    status: "disponible",
    platform: "Nintendo Switch",
    cover: "from-emerald-500/70 to-teal-700/70",
  },
  {
    id: "p2",
    name: "EA Sports FC",
    price: 549,
    stock: 4,
    status: "stock_bajo",
    platform: "PlayStation 5",
    cover: "from-sky-500/70 to-indigo-700/70",
  },
  {
    id: "p3",
    name: "Sonic X Shadow Generations",
    price: 499,
    stock: 0,
    status: "agotado",
    platform: "Multiplataforma",
    cover: "from-blue-500/70 to-violet-700/70",
  },
  {
    id: "p4",
    name: "Resident Evil 4",
    price: 449,
    stock: 8,
    status: "disponible",
    platform: "PlayStation 5",
    cover: "from-rose-500/70 to-red-800/70",
  },
  {
    id: "p5",
    name: "Elden Ring",
    price: 529,
    stock: 15,
    status: "disponible",
    platform: "Xbox Series X",
    cover: "from-amber-500/70 to-orange-800/70",
  },
  {
    id: "p6",
    name: "Gran Turismo 7",
    price: 479,
    stock: 3,
    status: "stock_bajo",
    platform: "PlayStation 5",
    cover: "from-cyan-500/70 to-blue-800/70",
  },
];

export const customers: Customer[] = [
  { id: "C-001", name: "Carlos Hernández", email: "carlos@email.com", purchases: 4, totalSpent: 3250 },
  { id: "C-002", name: "María López", email: "maria@email.com", purchases: 7, totalSpent: 6780 },
  { id: "C-003", name: "José Ramírez", email: "jose@email.com", purchases: 2, totalSpent: 1198 },
  { id: "C-004", name: "Ana Castillo", email: "ana@email.com", purchases: 5, totalSpent: 4120 },
  { id: "C-005", name: "Luis Morales", email: "luis@email.com", purchases: 1, totalSpent: 599 },
];

export const sales: Sale[] = [
  {
    id: "000124",
    number: "#000124",
    customerId: "C-001",
    customerName: "Carlos Hernández",
    date: "2026-08-13T18:45:00",
    itemsCount: 3,
    total: 1249,
    status: "completada",
  },
  {
    id: "000123",
    number: "#000123",
    customerId: "C-002",
    customerName: "María López",
    date: "2026-08-13T15:10:00",
    itemsCount: 2,
    total: 899,
    status: "completada",
  },
  {
    id: "000122",
    number: "#000122",
    customerId: "C-003",
    customerName: "José Ramírez",
    date: "2026-08-12T11:32:00",
    itemsCount: 1,
    total: 599,
    status: "pendiente",
  },
  {
    id: "000121",
    number: "#000121",
    customerId: "C-004",
    customerName: "Ana Castillo",
    date: "2026-08-12T09:05:00",
    itemsCount: 4,
    total: 1875,
    status: "completada",
  },
  {
    id: "000120",
    number: "#000120",
    customerId: "C-005",
    customerName: "Luis Morales",
    date: "2026-08-11T17:20:00",
    itemsCount: 1,
    total: 449,
    status: "cancelada",
  },
];

export const saleDetails: SaleDetail[] = [
  {
    saleId: "000124",
    items: [
      { productId: "p3", productName: "Sonic X Shadow Generations", price: 499, quantity: 1, subtotal: 499 },
      { productId: "p4", productName: "Resident Evil 4", price: 375, quantity: 2, subtotal: 750 },
    ],
  },
  {
    saleId: "000123",
    items: [
      { productId: "p1", productName: "The Legend of Zelda", price: 599, quantity: 1, subtotal: 599 },
      { productId: "p6", productName: "Gran Turismo 7", price: 300, quantity: 1, subtotal: 300 },
    ],
  },
  {
    saleId: "000122",
    items: [{ productId: "p1", productName: "The Legend of Zelda", price: 599, quantity: 1, subtotal: 599 }],
  },
  {
    saleId: "000121",
    items: [
      { productId: "p5", productName: "Elden Ring", price: 529, quantity: 2, subtotal: 1058 },
      { productId: "p2", productName: "EA Sports FC", price: 549, quantity: 1, subtotal: 549 },
      { productId: "p4", productName: "Resident Evil 4", price: 268, quantity: 1, subtotal: 268 },
    ],
  },
  {
    saleId: "000120",
    items: [{ productId: "p4", productName: "Resident Evil 4", price: 449, quantity: 1, subtotal: 449 }],
  },
];

export const dashboardStats = {
  salesToday: 24,
  totalSold: 12450,
  productsSold: 38,
  customersServed: 19,
};

export function formatQ(value: number) {
  return `Q ${value.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-GT", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatLongDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-GT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const productStatusLabel: Record<ProductStatus, string> = {
  disponible: "Disponible",
  stock_bajo: "Stock bajo",
  agotado: "Agotado",
};

export const saleStatusLabel: Record<SaleStatus, string> = {
  completada: "Completada",
  pendiente: "Pendiente",
  cancelada: "Cancelada",
};
