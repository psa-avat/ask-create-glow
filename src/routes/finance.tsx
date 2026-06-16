import { createFileRoute } from "@tanstack/react-router";
import { FinanceWorkspacePage } from "@/legacy/modules/banque";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/finance")({
  head: () => ({ meta: [{ title: "Banque — ERP CLUB" }] }),
  component: FinanceRoute,
});

function FinanceRoute() {
  return (
    <LegacyMount
      defaultTab="apercu"
      hashToTab={{
        operations: "operations",
        packs: "packs",
        recurring: "recurring",
        reconciliation: "rapprochement",
      }}
    >
      <FinanceWorkspacePage />
    </LegacyMount>
  );
}
