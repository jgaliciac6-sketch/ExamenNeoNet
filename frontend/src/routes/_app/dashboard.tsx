import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Coins, Package, Receipt, Users } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { SalesTable } from "@/components/sales/sales-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dashboardStats, formatQ, sales } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard de ventas | Nexus Games" },
      {
        name: "description",
        content:
          "Resumen de ventas del día, ingresos, productos vendidos y clientes atendidos en Nexus Games.",
      },
      { property: "og:title", content: "Dashboard de ventas | Nexus Games" },
      {
        property: "og:description",
        content: "Métricas de ventas y actividad reciente de la tienda Nexus Games.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Resumen general de la actividad de ventas."
        actions={
          <Button asChild className="rounded-xl">
            <Link to="/ventas/nueva">
              Nueva venta <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Ventas del día" value={String(dashboardStats.salesToday)} trend="+12.5%" icon={Receipt} />
        <StatCard label="Total vendido" value={formatQ(dashboardStats.totalSold)} trend="+8.2%" icon={Coins} />
        <StatCard
          label="Productos vendidos"
          value={String(dashboardStats.productsSold)}
          trend="+4.1%"
          icon={Package}
        />
        <StatCard
          label="Clientes atendidos"
          value={String(dashboardStats.customersServed)}
          trend="-2.4%"
          trendUp={false}
          icon={Users}
        />
      </div>

      <Card className="rounded-2xl border-border">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div>
            <CardTitle className="text-lg">Ventas recientes</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Últimas transacciones registradas.</p>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-xl">
            <Link to="/ventas">Ver todas</Link>
          </Button>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <SalesTable sales={sales} />
        </CardContent>
      </Card>
    </div>
  );
}
