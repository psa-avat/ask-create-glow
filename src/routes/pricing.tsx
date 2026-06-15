import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/legacy/modules/pricing/components/PricingPage";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Tarifs — ERP CLUB" }] }),
  component: PricingRoute,
});

function PricingRoute() {
  return (
    <LegacyMount>
      <PricingPage />
    </LegacyMount>
  );
}
