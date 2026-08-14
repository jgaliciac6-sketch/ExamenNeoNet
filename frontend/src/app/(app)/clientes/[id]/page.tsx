"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CirclePlus } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { SaleHistory } from "@/components/sales/sale-history";
import { NewSaleSheet } from "@/components/sales/new-sale-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllClientes } from "@/queries/cliente/get-all-clientes";
import { getAllProductos } from "@/queries/producto/get-all-productos";
import { getSalesByClient } from "@/queries/venta/get-sales-by-client";
import type { Cliente, Producto, Venta } from "@/lib/types";

export default function ClienteDetallePage() {
  const params = useParams<{ id: string }>();
  const cliId = Number(params.id);

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadCliente = useCallback(() => {
    getAllClientes().then((data) => setCliente(data.find((c) => c.cliId === cliId) ?? null));
  }, [cliId]);

  const loadProductos = useCallback(() => {
    getAllProductos().then(setProductos);
  }, []);

  const loadVentas = useCallback(() => {
    setLoading(true);
    getSalesByClient(cliId)
      .then((data) => {
        setVentas(data);
        setLoadError(false);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [cliId]);

  useEffect(() => {
    loadCliente();
    loadProductos();
    loadVentas();
  }, [loadCliente, loadProductos, loadVentas]);

  const handleSaleCreated = useCallback(() => {
    loadVentas();
    loadProductos();
  }, [loadVentas, loadProductos]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={cliente?.cliNombre ?? "Cliente"}
        description={cliente?.cliEmail}
        actions={
          <NewSaleSheet
            cliId={cliId}
            productos={productos}
            onCreated={handleSaleCreated}
            trigger={
              <Button className="rounded-xl">
                <CirclePlus className="size-4" /> Nueva venta
              </Button>
            }
          />
        }
      />

      <Card className="rounded-2xl border-border">
        <CardContent className="px-0 sm:px-6">
          {loading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Cargando ventas...</p>
          )}
          {!loading && loadError && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No se pudo cargar el historial de ventas.
            </p>
          )}
          {!loading && !loadError && <SaleHistory ventas={ventas} productos={productos} />}
        </CardContent>
      </Card>
    </div>
  );
}
