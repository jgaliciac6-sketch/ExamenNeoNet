"use client";

import { useCallback, useEffect, useState } from "react";
import { PackagePlus } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ProductTable } from "@/components/products/product-table";
import { ProductFormSheet } from "@/components/products/product-form-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllProductos } from "@/queries/producto/get-all-productos";
import type { Producto } from "@/lib/types";

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    getAllProductos()
      .then((data) => {
        setProductos(data);
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
        title="Productos"
        description="Catálogo de videojuegos disponibles."
        actions={
          <ProductFormSheet
            onCreated={load}
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
          {loading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Cargando productos...</p>
          )}
          {!loading && loadError && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No se pudo cargar el catálogo de productos.
            </p>
          )}
          {!loading && !loadError && <ProductTable products={productos} />}
        </CardContent>
      </Card>
    </div>
  );
}
