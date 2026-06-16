import { createFileRoute } from "@tanstack/react-router";
import { RhWorkspacePage } from "@/legacy/modules/rh";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/rh")({
  head: () => ({ meta: [{ title: "Ressources humaines — ERP CLUB" }] }),
  component: RhRoute,
});

function RhRoute() {
  return (
    <LegacyMount
      defaultTab="conges"
      hashToTab={{
        leaves: "conges",
        attendance: "presences",
        team: "equipe",
      }}
    >
      <RhWorkspacePage />
    </LegacyMount>
  );
}
