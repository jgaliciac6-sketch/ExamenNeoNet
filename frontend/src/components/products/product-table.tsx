import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GameCover } from "@/components/shared/game-cover";
import { ProductStatusBadge, getProductStatus } from "@/components/shared/status-badge";
import type { Producto } from "@/lib/types";

const GRADIENTS = [
  "from-emerald-500/70 to-teal-700/70",
  "from-sky-500/70 to-indigo-700/70",
  "from-blue-500/70 to-violet-700/70",
  "from-rose-500/70 to-red-800/70",
  "from-amber-500/70 to-orange-800/70",
  "from-cyan-500/70 to-blue-800/70",
];

function gradientFor(id: number): string {
  return GRADIENTS[Math.abs(id) % GRADIENTS.length] ?? "from-slate-500/70 to-slate-700/70";
}

function formatQ(value: number) {
  return `Q ${value.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function ProductTable({ products }: { products: Producto[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[680px]">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Producto
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Precio
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Stock
            </TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
              Estado
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.proId}
              className="border-border transition-colors hover:bg-secondary/40"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <GameCover
                    gradient={gradientFor(product.proId)}
                    name={product.proNombre}
                    className="size-11"
                  />
                  <p className="font-medium">{product.proNombre}</p>
                </div>
              </TableCell>
              <TableCell className="font-semibold">{formatQ(product.proPrecio)}</TableCell>
              <TableCell className="text-muted-foreground">{product.proStock} unidades</TableCell>
              <TableCell className="text-right">
                <ProductStatusBadge status={getProductStatus(product)} />
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                No se encontraron productos.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
