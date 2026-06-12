import { createFileRoute } from "@tanstack/react-router";
import { Banknote, FileText, Receipt, Wallet } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { journalEntries, kpis } from "@/lib/mock-data";

export const Route = createFileRoute("/finance")({
  head: () => ({ meta: [{ title: "Finance — ERP CLUB" }] }),
  component: FinancePage,
});

const eur = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

function FinancePage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Finance"
        description="Comptabilité PCG, journaux, rapprochement, packs."
        actions={<Button size="sm"><FileText className="h-4 w-4" />Exporter FEC</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="CA du mois" value={eur(kpis.monthRevenue)} icon={Banknote} accent="success" trend={{ value: "8.4%", positive: true }} />
        <KpiCard label="Dépenses du mois" value={eur(kpis.monthExpenses)} icon={Receipt} />
        <KpiCard label="Encours clients" value={eur(4_230)} icon={Wallet} accent="warning" />
        <KpiCard label="Trésorerie" value={eur(58_120)} icon={Banknote} />
      </div>

      <Tabs defaultValue="journals">
        <TabsList>
          <TabsTrigger value="journals">Journaux</TabsTrigger>
          <TabsTrigger value="entries">Écritures</TabsTrigger>
          <TabsTrigger value="packs">Packs</TabsTrigger>
          <TabsTrigger value="reconciliation">Rapprochement</TabsTrigger>
        </TabsList>
        <TabsContent value="journals" className="mt-4">
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pièce</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead>Journal</TableHead>
                  <TableHead className="text-right">Débit</TableHead>
                  <TableHead className="text-right">Crédit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {journalEntries.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-mono text-xs">{e.id}</TableCell>
                    <TableCell className="tabular text-muted-foreground">{e.date}</TableCell>
                    <TableCell>{e.label}</TableCell>
                    <TableCell><Badge variant="outline" className="font-mono text-[10px]">{e.journal}</Badge></TableCell>
                    <TableCell className="tabular text-right">{eur(e.debit)}</TableCell>
                    <TableCell className="tabular text-right">{eur(e.credit)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="entries" className="mt-4">
          <EmptyTab title="Détail des écritures" />
        </TabsContent>
        <TabsContent value="packs" className="mt-4">
          <EmptyTab title="Packs et ajustements REM" />
        </TabsContent>
        <TabsContent value="reconciliation" className="mt-4">
          <EmptyTab title="Rapprochement bancaire" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyTab({ title }: { title: string }) {
  return (
    <div className="flex h-48 items-center justify-center rounded-xl border border-dashed bg-card text-sm text-muted-foreground">
      {title} — à implémenter
    </div>
  );
}
