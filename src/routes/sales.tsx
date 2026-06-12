import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/sales")({
  head: () => ({ meta: [{ title: "Sales & Suppliers — ERP CLUB" }] }),
  component: SalesPage,
});

function SalesPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Sales & Suppliers"
        description="Facturation libre, paiements, fournisseurs."
        actions={<Button size="sm"><Plus className="h-4 w-4" />Nouvelle facture</Button>}
      />
      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Factures</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="mt-4">
          <Empty label="Aucune facture ce mois" />
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <Empty label="Historique des paiements" />
        </TabsContent>
        <TabsContent value="suppliers" className="mt-4">
          <Empty label="Annuaire fournisseurs" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
function Empty({ label }: { label: string }) {
  return (
    <div className="flex h-56 items-center justify-center rounded-xl border border-dashed bg-card text-sm text-muted-foreground">
      {label}
    </div>
  );
}
