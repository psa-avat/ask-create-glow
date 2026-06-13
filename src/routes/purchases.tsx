import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/purchases")({
  head: () => ({ meta: [{ title: "Achats — ERP CLUB" }] }),
  component: PurchasesPage,
});

const tabs = [
  { value: "invoices", label: "Factures fournisseurs", hash: "" },
  { value: "suppliers", label: "Fournisseurs", hash: "suppliers" },
];

function PurchasesPage() {
  const hash = useRouterState({ select: (s) => (s.location.hash ?? "").replace(/^#/, "") });
  const active = tabs.find((t) => t.hash === hash)?.value ?? "invoices";
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Achats"
        description="Factures fournisseurs, paiements et annuaire."
        actions={<Button size="sm"><Plus className="h-4 w-4" />Nouvelle facture</Button>}
      />
      <Tabs value={active}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.value} value={t.value} asChild>
              <a href={t.hash ? `#${t.hash}` : "#"}>{t.label}</a>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="invoices" className="mt-4"><Empty label="Factures fournisseurs" /></TabsContent>
        <TabsContent value="suppliers" className="mt-4"><Empty label="Annuaire fournisseurs" /></TabsContent>
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
