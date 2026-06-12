import { createFileRoute } from "@tanstack/react-router";
import { Plus, Plane } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aircraft } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assets")({
  head: () => ({ meta: [{ title: "Assets & Availability — ERP CLUB" }] }),
  component: AssetsPage,
});

const statusStyle = {
  available: "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)] border-[color:var(--color-success)]/30",
  reserved: "bg-[color:var(--color-warning)]/15 text-[color:var(--color-warning)] border-[color:var(--color-warning)]/30",
  unavailable: "bg-destructive/15 text-destructive border-destructive/30",
} as const;

const statusLabel = { available: "Disponible", reserved: "Réservé", unavailable: "Indisponible" };

function AssetsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Assets & Availability"
        description="Flotte et disponibilités — ERP est le maître, poussé vers Planche."
        actions={<Button size="sm"><Plus className="h-4 w-4" />Nouvelle indisponibilité</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aircraft.map((a) => (
          <div key={a.id} className="rounded-xl border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Plane className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-mono text-sm font-semibold">{a.id}</div>
                  <div className="text-xs text-muted-foreground">{a.model} · {a.type}</div>
                </div>
              </div>
              <Badge variant="outline" className={cn("rounded-md text-[10px]", statusStyle[a.status as keyof typeof statusStyle])}>
                {statusLabel[a.status as keyof typeof statusLabel]}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground">Heures cellule</div>
                <div className="tabular mt-0.5 font-medium">{a.hours.toLocaleString("fr-FR")} h</div>
              </div>
              <div>
                <div className="text-muted-foreground">Prochaine visite</div>
                <div className="tabular mt-0.5 font-medium">{a.nextCheck}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-sm font-semibold">Calendrier disponibilités</h3>
        <p className="mt-1 text-xs text-muted-foreground">Vue planning hebdomadaire — à implémenter</p>
        <div className="mt-4 grid grid-cols-7 gap-1 text-[11px]">
          {Array.from({ length: 7 * aircraft.length }).map((_, i) => {
            const v = (i * 31) % 10;
            const cls = v < 6 ? "bg-[color:var(--color-success)]/20" : v < 8 ? "bg-[color:var(--color-warning)]/30" : "bg-destructive/30";
            return <div key={i} className={cn("h-10 rounded", cls)} />;
          })}
        </div>
      </div>
    </div>
  );
}
