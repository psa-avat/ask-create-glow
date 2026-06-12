import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/portal/account")({
  head: () => ({ meta: [{ title: "Mon compte — ERP CLUB" }] }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-xl border bg-card p-6">
        <h3 className="text-sm font-semibold">Relevé de compte</h3>
        <p className="mt-1 text-xs text-muted-foreground">Mouvements des 90 derniers jours</p>
        <ul className="mt-4 divide-y text-sm">
          {[
            { d: "2026-06-09", l: "Vol F-10812 · F-CABC", a: -94 },
            { d: "2026-06-05", l: "Vol F-10799 · F-CDEF", a: -168 },
            { d: "2026-06-02", l: "Paiement carte", a: 300 },
            { d: "2026-05-29", l: "Vol F-10770 · F-CGHI", a: -192 },
            { d: "2026-05-15", l: "Adhésion annuelle 2026", a: -240 },
          ].map((m, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium">{m.l}</div>
                <div className="tabular text-xs text-muted-foreground">{m.d}</div>
              </div>
              <div className={`tabular font-medium ${m.a < 0 ? "text-destructive" : "text-[color:var(--color-success)]"}`}>
                {m.a > 0 ? "+" : ""}{m.a.toFixed(2)} €
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <h3 className="text-sm font-semibold">Solde actuel</h3>
        <div className="tabular mt-2 text-3xl font-semibold text-destructive">−42,50 €</div>
        <p className="mt-1 text-xs text-muted-foreground">Dernière mise à jour : aujourd'hui</p>
        <Button className="mt-4 w-full"><CreditCard className="h-4 w-4" />Approvisionner</Button>
      </div>
    </div>
  );
}
