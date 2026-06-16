import { createFileRoute } from "@tanstack/react-router";
import { MachinesWorkspacePage } from "@/legacy/modules/assets";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/assets")({
  head: () => ({ meta: [{ title: "Machines — ERP CLUB" }] }),
  component: AssetsRoute,
});

function AssetsRoute() {
  return (
    <LegacyMount
      defaultTab="equipements"
      hashToTab={{
        types: "types",
        availability: "tarifs",
        pricing: "tarifs",
      }}
    >
      <MachinesWorkspacePage />
    </LegacyMount>
  );
}
