import Link from "next/link";
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
import type { Venta } from "@/lib/types";

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("es-GT", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function SalesTable({ ventas }: { ventas: Venta[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[680px]">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              # Venta
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Cliente
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Fecha
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Estado
            </TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
              Acción
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ventas.map((venta) => (
            <TableRow
              key={venta.venId}
              className="border-border transition-colors hover:bg-secondary/40"
            >
              <TableCell className="font-medium">#{String(venta.venId).padStart(6, "0")}</TableCell>
              <TableCell>{venta.vencliId?.cliNombre ?? "—"}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(venta.venFecha)}</TableCell>
              <TableCell>
                <SaleStatusBadge active={venta.venEstado} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-lg text-primary hover:bg-primary/10"
                >
                  <Link href={`/ventas/${venta.venId}`}>
                    Ver detalle
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {ventas.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                No se encontraron ventas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
