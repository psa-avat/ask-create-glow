import { createFileRoute } from "@tanstack/react-router";
import { Banknote, PlaneTakeoff, Plane, Users, ArrowRight, FileCheck2, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { kpis, unbilledFlights } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daily Operations — ERP CLUB" },
      { name: "description", content: "Cockpit quotidien : facturation, vols, KPIs." },
    ],
  }),
  component: DailyOps,
});

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

function DailyOps() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Daily Operations"
        description="Cockpit du jour — vols, facturation, comptabilisation."
        actions={
          <>
            <Button variant="outline" size="sm">
              <FileCheck2 className="h-4 w-4" />
              Aperçu facturation
            </Button>
            <Button size="sm">
              <Sparkles className="h-4 w-4" />
              Lancer facturation
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Chiffre à facturer"
          value={eur(kpis.pendingRevenue)}
          hint="38 vols en attente"
          icon={Banknote}
          accent="warning"
        />
        <KpiCard
          label="Vols non facturés"
          value={String(kpis.unbilledFlights)}
          hint="3 jours d'arriéré"
          icon={PlaneTakeoff}
        />
        <KpiCard
          label="Vols du jour"
          value={String(kpis.flightsToday)}
          trend={{ value: "12%", positive: true }}
          icon={Plane}
          accent="success"
        />
        <KpiCard
          label="Appareils disponibles"
          value={`${kpis.availableAircraft}/${kpis.totalAircraft}`}
          hint="1 en réservation, 1 en maintenance"
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-xl border bg-card xl:col-span-2">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <div>
              <h2 className="text-sm font-semibold">Vols non facturés</h2>
              <p className="text-xs text-muted-foreground">Source : Planche — lecture seule</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-md">7 sélectionnés</Badge>
              <Button size="sm" variant="ghost" className="gap-1">
                Voir tout
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Vol</TableHead>
                <TableHead>Pilote</TableHead>
                <TableHead>Appareil</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Durée</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unbilledFlights.map((f) => (
                <TableRow key={f.id}>
                  <TableCell><Checkbox defaultChecked /></TableCell>
                  <TableCell className="font-mono text-xs">{f.id}</TableCell>
                  <TableCell className="font-medium">{f.pilot}</TableCell>
                  <TableCell className="font-mono text-xs">{f.aircraft}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{f.type}</Badge>
                  </TableCell>
                  <TableCell className="tabular text-right text-muted-foreground">{f.duration}</TableCell>
                  <TableCell className="tabular text-right font-medium">{eur(f.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="text-sm font-semibold">Flux du jour</h3>
            <p className="mt-1 text-xs text-muted-foreground">Pipeline Planche → Facture → Compta</p>
            <div className="mt-4 space-y-3">
              {[
                { label: "Vols reçus de Planche", value: 24, color: "bg-accent" },
                { label: "Aperçu généré", value: 21, color: "bg-[color:var(--color-warning)]" },
                { label: "Facturés", value: 18, color: "bg-[color:var(--color-success)]" },
                { label: "Comptabilisés", value: 12, color: "bg-primary" },
              ].map((step) => (
                <div key={step.label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{step.label}</span>
                    <span className="tabular font-medium">{step.value}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-secondary">
                    <div className={`h-full rounded-full ${step.color}`} style={{ width: `${(step.value / 24) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <h3 className="text-sm font-semibold">À traiter</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-md border border-dashed p-2">
                <span>2 vols sans pilote identifié</span>
                <Badge variant="destructive" className="rounded-sm">Bloquant</Badge>
              </li>
              <li className="flex items-center justify-between rounded-md border border-dashed p-2">
                <span>1 incohérence horamètre F-CJKL</span>
                <Badge className="rounded-sm bg-[color:var(--color-warning)] text-[color:var(--color-warning-foreground)]">Alerte</Badge>
              </li>
              <li className="flex items-center justify-between rounded-md border border-dashed p-2">
                <span>3 packs à appliquer (post-facturation)</span>
                <Badge variant="secondary" className="rounded-sm">Info</Badge>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
