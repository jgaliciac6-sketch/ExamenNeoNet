import { useState, type FormEvent, type ReactNode } from "react";
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

interface Errors {
  name?: string;
  price?: string;
  stock?: string;
}

/**
 * Formulario visual de producto.
 * Preparado para conectarse a una acción de servidor (crear/editar producto):
 * basta con reemplazar `handleSubmit` por la llamada correspondiente.
 */
export function ProductFormSheet({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const price = String(data.get("price") ?? "").trim();
    const stock = String(data.get("stock") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "El nombre es obligatorio.";
    if (!price || Number(price) <= 0) next.price = "Ingresa un precio válido.";
    if (stock === "" || Number(stock) < 0) next.stock = "Ingresa un stock válido.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO: conectar con la acción de servidor de creación de producto.
    toast.success("Producto listo para guardar", {
      description: "Pendiente de conectar la acción de servidor.",
    });
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>Nuevo producto</SheetTitle>
            <SheetDescription>Agrega un videojuego al catálogo.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" placeholder="The Legend of Zelda" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Precio (Q)</Label>
              <Input id="price" name="price" type="number" step="0.01" min="0" placeholder="599.00" />
              {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" min="0" placeholder="12" />
              {errors.stock && <p className="text-xs text-destructive">{errors.stock}</p>}
            </div>
          </div>

          <SheetFooter className="flex-row justify-end gap-2">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="rounded-xl">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit" className="rounded-xl">
              Guardar producto
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
