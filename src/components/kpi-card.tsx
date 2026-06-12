import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  trend?: { value: string; positive?: boolean };
  accent?: "default" | "success" | "warning" | "destructive";
}

export function KpiCard({ label, value, hint, icon: Icon, trend, accent = "default" }: KpiCardProps) {
  const accentClass = {
    default: "text-accent",
    success: "text-[color:var(--color-success)]",
    warning: "text-[color:var(--color-warning)]",
    destructive: "text-destructive",
  }[accent];

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-5 transition-colors hover:border-accent/40">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        {Icon && (
          <div className={cn("rounded-md bg-secondary p-1.5", accentClass)}>
            <Icon className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="tabular text-2xl font-semibold text-foreground">{value}</span>
        {trend && (
          <span className={cn("text-xs font-medium", trend.positive ? "text-[color:var(--color-success)]" : "text-destructive")}>
            {trend.positive ? "+" : ""}
            {trend.value}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
