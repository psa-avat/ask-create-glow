import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

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

function PortalLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="rounded-2xl border bg-gradient-to-br from-primary to-[oklch(0.32_0.07_260)] p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Espace pilote</p>
            <h1 className="mt-1 text-2xl font-semibold">Bonjour, Jean Moreau</h1>
            <p className="mt-1 text-sm text-primary-foreground/70">Licence SPL · Membre depuis 2018 · M-0421</p>
          </div>
          <div className="hidden sm:block rounded-lg bg-white/10 px-4 py-3 text-right backdrop-blur">
            <div className="text-[10px] uppercase tracking-wider text-primary-foreground/70">Solde compte</div>
            <div className="tabular mt-1 text-xl font-semibold">−42,50 €</div>
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
