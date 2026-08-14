import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SaleStatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Producto, Venta } from "@/lib/types";

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

export function SaleHistory({ ventas, productos }: { ventas: Venta[]; productos: Producto[] }) {
  if (ventas.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Este cliente no tiene ventas registradas.
      </p>
    );
  }

  return (
    <Accordion type="single" collapsible className="px-4 sm:px-0">
      {ventas.map((venta) => {
        const lineas = venta.lstDetalleVenta ?? [];
        const total = lineas.reduce(
          (sum, item) => sum + item.dvnCantidad * item.dvnPrecioUnitario,
          0,
        );

        return (
          <AccordionItem key={venta.venId} value={String(venta.venId)} className="border-border">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-1 flex-wrap items-center justify-between gap-2 pr-2 text-left">
                <div>
                  <p className="font-medium">Venta #{String(venta.venId).padStart(6, "0")}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(venta.venFecha)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{formatQ(total)}</span>
                  <SaleStatusBadge active={venta.venEstado} />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <Table className="min-w-[480px]">
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
                    {lineas.map((item) => (
                      <TableRow key={item.dvnId} className="border-border">
                        <TableCell>
                          {productos.find((p) => p.proId === item.dvnproId)?.proNombre ??
                            `#${item.dvnproId}`}
                        </TableCell>
                        <TableCell>{item.dvnCantidad}</TableCell>
                        <TableCell>{formatQ(item.dvnPrecioUnitario)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatQ(item.dvnCantidad * item.dvnPrecioUnitario)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
