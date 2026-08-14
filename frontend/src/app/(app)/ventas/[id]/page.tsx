"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/layout/page-header";
import { SaleStatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getVentaDetalle } from "@/lib/api/ventas";

function formatQ(value: number) {
  return `Q ${value.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("es-GT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function VentaDetallePage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venta", params.id],
    queryFn: () => getVentaDetalle(params.id),
  });

  const total =
    data?.detalles.reduce((sum, item) => sum + item.dvnCantidad * item.dvnPrecioUnitario, 0) ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Venta #${String(params.id).padStart(6, "0")}`}
        description="Detalle de los productos incluidos en la venta."
      />

      {isLoading && (
        <p className="py-10 text-center text-sm text-muted-foreground">Cargando venta...</p>
      )}
      {isError && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No se pudo cargar el detalle de la venta.
        </p>
      )}

      {data && (
        <>
          <Card className="rounded-2xl border-border">
            <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="text-lg font-semibold">{data.venta.vencliId?.cliNombre ?? "—"}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(data.venta.venFecha)}
                </p>
              </div>
              <SaleStatusBadge active={data.venta.venEstado} />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border">
            <CardContent className="px-0 sm:px-6">
              <div className="overflow-x-auto">
                <Table className="min-w-[560px]">
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                        Producto
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                        Cantidad
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                        Precio unitario
                      </TableHead>
                      <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
                        Subtotal
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.detalles.map((item) => (
                      <TableRow key={item.dvnId} className="border-border">
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          #{item.dvnproId}
                        </TableCell>
                        <TableCell>{item.dvnCantidad}</TableCell>
                        <TableCell>{formatQ(item.dvnPrecioUnitario)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatQ(item.dvnCantidad * item.dvnPrecioUnitario)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {data.detalles.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="py-10 text-center text-sm text-muted-foreground"
                        >
                          Esta venta no tiene productos registrados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end border-t border-border px-4 py-4 sm:px-0">
                <p className="text-lg font-semibold">Total: {formatQ(total)}</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
