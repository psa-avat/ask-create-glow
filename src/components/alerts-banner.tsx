import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

const alerts = [
  {
    id: "fy-closing",
    severity: "warning" as const,
    message: "L'exercice 2025 sera clos dans 12 jours — pensez à valider les écritures en attente.",
  },
];

export function AlertsBanner() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = alerts.filter((a) => !dismissed.includes(a.id));
  if (visible.length === 0) return null;
  return (
    <div className="mb-4 flex flex-col gap-2">
      {visible.map((a) => (
        <div
          key={a.id}
          className="flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-foreground"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
          <p className="flex-1 leading-relaxed">{a.message}</p>
          <button
            type="button"
            onClick={() => setDismissed((d) => [...d, a.id])}
            className="rounded p-0.5 text-muted-foreground transition-colors hover:bg-warning/20 hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
