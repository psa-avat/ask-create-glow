import { createFileRoute } from "@tanstack/react-router";
import { ViWorkspacePage } from "@/legacy/modules/vi";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/discovery")({
  head: () => ({ meta: [{ title: "Vols d'initiation — ERP CLUB" }] }),
  component: DiscoveryRoute,
});

function DiscoveryRoute() {
  return (
    <LegacyMount
      defaultTab="entitlements"
      hashToTab={{
        types: "types",
        planning: "planning",
        helloasso: "achats",
        import: "import",
        sync: "sync",
      }}
    >
      <ViWorkspacePage />
    </LegacyMount>
  );
}
