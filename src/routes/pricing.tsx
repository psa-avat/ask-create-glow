import { createFileRoute } from "@tanstack/react-router";
import { Plus, Tag, Upload, History } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pricingCatalog } from "@/lib/mock-data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Tarifs — ERP CLUB" },
      { name: "description", content: "Catalogue de prix : vols, adhésions, packs, VI." },
    ],
  }),
  component: PricingPage,
});

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(n);

type Row = { code: string; label: string; unit: string; price: number; vat: number };

function PriceTable({ rows }: { rows: Row[] }) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Code</TableHead>
            <TableHead>Libellé</TableHead>
            <TableHead>Unité</TableHead>
            <TableHead className="text-right">Prix HT</TableHead>
            <TableHead className="text-right">TVA</TableHead>
            <TableHead className="text-right">Prix TTC</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => {
            const ht = r.vat === 0 ? r.price : r.price / (1 + r.vat / 100);
            const ttc = r.vat === 0 ? r.price : r.price;
            return (
              <TableRow key={r.code}>
                <TableCell className="font-mono text-xs">{r.code}</TableCell>
                <TableCell className="font-medium">{r.label}</TableCell>
                <TableCell className="text-xs text-muted-foreground">/ {r.unit}</TableCell>
                <TableCell className="tabular text-right">{eur(ht)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="font-mono text-[10px]">{r.vat}%</Badge>
                </TableCell>
                <TableCell className="tabular text-right font-semibold">{eur(ttc)}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" className="h-7 text-xs">Éditer</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Tarifs"
        description="Grille tarifaire applicable aux vols, adhésions, packs et VI. Les modifications créent une nouvelle version datée."
        actions={
          <>
            <Button variant="outline" size="sm">
              <History className="h-4 w-4" />
              Historique
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4" />
              Importer CSV
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Nouveau tarif
            </Button>
          </>
        }
      />

      <div className="flex items-center gap-3 rounded-xl border border-dashed bg-card/50 p-4 text-sm">
        <Tag className="h-4 w-4 text-accent" />
        <span className="text-muted-foreground">
          Grille en vigueur depuis le <span className="font-medium text-foreground">01/01/2026</span>. Prochaine révision prévue le 01/09/2026.
        </span>
      </div>

      <Tabs defaultValue="flights">
        <TabsList>
          <TabsTrigger value="flights">Vols</TabsTrigger>
          <TabsTrigger value="memberships">Adhésions</TabsTrigger>
          <TabsTrigger value="packs">Packs</TabsTrigger>
          <TabsTrigger value="discovery">Vols d'initiation</TabsTrigger>
        </TabsList>
        <TabsContent value="flights" className="mt-4">
          <PriceTable rows={pricingCatalog.flights} />
        </TabsContent>
        <TabsContent value="memberships" className="mt-4">
          <PriceTable rows={pricingCatalog.memberships} />
        </TabsContent>
        <TabsContent value="packs" className="mt-4">
          <PriceTable rows={pricingCatalog.packs} />
        </TabsContent>
        <TabsContent value="discovery" className="mt-4">
          <PriceTable rows={pricingCatalog.discovery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
