import { createFileRoute } from "@tanstack/react-router";
import { SalesWorkspacePage } from "@/legacy/modules/banque";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/sales")({
  head: () => ({ meta: [{ title: "Ventes — ERP CLUB" }] }),
  component: SalesRoute,
});

function SalesRoute() {
  return (
    <LegacyMount
      defaultTab="ventes"
      hashToTab={{
        invoices: "factures",
        payments: "paiements",
        entries: "ecritures",
      }}
    >
      <SalesWorkspacePage />
    </LegacyMount>
  );
}
