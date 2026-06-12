import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reporting")({
  head: () => ({ meta: [{ title: "Reporting — ERP CLUB" }] }),
  component: ReportingPage,
});

const reports = [
  "Chiffre d'affaires par membre",
  "Heures de vol par appareil",
  "Bilan packs",
  "Balance comptable",
  "FEC (Fichier des Écritures Comptables)",
  "Statistiques fédérales FFVP",
];

function ReportingPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader title="Reporting" description="Exports et tableaux de bord." />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <div key={r} className="flex items-center justify-between rounded-xl border bg-card p-4">
            <span className="text-sm font-medium">{r}</span>
            <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
