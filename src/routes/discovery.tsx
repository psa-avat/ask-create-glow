import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Plus,
  Download,
  Send,
  Ticket,
  Sparkles,
  Banknote,
  AlertTriangle,
  Search,
  Plane,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  discoveryVouchers,
  discoveryKpis,
  pricingCatalog,
  type VoucherStatus,
} from "@/lib/mock-data";

export const Route = createFileRoute("/discovery")({
  head: () => ({
    meta: [
      { title: "Vols d'initiation — ERP CLUB" },
      { name: "description", content: "Gestion des vols découverte (VI), bons et HelloAsso." },
    ],
  }),
  component: DiscoveryPage,
});

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const statusMeta: Record<VoucherStatus, { label: string; className: string }> = {
  purchased: { label: "Acheté", className: "bg-secondary text-secondary-foreground" },
  sent: { label: "Envoyé planche", className: "bg-accent/15 text-accent" },
  scheduled: { label: "Planifié", className: "bg-[color:var(--color-warning)]/15 text-[color:var(--color-warning)]" },
  flown: { label: "Effectué", className: "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]" },
  expired: { label: "Expiré", className: "bg-destructive/15 text-destructive" },
};

function DiscoveryPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<string>("all");

  const filtered = useMemo(() => {
    return discoveryVouchers.filter((v) => {
      const matchesTab =
        tab === "all" ||
        (tab === "purchased" && v.status === "purchased") ||
        (tab === "sent" && (v.status === "sent" || v.status === "scheduled")) ||
        (tab === "flown" && v.status === "flown") ||
        (tab === "expired" && v.status === "expired");
      const needle = q.trim().toLowerCase();
      const matchesSearch =
        !needle ||
        v.id.toLowerCase().includes(needle) ||
        v.beneficiary.toLowerCase().includes(needle) ||
        v.purchaser.toLowerCase().includes(needle) ||
        v.email.toLowerCase().includes(needle);
      return matchesTab && matchesSearch;
    });
  }, [q, tab]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Vols d'initiation"
        description="Bons VI achetés au guichet ou via HelloAsso, envoyés à la planche puis comptabilisés au vol."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Importer HelloAsso
            </Button>
            <NewVoucherDialog />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Bons ouverts"
          value={String(discoveryKpis.vouchersOpen)}
          hint="Non encore volés"
          icon={Ticket}
          accent="default"
        />
        <KpiCard
          label="Vendus ce mois"
          value={String(discoveryKpis.vouchersMonth)}
          icon={Sparkles}
          accent="success"
          trend={{ value: "18%", positive: true }}
        />
        <KpiCard
          label="CA VI du mois"
          value={eur(discoveryKpis.revenueMonth)}
          icon={Banknote}
        />
        <KpiCard
          label="Bientôt expirés"
          value={String(discoveryKpis.expiringSoon)}
          hint={`${discoveryKpis.helloassoPending} HelloAsso à traiter`}
          icon={AlertTriangle}
          accent="warning"
        />
      </div>

      <div className="rounded-xl border bg-card">
        <div className="flex flex-col gap-3 border-b px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="purchased">À envoyer</TabsTrigger>
              <TabsTrigger value="sent">Sur la planche</TabsTrigger>
              <TabsTrigger value="flown">Effectués</TabsTrigger>
              <TabsTrigger value="expired">Expirés</TabsTrigger>
            </TabsList>
            <TabsContent value={tab} />
          </Tabs>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Bon, bénéficiaire, email…"
              className="h-9 pl-8"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bon</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Bénéficiaire</TableHead>
              <TableHead>Acheté le</TableHead>
              <TableHead>Expire</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-mono text-xs">{v.id}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal capitalize">
                    {v.source === "helloasso" ? "HelloAsso" : "Guichet"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{v.product}</TableCell>
                <TableCell>
                  <div className="font-medium">{v.beneficiary}</div>
                  <div className="text-xs text-muted-foreground">{v.email}</div>
                </TableCell>
                <TableCell className="tabular text-xs text-muted-foreground">{v.purchased}</TableCell>
                <TableCell className="tabular text-xs text-muted-foreground">{v.expires}</TableCell>
                <TableCell>
                  <Badge className={`rounded-md font-normal ${statusMeta[v.status].className}`}>
                    {statusMeta[v.status].label}
                  </Badge>
                  {v.flightId && (
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Plane className="h-3 w-3" /> {v.flightId} · {v.aircraft}
                    </div>
                  )}
                  {v.status !== "flown" && v.scheduledDate && (
                    <div className="mt-1 text-[11px] text-muted-foreground tabular">
                      Prévu {v.scheduledDate}
                    </div>
                  )}
                </TableCell>
                <TableCell className="tabular text-right font-medium">{eur(v.amount)}</TableCell>
                <TableCell className="text-right">
                  {v.status === "purchased" ? (
                    <Button size="sm" variant="outline" className="h-7">
                      <Send className="h-3.5 w-3.5" />
                      Envoyer planche
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="h-7 text-xs">
                      Détails
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-10 text-center text-sm text-muted-foreground">
                  Aucun bon ne correspond.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function NewVoucherDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Nouveau bon VI
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Émettre un bon de vol d'initiation</DialogTitle>
          <DialogDescription>
            Vente directe au guichet. Le bon sera ensuite envoyé à la planche pour planification.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label>Produit</Label>
            <Select defaultValue="VI-20">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {pricingCatalog.discovery.map((p) => (
                  <SelectItem key={p.code} value={p.code}>
                    {p.label} — {eur(p.price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label>Acheteur</Label>
              <Input placeholder="Nom du payeur" />
            </div>
            <div className="grid gap-1.5">
              <Label>Bénéficiaire</Label>
              <Input placeholder="Nom du passager" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="passager@example.com" />
          </div>
          <div className="grid gap-1.5">
            <Label>Mode de paiement</Label>
            <Select defaultValue="cb">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cb">Carte bancaire</SelectItem>
                <SelectItem value="esp">Espèces</SelectItem>
                <SelectItem value="chq">Chèque</SelectItem>
                <SelectItem value="vir">Virement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={() => setOpen(false)}>Émettre le bon</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
