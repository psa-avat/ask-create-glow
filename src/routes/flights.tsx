import { createFileRoute } from "@tanstack/react-router";
import { FlightsWorkspacePage } from "@/legacy/modules/flights";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/flights")({
  head: () => ({ meta: [{ title: "Facturation & Vols — ERP CLUB" }] }),
  component: FlightsRoute,
});

function FlightsRoute() {
  return (
    <LegacyMount
      defaultTab="vols"
      hashToTab={{
        billing: "vols",
        packs: "packs",
        gesasso: "gesasso",
        osrt: "osrt",
        fetch: "sync",
      }}
    >
      <FlightsWorkspacePage />
    </LegacyMount>
  );
}
