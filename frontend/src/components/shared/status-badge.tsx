import { cn } from "@/lib/utils";
import {
  productStatusLabel,
  saleStatusLabel,
  type ProductStatus,
  type SaleStatus,
} from "@/lib/mock-data";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium";

const dot = "size-1.5 rounded-full";

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

export function SaleStatusBadge({ status }: { status: SaleStatus }) {
  const styles: Record<SaleStatus, string> = {
    completada: "border-success/30 bg-success/10 text-success",
    pendiente: "border-warning/30 bg-warning/10 text-warning",
    cancelada: "border-destructive/30 bg-destructive/10 text-destructive",
  };
  const dots: Record<SaleStatus, string> = {
    completada: "bg-success",
    pendiente: "bg-warning",
    cancelada: "bg-destructive",
  };
  return (
    <span className={cn(base, styles[status])}>
      <span className={cn(dot, dots[status])} />
      {saleStatusLabel[status]}
    </span>
  );
}
