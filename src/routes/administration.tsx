import { createFileRoute } from "@tanstack/react-router";
import { Shield, Users, KeyRound, Database } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/administration")({
  head: () => ({ meta: [{ title: "Administration — ERP CLUB" }] }),
  component: AdminPage,
});

const cards = [
  { icon: Users, title: "Utilisateurs & Rôles", desc: "Admin, Comptable, Opérations, Maintenance, Instructeur, Membre" },
  { icon: Shield, title: "Permissions (RBAC)", desc: "Matrice détaillée par module et action" },
  { icon: KeyRound, title: "Sécurité", desc: "Politique PIN, sessions, journal d'audit" },
  { icon: Database, title: "Paramètres club", desc: "Identité, tarifs, exercice comptable, devises" },
];

function AdminPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader title="Administration" description="Configuration du club, utilisateurs et sécurité." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <button key={c.title} className="flex items-start gap-4 rounded-xl border bg-card p-5 text-left transition-colors hover:border-accent/40">
            <div className="rounded-lg bg-secondary p-2.5"><c.icon className="h-5 w-5 text-accent" /></div>
            <div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
