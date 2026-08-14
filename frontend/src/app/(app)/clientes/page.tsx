"use client";

import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { CustomerTable } from "@/components/customers/customer-table";
import { CustomerFormSheet } from "@/components/customers/customer-form-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getClientes } from "@/lib/api/clientes";

export default function ClientesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["clientes"],
    queryFn: getClientes,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clientes"
        description="Listado de clientes registrados."
        actions={
          <CustomerFormSheet
            trigger={
              <Button className="rounded-xl">
                <UserPlus className="size-4" /> Nuevo cliente
              </Button>
            }
          />
        }
      />

      <Card className="rounded-2xl border-border">
        <CardContent className="px-0 sm:px-6">
          {isLoading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Cargando clientes...</p>
          )}
          {isError && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No se pudo cargar el listado de clientes.
            </p>
          )}
          {data && <CustomerTable customers={data} />}
        </CardContent>
      </Card>
    </div>
  );
}
