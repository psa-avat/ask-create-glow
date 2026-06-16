import { createFileRoute } from "@tanstack/react-router";
import { PurchasesWorkspacePage } from "@/legacy/modules/banque";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/purchases")({
  head: () => ({ meta: [{ title: "Achats — ERP CLUB" }] }),
  component: PurchasesRoute,
});

function PurchasesRoute() {
  return (
    <LegacyMount
      defaultTab="factures"
      hashToTab={{
        suppliers: "fournisseurs",
      }}
    >
      <PurchasesWorkspacePage />
    </LegacyMount>
  );
}
