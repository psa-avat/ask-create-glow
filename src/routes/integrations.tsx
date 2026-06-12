import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertCircle, Plug } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/integrations")({
  head: () => ({ meta: [{ title: "Integrations — ERP CLUB" }] }),
  component: IntegrationsPage,
});

const integrations = [
  { name: "Planche", desc: "Source des vols exécutés", status: "connected", last: "Il y a 4 min" },
  { name: "FFVP", desc: "Fédération Française de Vol en Planeur", status: "connected", last: "Il y a 2 h" },
  { name: "Gesasso", desc: "Gestion associative", status: "warning", last: "Échec hier 22:14" },
  { name: "Banque (CSV)", desc: "Import relevés", status: "disconnected", last: "Jamais" },
];

function IntegrationsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader title="Integrations" description="Connecteurs externes — Planche, FFVP, Gesasso, banque." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {integrations.map((i) => (
          <div key={i.name} className="flex items-start justify-between rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-secondary p-2"><Plug className="h-5 w-5 text-accent" /></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{i.name}</span>
                  {i.status === "connected" && <Badge className="rounded-sm bg-[color:var(--color-success)] text-[color:var(--color-success-foreground)]"><CheckCircle2 className="mr-1 h-3 w-3" />Connecté</Badge>}
                  {i.status === "warning" && <Badge className="rounded-sm bg-[color:var(--color-warning)] text-[color:var(--color-warning-foreground)]"><AlertCircle className="mr-1 h-3 w-3" />Erreur</Badge>}
                  {i.status === "disconnected" && <Badge variant="outline" className="rounded-sm">Inactif</Badge>}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{i.desc}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">Dernière sync : {i.last}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configurer</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
