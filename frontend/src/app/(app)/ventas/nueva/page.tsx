"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getClientes } from "@/lib/api/clientes";
import { getProductos } from "@/lib/api/productos";
import { crearVenta } from "@/lib/api/ventas";
import type { CrearVentaDetalleRequest } from "@/lib/types";

interface Line extends CrearVentaDetalleRequest {
  key: string;
}

function formatQ(value: number) {
  return `Q ${value.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function NuevaVentaPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const clientesQuery = useQuery({ queryKey: ["clientes"], queryFn: getClientes });
  const productosQuery = useQuery({ queryKey: ["productos"], queryFn: getProductos });

  const [clienteId, setClienteId] = useState<string>("");
  const [lines, setLines] = useState<Line[]>([]);

  const mutation = useMutation({
    mutationFn: crearVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      toast.success("Venta registrada correctamente.");
      router.push("/ventas");
    },
    onError: () => {
      toast.error("No se pudo registrar la venta", {
        description: "Intenta de nuevo más tarde.",
      });
    },
  });

  function addLine() {
    setLines((prev) => [
      ...prev,
      { key: crypto.randomUUID(), dvnproId: 0, dvnCantidad: 1, dvnPrecioUnitario: 0 },
    ]);
  }

  function removeLine(key: string) {
    setLines((prev) => prev.filter((line) => line.key !== key));
  }

  function updateLine(key: string, patch: Partial<Line>) {
    setLines((prev) => prev.map((line) => (line.key === key ? { ...line, ...patch } : line)));
  }

  function handleProductChange(key: string, productId: number) {
    const producto = productosQuery.data?.find((p) => p.proId === productId);
    updateLine(key, { dvnproId: productId, dvnPrecioUnitario: producto?.proPrecio ?? 0 });
  }

  const total = lines.reduce((sum, line) => sum + line.dvnCantidad * line.dvnPrecioUnitario, 0);

  function handleSubmit() {
    if (!clienteId) {
      toast.error("Selecciona un cliente.");
      return;
    }
    if (lines.length === 0 || lines.some((l) => !l.dvnproId || l.dvnCantidad <= 0)) {
      toast.error("Agrega al menos un producto válido.");
      return;
    }

    mutation.mutate({
      vencliId: Number(clienteId),
      venFecha: new Date().toISOString(),
      venEstado: true,
      detalles: lines.map(({ dvnproId, dvnCantidad, dvnPrecioUnitario }) => ({
        dvnproId,
        dvnCantidad,
        dvnPrecioUnitario,
      })),
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Nueva venta" description="Registra una venta con sus productos." />

      <Card className="rounded-2xl border-border">
        <CardContent className="space-y-6 p-6">
          <div className="max-w-sm space-y-2">
            <Label>Cliente</Label>
            <Select value={clienteId} onValueChange={setClienteId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientesQuery.data?.map((cliente) => (
                  <SelectItem key={cliente.cliId} value={String(cliente.cliId)}>
                    {cliente.cliNombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Productos</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={addLine}
              >
                <Plus className="size-4" /> Agregar línea
              </Button>
            </div>

            {lines.length === 0 && (
              <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                Agrega al menos un producto a la venta.
              </p>
            )}

            {lines.map((line) => (
              <div
                key={line.key}
                className="grid grid-cols-1 items-end gap-3 rounded-xl border border-border p-4 sm:grid-cols-[1fr_120px_140px_auto]"
              >
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Producto</Label>
                  <Select
                    value={line.dvnproId ? String(line.dvnproId) : ""}
                    onValueChange={(value) => handleProductChange(line.key, Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productosQuery.data?.map((producto) => (
                        <SelectItem key={producto.proId} value={String(producto.proId)}>
                          {producto.proNombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Cantidad</Label>
                  <Input
                    type="number"
                    min="1"
                    value={line.dvnCantidad}
                    onChange={(e) => updateLine(line.key, { dvnCantidad: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Precio unitario</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={line.dvnPrecioUnitario}
                    onChange={(e) =>
                      updateLine(line.key, { dvnPrecioUnitario: Number(e.target.value) })
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-lg text-destructive hover:bg-destructive/10"
                  onClick={() => removeLine(line.key)}
                  aria-label="Quitar línea"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="text-lg font-semibold">Total: {formatQ(total)}</p>
            <Button className="rounded-xl" onClick={handleSubmit} disabled={mutation.isPending}>
              {mutation.isPending ? "Guardando..." : "Registrar venta"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
