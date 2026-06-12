import { createFileRoute } from "@tanstack/react-router";
import { UserPlus, Filter } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { members } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/members")({
  head: () => ({ meta: [{ title: "Membres — ERP CLUB" }] }),
  component: MembersPage,
});

const eur = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

function MembersPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Membres"
        description="Vue 360° — logbook, compte, packs, dépenses, documents."
        actions={
          <>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4" />Filtres</Button>
            <Button size="sm"><UserPlus className="h-4 w-4" />Nouveau membre</Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="Rechercher par nom, ID, licence…" className="h-9 max-w-sm" />
        {["Tous", "Pilotes", "Élèves", "Instructeurs", "Inactifs"].map((t, i) => (
          <Badge key={t} variant={i === 0 ? "default" : "outline"} className="cursor-pointer rounded-md px-3 py-1">
            {t}
          </Badge>
        ))}
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Licence</TableHead>
              <TableHead>Dernier vol</TableHead>
              <TableHead className="text-right">Solde</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id} className="cursor-pointer">
                <TableCell className="font-mono text-xs text-muted-foreground">{m.id}</TableCell>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell><Badge variant="outline" className="font-normal">{m.category}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{m.licence}</TableCell>
                <TableCell className="tabular text-muted-foreground">{m.lastFlight}</TableCell>
                <TableCell className={cn("tabular text-right font-medium", m.balance < 0 ? "text-destructive" : m.balance > 0 ? "text-[color:var(--color-success)]" : "text-muted-foreground")}>
                  {eur(m.balance)}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="rounded-sm text-[10px] uppercase">{m.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
