import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Clock, Wallet, Package } from "lucide-react";
import { KpiCard } from "@/components/kpi-card";
import { memberFlights, memberPacks } from "@/lib/mock-data";

export const Route = createFileRoute("/portal/")({
  head: () => ({ meta: [{ title: "Espace pilote — ERP CLUB" }] }),
  component: PortalHome,
});

const eur = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

function PortalHome() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label="Heures cette saison" value="42:18" icon={Clock} accent="success" />
        <KpiCard label="Vols ce mois" value="9" icon={Plane} />
        <KpiCard label="Solde compte" value="−42,50 €" icon={Wallet} accent="destructive" />
        <KpiCard label="Pack actif" value="3:36 / 10h" icon={Package} accent="warning" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <h3 className="text-sm font-semibold">Derniers vols</h3>
            <Link to="/portal/logbook" className="text-xs text-accent hover:underline">Voir le logbook →</Link>
          </div>
          <ul className="divide-y">
            {memberFlights.slice(0, 4).map((f) => (
              <li key={f.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <div className="flex items-center gap-3">
                  <Plane className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{f.aircraft} · {f.type}</div>
                    <div className="text-xs text-muted-foreground tabular">{f.date} · {f.duration}</div>
                  </div>
                </div>
                <div className="tabular font-medium">{eur(f.amount)}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="text-sm font-semibold">Mes packs</h3>
          <div className="mt-4 space-y-4">
            {memberPacks.map((p) => {
              const pct = (p.consumed / p.total) * 100;
              return (
                <div key={p.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{p.name}</span>
                    <span className="tabular text-xs text-muted-foreground">{p.consumed}h / {p.total}h</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
