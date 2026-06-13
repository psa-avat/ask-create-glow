import { createFileRoute } from "@tanstack/react-router";
import { Plus, Receipt } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { KpiCard } from "@/components/kpi-card";
import { useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/flights")({
  head: () => ({ meta: [{ title: "Facturation & Vols — ERP CLUB" }] }),
  component: FlightsPage,
});

const tabs = [
  { value: "flights", label: "Vols", hash: "" },
  { value: "billing", label: "Facturation", hash: "billing" },
  { value: "packs", label: "Packs", hash: "packs" },
  { value: "fetch", label: "Planche — récupération", hash: "fetch" },
];

function FlightsPage() {
  const hash = useRouterState({ select: (s) => (s.location.hash ?? "").replace(/^#/, "") });
  const active = tabs.find((t) => t.hash === hash)?.value ?? "flights";

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Facturation & Vols"
        description="Saisie des vols, facturation OSRT/Gesasso, packs et import Planche."
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Nouveau vol
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Vols ce mois" value="142" hint="+18 vs. M-1" trend={{ value: "14%", positive: true }} />
        <KpiCard label="Heures facturées" value="218 h" trend={{ value: "12%", positive: true }} />
        <KpiCard label="À facturer" value="3 240 €" accent="warning" hint="6 vols en attente" />
        <KpiCard label="Packs actifs" value="27" hint="3 expirations < 30j" />
      </div>
      <Tabs value={active}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.value} value={t.value} asChild>
              <a href={t.hash ? `#${t.hash}` : "#"}>{t.label}</a>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="flights" className="mt-4">
          <Empty label="Liste des vols (skeleton)" icon={<Receipt className="h-5 w-5" />} />
        </TabsContent>
        <TabsContent value="billing" className="mt-4">
          <Empty label="Lignes de facturation à valider" />
        </TabsContent>
        <TabsContent value="packs" className="mt-4">
          <Empty label="Packs membres et consommation" />
        </TabsContent>
        <TabsContent value="fetch" className="mt-4">
          <Empty label="Synchronisation Planche → ERP" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Empty({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-card text-sm text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
  );
}
