import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SaleStatusBadge } from "@/components/shared/status-badge";
import { formatDate, formatQ, type Sale } from "@/lib/mock-data";

export function SalesTable({ sales }: { sales: Sale[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[820px]">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground"># Venta</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Cliente</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Fecha</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Productos</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Total</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Estado</TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
              Acción
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id} className="border-border transition-colors hover:bg-secondary/40">
              <TableCell className="font-medium">{sale.number}</TableCell>
              <TableCell>{sale.customerName}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(sale.date)}</TableCell>
              <TableCell className="text-muted-foreground">
                {sale.itemsCount} {sale.itemsCount === 1 ? "producto" : "productos"}
              </TableCell>
              <TableCell className="font-semibold">{formatQ(sale.total)}</TableCell>
              <TableCell>
                <SaleStatusBadge status={sale.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="ghost" size="sm" className="rounded-lg text-primary hover:bg-primary/10">
                  <Link to="/ventas/$id" params={{ id: sale.id }}>
                    Ver detalle
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {sales.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                No se encontraron ventas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
