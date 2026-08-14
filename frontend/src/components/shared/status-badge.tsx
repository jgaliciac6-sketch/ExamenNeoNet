import { cn } from "@/lib/utils";
import type { Producto } from "@/lib/types";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium";

const dot = "size-1.5 rounded-full";

export type ProductStatus = "disponible" | "stock_bajo" | "agotado";

export function getProductStatus(product: Producto): ProductStatus {
  if (!product.proEstado || product.proStock <= 0) return "agotado";
  if (product.proStock <= 5) return "stock_bajo";
  return "disponible";
}

const productStatusLabel: Record<ProductStatus, string> = {
  disponible: "Disponible",
  stock_bajo: "Stock bajo",
  agotado: "Agotado",
};

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const styles: Record<ProductStatus, string> = {
    disponible: "border-success/30 bg-success/10 text-success",
    stock_bajo: "border-warning/30 bg-warning/10 text-warning",
    agotado: "border-destructive/30 bg-destructive/10 text-destructive",
  };
  const dots: Record<ProductStatus, string> = {
    disponible: "bg-success",
    stock_bajo: "bg-warning",
    agotado: "bg-destructive",
  };
  return (
    <span className={cn(base, styles[status])}>
      <span className={cn(dot, dots[status])} />
      {productStatusLabel[status]}
    </span>
  );
}

export function SaleStatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        base,
        active
          ? "border-success/30 bg-success/10 text-success"
          : "border-destructive/30 bg-destructive/10 text-destructive",
      )}
    >
      <span className={cn(dot, active ? "bg-success" : "bg-destructive")} />
      {active ? "Activa" : "Anulada"}
    </span>
  );
}
