import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memberPacks } from "@/lib/mock-data";

export const Route = createFileRoute("/portal/packs")({
  head: () => ({ meta: [{ title: "Mes packs — ERP CLUB" }] }),
  component: PacksPage,
});

function PacksPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Mes packs</h2>
        <Button size="sm"><Package className="h-4 w-4" />Acheter un pack</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {memberPacks.map((p) => {
          const pct = (p.consumed / p.total) * 100;
          const done = p.consumed >= p.total;
          return (
            <div key={p.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">Acheté le {p.purchased} · {p.value} €</div>
                </div>
                <Package className="h-5 w-5 text-accent" />
              </div>
              <div className="mt-4 flex items-baseline justify-between text-sm">
                <span className="tabular font-medium">{p.consumed}h consommées</span>
                <span className="text-muted-foreground">/ {p.total}h</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary">
                <div className={`h-full rounded-full ${done ? "bg-muted-foreground" : "bg-accent"}`} style={{ width: `${pct}%` }} />
              </div>
              {done && <div className="mt-2 text-xs text-muted-foreground">Pack consommé</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
