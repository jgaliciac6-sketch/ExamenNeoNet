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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Cliente } from "@/lib/types";

export function CustomerTable({ customers }: { customers: Cliente[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[720px]">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              ID
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Cliente
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Email
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
              Estado
            </TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
              Ventas
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.cliId}
              className="border-border transition-colors hover:bg-secondary/40"
            >
              <TableCell className="font-mono text-xs text-muted-foreground">
                {customer.cliId}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 border border-border">
                    <AvatarFallback className="bg-secondary text-xs font-semibold">
                      {customer.cliNombre
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{customer.cliNombre}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{customer.cliEmail}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    customer.cliEstado
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-destructive/30 bg-destructive/10 text-destructive"
                  }
                >
                  {customer.cliEstado ? "Activo" : "Inactivo"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-lg text-primary hover:bg-primary/10"
                >
                  <Link href={`/clientes/${customer.cliId}`}>
                    Ver ventas
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                No se encontraron clientes.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
