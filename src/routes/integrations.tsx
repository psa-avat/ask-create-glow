import { createFileRoute } from "@tanstack/react-router";
import { PlancheIntegrationPage } from "@/legacy/modules/planche";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/integrations")({
  head: () => ({ meta: [{ title: "Intégrations — ERP CLUB" }] }),
  component: IntegrationsRoute,
});

function IntegrationsRoute() {
  return (
    <LegacyMount>
      <PlancheIntegrationPage />
    </LegacyMount>
  );
}
