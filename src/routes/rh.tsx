import { createFileRoute } from "@tanstack/react-router";
import { Clock, CalendarDays, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/rh")({
  head: () => ({ meta: [{ title: "Ressources humaines — ERP CLUB" }] }),
  component: RhPage,
});

const cards = [
  { icon: CalendarDays, title: "Planning instructeurs", desc: "Disponibilités, rotations, congés." },
  { icon: Clock, title: "Suivi du temps", desc: "Heures de présence et permanences." },
  { icon: Users, title: "Équipe", desc: "Annuaire interne et contrats." },
];

function RhPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader title="Ressources humaines" description="Planning équipe, congés et présences." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <button
            key={c.title}
            className="flex items-start gap-4 rounded-xl border bg-card p-5 text-left transition-colors hover:border-accent/40"
          >
            <div className="rounded-lg bg-secondary p-2.5">
              <c.icon className="h-5 w-5 text-accent" />
            </div>
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
