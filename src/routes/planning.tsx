import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/mock-data";

export const Route = createFileRoute("/planning")({
  head: () => ({ meta: [{ title: "Planning — ERP CLUB" }] }),
  component: PlanningPage,
});

function PlanningPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Planning"
        description="Calendrier des événements — informatif uniquement."
        actions={<Button size="sm"><CalendarPlus className="h-4 w-4" />Nouvel événement</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-card p-5">
          <h3 className="text-sm font-semibold">Juin 2026</h3>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
            {["L", "M", "M", "J", "V", "S", "D"].map((d) => (
              <div key={d} className="py-2 font-medium text-muted-foreground">{d}</div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const hasEvent = [13, 15, 20, 22].includes(day);
              return (
                <div key={i} className={`flex h-16 flex-col items-start rounded-md border p-1 text-left ${hasEvent ? "border-accent/40 bg-accent/5" : ""}`}>
                  <span className="tabular text-[11px] text-muted-foreground">{day}</span>
                  {hasEvent && <span className="mt-auto h-1 w-full rounded-full bg-accent" />}
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-xl border bg-card">
          <div className="border-b px-5 py-3 text-sm font-semibold">Événements à venir</div>
          <ul className="divide-y">
            {events.map((e) => (
              <li key={e.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <div className="text-sm font-medium">{e.title}</div>
                  <div className="tabular text-xs text-muted-foreground">{e.date}</div>
                </div>
                <Badge variant="outline" className="rounded-md text-[10px]">{e.type}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
