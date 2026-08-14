"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setNewSale } from "@/actions/venta/set-new-sale-action";
import { initialActionState } from "@/actions/action-state";
import type { Producto } from "@/lib/types";

interface Line {
  key: string;
  dvnproId: number;
  dvnCantidad: number;
  dvnPrecioUnitario: number;
}

function formatQ(value: number) {
  return `Q ${value.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function NewSaleSheet({
  cliId,
  productos,
  trigger,
  onCreated,
}: {
  cliId: number;
  productos: Producto[];
  trigger: ReactNode;
  onCreated?: () => void;
}) {
  const [state, formAction, isPending] = useActionState(setNewSale, initialActionState);
  const [lines, setLines] = useState<Line[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message ?? "Venta registrada correctamente.");
      setLines([]);
      formRef.current?.reset();
      closeRef.current?.click();
      onCreated?.();
    }
  }, [state, onCreated]);

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
    const producto = productos.find((p) => p.proId === productId);
    updateLine(key, {
      dvnproId: productId,
      dvnPrecioUnitario: producto?.proPrecio ?? 0,
      dvnCantidad: 1,
    });
  }

  const total = lines.reduce((sum, line) => sum + line.dvnCantidad * line.dvnPrecioUnitario, 0);
  const detallesJson = JSON.stringify(
    lines.map(({ dvnproId, dvnCantidad, dvnPrecioUnitario }) => ({
      dvnproId,
      dvnCantidad,
      dvnPrecioUnitario,
    })),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <form ref={formRef} action={formAction} className="flex h-full flex-col">
          <input type="hidden" name="cliId" value={cliId} />
          <input type="hidden" name="detalles" value={detallesJson} />

          <SheetHeader>
            <SheetTitle>Nueva venta</SheetTitle>
            <SheetDescription>Agrega los productos de esta venta.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-4 overflow-y-auto px-4">
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
                Agrega al menos un producto.
              </p>
            )}

            {lines.map((line) => {
              const producto = productos.find((p) => p.proId === line.dvnproId);
              return (
                <div key={line.key} className="space-y-3 rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <Select
                      value={line.dvnproId ? String(line.dvnproId) : ""}
                      onValueChange={(value) => handleProductChange(line.key, Number(value))}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecciona un producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {productos.map((p) => (
                          <SelectItem
                            key={p.proId}
                            value={String(p.proId)}
                            disabled={p.proStock <= 0}
                          >
                            {p.proNombre} ({p.proStock} en stock)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0 rounded-lg text-destructive hover:bg-destructive/10"
                      onClick={() => removeLine(line.key)}
                      aria-label="Quitar línea"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">
                        Cantidad {producto && `(máx. ${producto.proStock})`}
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        max={producto?.proStock ?? undefined}
                        value={line.dvnCantidad}
                        onChange={(e) => {
                          const raw = Number(e.target.value);
                          const capped = producto ? Math.min(raw, producto.proStock) : raw;
                          updateLine(line.key, { dvnCantidad: capped });
                        }}
                      />
                    </div>
                    <div className="space-y-1">
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
                  </div>
                </div>
              );
            })}

            {state.errors.length > 0 && (
              <div className="space-y-1 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
                {state.errors.map((error) => (
                  <p key={error} className="text-xs text-destructive">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <p className="text-right text-sm font-semibold">Total: {formatQ(total)}</p>
          </div>

          <SheetFooter className="flex-row justify-end gap-2">
            <SheetClose ref={closeRef} asChild>
              <Button type="button" variant="outline" className="rounded-xl">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit" className="rounded-xl" disabled={isPending || lines.length === 0}>
              {isPending ? "Guardando..." : "Registrar venta"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
