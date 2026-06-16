import { createFileRoute } from "@tanstack/react-router";
import { MembersWorkspacePage } from "@/legacy/modules/members";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/members")({
  head: () => ({ meta: [{ title: "Membres — ERP CLUB" }] }),
  component: MembersRoute,
});

function MembersRoute() {
  return (
    <LegacyMount
      defaultTab="annuaire"
      hashToTab={{
        committees: "commissions",
        sheets: "fiches",
        renewal: "reinscription",
      }}
    >
      <MembersWorkspacePage />
    </LegacyMount>
  );
}
