"use client";

import { useQuery } from "@tanstack/react-query";
import { PackagePlus } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ProductTable } from "@/components/products/product-table";
import { ProductFormSheet } from "@/components/products/product-form-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductos } from "@/lib/api/productos";

export default function ProductosPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productos"],
    queryFn: getProductos,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Productos"
        description="Catálogo de videojuegos disponibles."
        actions={
          <ProductFormSheet
            trigger={
              <Button className="rounded-xl">
                <PackagePlus className="size-4" /> Nuevo producto
              </Button>
            }
          />
        }
      />

      <Card className="rounded-2xl border-border">
        <CardContent className="px-0 sm:px-6">
          {isLoading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Cargando productos...</p>
          )}
          {isError && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No se pudo cargar el catálogo de productos.
            </p>
          )}
          {data && <ProductTable products={data} />}
        </CardContent>
      </Card>
    </div>
  );
}
