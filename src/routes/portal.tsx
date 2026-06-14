import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelectedMember } from "@/lib/selected-member-context";

export const Route = createFileRoute("/portal")({
  component: PortalLayout,
});

const tabs = [
  { to: "/portal", label: "Tableau de bord" },
  { to: "/portal/logbook", label: "Logbook" },
  { to: "/portal/account", label: "Mon compte" },
  { to: "/portal/packs", label: "Packs" },
  { to: "/portal/availability", label: "Disponibilités" },
];

const eur = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

function PortalLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { member } = useSelectedMember();
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-muted-foreground">
        <Eye className="h-3.5 w-3.5 text-accent" />
        <span>
          Vue opérateur — agit sur le compte de{" "}
          <span className="font-medium text-foreground">{member.name}</span> ({member.id}). Changez via le sélecteur en haut à droite.
        </span>
      </div>
      <div className="rounded-2xl border bg-gradient-to-br from-primary to-[oklch(0.32_0.07_260)] p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Espace pilote</p>
            <h1 className="mt-1 text-2xl font-semibold">{member.name}</h1>
            <p className="mt-1 text-sm text-primary-foreground/70">Licence {member.licence} · {member.category} · {member.id}</p>
          </div>
          <div className="hidden sm:block rounded-lg bg-white/10 px-4 py-3 text-right backdrop-blur">
            <div className="text-[10px] uppercase tracking-wider text-primary-foreground/70">Solde compte</div>
            <div className={cn("tabular mt-1 text-xl font-semibold", member.balance < 0 && "text-[color:var(--color-warning)]")}>
              {eur(member.balance)}
            </div>
          </div>
        </div>
      </div>
      <nav className="flex flex-wrap gap-1 border-b">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                active ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
}
