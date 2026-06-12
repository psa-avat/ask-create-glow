import { createFileRoute } from "@tanstack/react-router";
import { aircraft } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal/availability")({
  head: () => ({ meta: [{ title: "Disponibilités — ERP CLUB" }] }),
  component: AvailabilityPage,
});

function AvailabilityPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Disponibilité de la flotte</h2>
      <div className="rounded-xl border bg-card p-4">
        <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-1 text-[11px]">
          <div></div>
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
            <div key={d} className="py-1 text-center font-medium text-muted-foreground">{d}</div>
          ))}
          {aircraft.map((a) => (
            <div key={a.id} className="contents">
              <div className="flex items-center px-2 font-mono text-xs">{a.id}</div>
              {Array.from({ length: 7 }).map((_, j) => {
                const v = (j * 7 + a.id.charCodeAt(3)) % 10;
                const cls = v < 6 ? "bg-[color:var(--color-success)]/25" : v < 8 ? "bg-[color:var(--color-warning)]/35" : "bg-destructive/30";
                return <div key={j} className={cn("h-10 rounded", cls)} />;
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[color:var(--color-success)]/25" /> Disponible</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[color:var(--color-warning)]/35" /> Réservé</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-destructive/30" /> Indisponible</span>
        </div>
      </div>
    </div>
  );
}
