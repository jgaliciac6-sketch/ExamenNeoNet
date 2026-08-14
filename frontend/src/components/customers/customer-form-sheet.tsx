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
  email?: string;
}

/**
 * Formulario visual de cliente.
 * Preparado para conectarse a una acción de servidor (crear/editar cliente).
 */
export function CustomerFormSheet({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "El nombre es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Ingresa un correo válido.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO: conectar con la acción de servidor de creación de cliente.
    toast.success("Cliente listo para guardar", {
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
            <SheetTitle>Nuevo cliente</SheetTitle>
            <SheetDescription>Registra un cliente en el sistema.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Nombre</Label>
              <Input id="customer-name" name="name" placeholder="Carlos Hernández" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-email">Email</Label>
              <Input id="customer-email" name="email" type="email" placeholder="carlos@email.com" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <SheetFooter className="flex-row justify-end gap-2">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="rounded-xl">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit" className="rounded-xl">
              Guardar cliente
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
