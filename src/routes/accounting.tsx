import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/accounting")({
  head: () => ({ meta: [{ title: "Comptabilité — ERP CLUB" }] }),
  component: AccountingPage,
});

const tabs = [
  { value: "journal", label: "Journal", hash: "" },
  { value: "fy", label: "Exercices", hash: "fy" },
  { value: "pcg", label: "Plan comptable", hash: "pcg" },
];

function AccountingPage() {
  const hash = useRouterState({ select: (s) => (s.location.hash ?? "").replace(/^#/, "") });
  const active = tabs.find((t) => t.hash === hash)?.value ?? "journal";
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader title="Comptabilité" description="Journal, exercices et plan comptable général." />
      <Tabs value={active}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.value} value={t.value} asChild>
              <a href={t.hash ? `#${t.hash}` : "#"}>{t.label}</a>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="journal" className="mt-4"><Empty label="Écritures comptables" /></TabsContent>
        <TabsContent value="fy" className="mt-4"><Empty label="Exercices comptables" /></TabsContent>
        <TabsContent value="pcg" className="mt-4"><Empty label="Plan comptable général" /></TabsContent>
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
