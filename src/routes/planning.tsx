import { createFileRoute } from "@tanstack/react-router";
import { PlanningPage } from "@/legacy/modules/planning";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/planning")({
  head: () => ({ meta: [{ title: "Planning — ERP CLUB" }] }),
  component: PlanningRoute,
});

function PlanningRoute() {
  return (
    <LegacyMount>
      <PlanningPage />
    </LegacyMount>
  );
}
