import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  hint?: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, trend, trendUp = true, hint, icon: Icon }: StatCardProps) {
  return (
    <Card className="group gap-0 rounded-2xl border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]">
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-secondary/60 text-primary transition-colors group-hover:border-primary/40">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
            trendUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
          )}
        >
          {trendUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {trend}
        </span>
        <span className="text-muted-foreground">{hint ?? "comparado con ayer"}</span>
      </div>
    </Card>
  );
}
