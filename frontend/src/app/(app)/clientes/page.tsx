"use client";

import { useCallback, useEffect, useState } from "react";
import { UserPlus } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { CustomerTable } from "@/components/customers/customer-table";
import { CustomerFormSheet } from "@/components/customers/customer-form-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllClientes } from "@/queries/cliente/get-all-clientes";
import type { Cliente } from "@/lib/types";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    getAllClientes()
      .then((data) => {
        setClientes(data);
        setLoadError(false);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clientes"
        description="Listado de clientes registrados."
        actions={
          <CustomerFormSheet
            onCreated={load}
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
          {loading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Cargando clientes...</p>
          )}
          {!loading && loadError && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No se pudo cargar el listado de clientes.
            </p>
          )}
          {!loading && !loadError && <CustomerTable customers={clientes} />}
        </CardContent>
      </Card>
    </div>
  );
}
