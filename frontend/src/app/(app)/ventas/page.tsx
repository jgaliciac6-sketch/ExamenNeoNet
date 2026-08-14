"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { SalesTable } from "@/components/sales/sales-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getVentas } from "@/lib/api/ventas";

export default function VentasPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ventas"],
    queryFn: getVentas,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ventas"
        description="Ventas registradas en el sistema."
        actions={
          <Button asChild className="rounded-xl">
            <Link href="/ventas/nueva">
              Nueva venta <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <Card className="rounded-2xl border-border">
        <CardContent className="px-0 sm:px-6">
          {isLoading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Cargando ventas...</p>
          )}
          {isError && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No se pudo cargar el listado de ventas.
            </p>
          )}
          {data && <SalesTable ventas={data} />}
        </CardContent>
      </Card>
    </div>
  );
}
