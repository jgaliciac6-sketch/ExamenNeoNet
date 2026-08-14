import { History, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatQ, type Customer } from "@/lib/mock-data";

export function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[780px]">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">ID</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Cliente</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Email</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Compras</TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Total gastado</TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="border-border transition-colors hover:bg-secondary/40">
              <TableCell className="font-mono text-xs text-muted-foreground">{customer.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 border border-border">
                    <AvatarFallback className="bg-secondary text-xs font-semibold">
                      {customer.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{customer.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{customer.email}</TableCell>
              <TableCell className="text-muted-foreground">{customer.purchases} compras</TableCell>
              <TableCell className="font-semibold">{formatQ(customer.totalSpent)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Acciones">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem>
                      <History className="size-4" /> Ver historial
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="size-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="size-4" /> Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                No se encontraron clientes.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
