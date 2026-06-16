import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/legacy/modules/admin";
import { LegacyMount } from "@/components/legacy-mount";

export const Route = createFileRoute("/administration")({
  head: () => ({ meta: [{ title: "Administration — ERP CLUB" }] }),
  component: AdministrationRoute,
});

function AdministrationRoute() {
  return (
    <LegacyMount
      defaultTab="users"
      hashToTab={{
        audit: "users",
        roles: "roles",
        capabilities: "capabilities",
      }}
    >
      <AdminPage />
    </LegacyMount>
  );
}
