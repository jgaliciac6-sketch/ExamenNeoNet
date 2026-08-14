import { useRouterState } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mock-data";

function titleFor(pathname: string) {
  if (pathname.startsWith("/productos")) return "Productos";
  if (pathname.startsWith("/clientes")) return "Clientes";
  if (pathname === "/ventas/nueva") return "Nueva venta";
  if (pathname.startsWith("/ventas/")) return "Detalle de venta";
  if (pathname.startsWith("/ventas")) return "Ventas";
  return "Dashboard";
}

export function Header() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <h1 className="truncate text-base font-semibold tracking-tight md:text-lg">
        {titleFor(pathname)}
      </h1>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="h-9 w-44 rounded-xl border-border bg-secondary/60 pl-9 lg:w-64"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative rounded-xl" aria-label="Notificaciones">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
        </Button>
        <Avatar className="size-9 border border-border">
          <AvatarFallback className="brand-gradient-bg text-xs font-semibold text-primary-foreground">
            {currentUser.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
