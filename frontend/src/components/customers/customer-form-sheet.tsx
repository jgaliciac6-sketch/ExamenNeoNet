"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
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
import { setNewCliente } from "@/actions/cliente/set-new-cliente-action";
import { initialActionState } from "@/actions/action-state";

export function CustomerFormSheet({
  trigger,
  onCreated,
}: {
  trigger: ReactNode;
  onCreated?: () => void;
}) {
  const [state, formAction, isPending] = useActionState(setNewCliente, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message ?? "Cliente creado correctamente.");
      formRef.current?.reset();
      closeRef.current?.click();
      onCreated?.();
    }
  }, [state, onCreated]);

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <form ref={formRef} action={formAction} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>Nuevo cliente</SheetTitle>
            <SheetDescription>Registra un cliente en el sistema.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4">
            <div className="space-y-2">
              <Label htmlFor="cliNombre">Nombre</Label>
              <Input id="cliNombre" name="cliNombre" placeholder="Carlos Hernández" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cliEmail">Email</Label>
              <Input id="cliEmail" name="cliEmail" type="email" placeholder="carlos@email.com" />
            </div>

            {state.errors.length > 0 && (
              <div className="space-y-1 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
                {state.errors.map((error) => (
                  <p key={error} className="text-xs text-destructive">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          <SheetFooter className="flex-row justify-end gap-2">
            <SheetClose ref={closeRef} asChild>
              <Button type="button" variant="outline" className="rounded-xl">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit" className="rounded-xl" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar cliente"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
