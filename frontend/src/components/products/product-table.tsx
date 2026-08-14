import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GameCover } from "@/components/shared/game-cover";
import { ProductStatusBadge } from "@/components/shared/status-badge";
import { formatQ, type Product } from "@/lib/mock-data";

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Producto</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Precio</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Stock</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Estado</TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-border transition-colors hover:bg-secondary/40">
              <TableCell>
                <div className="flex items-center gap-3">
                  <GameCover gradient={product.cover} name={product.name} className="size-11" />
                  <div className="leading-tight">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.platform}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-semibold">{formatQ(product.price)}</TableCell>
              <TableCell className="text-muted-foreground">{product.stock} unidades</TableCell>
              <TableCell>
                <ProductStatusBadge status={product.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Acciones">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                      <Eye className="size-4" /> Ver
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="size-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="size-4" /> Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                No se encontraron productos.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
