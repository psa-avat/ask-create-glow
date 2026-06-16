import { createFileRoute } from "@tanstack/react-router";
import { AccountingWorkspacePage } from "@/legacy/modules/banque";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/accounting")({
  head: () => ({ meta: [{ title: "Comptabilité — ERP CLUB" }] }),
  component: AccountingRoute,
});

function AccountingRoute() {
  return (
    <LegacyMount
      defaultTab="journal"
      hashToTab={{
        fy: "exercices",
        pcg: "pcg",
        reports: "rapports",
      }}
    >
      <AccountingWorkspacePage />
    </LegacyMount>
  );
}
