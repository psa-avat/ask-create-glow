import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { memberFlights } from "@/lib/mock-data";

export const Route = createFileRoute("/portal/logbook")({
  head: () => ({ meta: [{ title: "Logbook — ERP CLUB" }] }),
  component: LogbookPage,
});

const eur = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

function LogbookPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Carnet de vol</h2>
        <Button variant="outline" size="sm"><Download className="h-4 w-4" />Exporter PDF</Button>
      </div>
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vol</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Appareil</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Durée</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberFlights.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-mono text-xs">{f.id}</TableCell>
                <TableCell className="tabular">{f.date}</TableCell>
                <TableCell className="font-mono text-xs">{f.aircraft}</TableCell>
                <TableCell><Badge variant="outline" className="font-normal">{f.type}</Badge></TableCell>
                <TableCell className="tabular text-right">{f.duration}</TableCell>
                <TableCell className="tabular text-right">{eur(f.amount)}</TableCell>
                <TableCell className="text-right"><Badge className="rounded-sm bg-[color:var(--color-success)] text-[color:var(--color-success-foreground)]">Facturé</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
