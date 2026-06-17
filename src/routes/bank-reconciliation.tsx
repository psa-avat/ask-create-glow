import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Lock,
  ArrowLeft,
  Link2,
  X,
  Trash2,
  Plus,
  FileBarChart2,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/bank-reconciliation")({
  head: () => ({ meta: [{ title: "Rapprochement bancaire — ERP CLUB" }] }),
  component: BankReconciliationPage,
});

const BANK_ACCOUNTS = [
  { uuid: "a1", label: "512100 - Crédit Mutuel courant", type: 3 },
  { uuid: "a2", label: "512200 - Crédit Mutuel livret", type: 3 },
  { uuid: "a3", label: "530000 - Caisse", type: 4 },
];
const FISCAL_YEARS = ["2025/2026", "2024/2025"];

type MatchStatus = "auto_matched" | "manually_matched" | "discrepancy" | "unmatched" | "excluded";
type Status = "imported" | "matching" | "reconciled" | "flagged";

type BankLine = {
  id: string;
  date: string;
  description: string;
  amount: number;
  reference?: string;
  match_status: MatchStatus;
  matched_entry?: string;
  confidence?: number;
};
type GlEntry = { id: string; ref: string; date: string; label: string; amount: number; matched?: boolean };

type Statement = {
  uuid: string;
  account: string;
  format: "ofx" | "csv" | "qif" | "mt940";
  filename: string;
  period: string;
  status: Status;
  opening: number;
  closing: number;
  total_lines: number;
  imported_at: string;
};

const mockStatements: Statement[] = [
  { uuid: "s1", account: "512100 - Crédit Mutuel courant", format: "ofx", filename: "releve_juin_2026.ofx", period: "01/06 → 30/06/2026", status: "matching", opening: 3250, closing: 7500, total_lines: 42, imported_at: "2026-07-02" },
  { uuid: "s2", account: "530000 - Caisse", format: "csv", filename: "caisse_mai.csv", period: "01/05 → 31/05/2026", status: "reconciled", opening: 120, closing: 380, total_lines: 8, imported_at: "2026-06-04" },
  { uuid: "s3", account: "512100 - Crédit Mutuel courant", format: "ofx", filename: "releve_mai_2026.ofx", period: "01/05 → 31/05/2026", status: "flagged", opening: 1100, closing: 3250, total_lines: 38, imported_at: "2026-06-02" },
];

const mockLines: BankLine[] = [
  { id: "l1", date: "2026-06-01", description: "Virement reçu - DUPONT cotisation", amount: 1000, reference: "VIR-202606-001", match_status: "auto_matched", matched_entry: "e1", confidence: 1 },
  { id: "l2", date: "2026-06-02", description: "Achat carburant TOTAL LFXX", amount: -185.4, match_status: "auto_matched", matched_entry: "e2", confidence: 0.95 },
  { id: "l3", date: "2026-06-03", description: "Prélèvement EDF facture", amount: -52.3, match_status: "discrepancy", matched_entry: "e3", confidence: 0.55 },
  { id: "l4", date: "2026-06-05", description: "Dépôt espèces", amount: 2000, match_status: "unmatched" },
  { id: "l5", date: "2026-06-08", description: "Virement reçu MARTIN VI", amount: 110, reference: "VIR-202606-014", match_status: "manually_matched", matched_entry: "e4", confidence: 1 },
  { id: "l6", date: "2026-06-12", description: "Frais bancaires juin", amount: -8.5, match_status: "unmatched" },
];

const mockGl: GlEntry[] = [
  { id: "e1", ref: "BQ-202606-001", date: "2026-06-01", label: "Cotisation DUPONT", amount: 1000, matched: true },
  { id: "e2", ref: "BQ-202606-002", date: "2026-06-02", label: "Carburant TOTAL", amount: -185.4, matched: true },
  { id: "e3", ref: "BQ-202606-003", date: "2026-06-04", label: "Facture EDF mai", amount: -54.1 },
  { id: "e4", ref: "BQ-202606-008", date: "2026-06-08", label: "VI MARTIN", amount: 110, matched: true },
  { id: "e5", ref: "BQ-202606-009", date: "2026-06-09", label: "Cotisation BERNARD", amount: 250 },
  { id: "e6", ref: "BQ-202606-011", date: "2026-06-11", label: "Achat fournitures", amount: -42.9 },
];

function fmtEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

function BankReconciliationPage() {
  const [view, setView] = useState<"list" | "workspace" | "import">("list");
  const [active, setActive] = useState<Statement | null>(null);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Rapprochement bancaire"
        description="Import de relevés (OFX, CSV, QIF, MT940), matching automatique et validation manuelle. Périmètre : journaux Banque (type 3) et Caisse (type 4)."
        actions={
          view !== "list" ? (
            <Button variant="outline" onClick={() => { setView("list"); setActive(null); }}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
            </Button>
          ) : (
            <Button onClick={() => setView("import")}>
              <Upload className="mr-2 h-4 w-4" /> Importer un relevé
            </Button>
          )
        }
      />

      {view === "list" && (
        <StatementList
          statements={mockStatements}
          onOpen={(s) => { setActive(s); setView("workspace"); }}
        />
      )}
      {view === "import" && <ImportPanel onDone={() => { setView("list"); toast.success("Relevé importé"); }} />}
      {view === "workspace" && active && <Workspace statement={active} />}
    </div>
  );
}

function StatementList({
  statements,
  onOpen,
}: {
  statements: Statement[];
  onOpen: (s: Statement) => void;
}) {
  const kpis = {
    total: statements.length,
    reconciled: statements.filter((s) => s.status === "reconciled").length,
    flagged: statements.filter((s) => s.status === "flagged").length,
    pending: statements.filter((s) => s.status === "matching" || s.status === "imported").length,
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <KpiTile label="Relevés" value={kpis.total} />
        <KpiTile label="Rapprochés" value={kpis.reconciled} tone="ok" />
        <KpiTile label="En cours" value={kpis.pending} tone="info" />
        <KpiTile label="Avec écarts" value={kpis.flagged} tone="warn" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Relevés bancaires</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fichier</TableHead>
                <TableHead>Compte</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Période</TableHead>
                <TableHead className="text-right">Solde initial</TableHead>
                <TableHead className="text-right">Solde final</TableHead>
                <TableHead>Lignes</TableHead>
                <TableHead>État</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {statements.map((s) => (
                <TableRow key={s.uuid} className="cursor-pointer" onClick={() => onOpen(s)}>
                  <TableCell className="font-medium">{s.filename}</TableCell>
                  <TableCell className="text-xs">{s.account}</TableCell>
                  <TableCell><Badge variant="outline" className="uppercase">{s.format}</Badge></TableCell>
                  <TableCell className="text-xs">{s.period}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{fmtEUR(s.opening)}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{fmtEUR(s.closing)}</TableCell>
                  <TableCell>{s.total_lines}</TableCell>
                  <TableCell><StatusBadge status={s.status} /></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Ouvrir →</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "reconciled") return <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">Rapproché</Badge>;
  if (status === "flagged") return <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300">Écarts</Badge>;
  if (status === "matching") return <Badge className="bg-sky-500/15 text-sky-700 dark:text-sky-300">En cours</Badge>;
  return <Badge variant="outline">Importé</Badge>;
}

function ImportPanel({ onDone }: { onDone: () => void }) {
  const [account, setAccount] = useState(BANK_ACCOUNTS[0].uuid);
  const [fy, setFy] = useState(FISCAL_YEARS[0]);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accountObj = BANK_ACCOUNTS.find((a) => a.uuid === account)!;
  const format = file ? detectFormat(file.name) : null;
  const valid = file && format && accountObj.type >= 3 && accountObj.type <= 4;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Importer un relevé</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Compte (Banque / Caisse uniquement)</Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BANK_ACCOUNTS.map((a) => (
                  <SelectItem key={a.uuid} value={a.uuid}>
                    {a.label}
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({a.type === 3 ? "Banque" : "Caisse"})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Exercice fiscal</Label>
            <Select value={fy} onValueChange={setFy}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {FISCAL_YEARS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-10 text-center transition",
            dragging ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50",
          )}
        >
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="text-sm font-medium">Glissez votre relevé ici ou cliquez pour parcourir</div>
          <div className="text-xs text-muted-foreground">Formats : .ofx .qfx .csv .qif .940 .sta</div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".ofx,.qfx,.csv,.qif,.940,.sta"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {file && (
          <div className="rounded-md border bg-muted/40 p-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{file.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
              <li>Format détecté : <span className="font-mono uppercase">{format ?? "—"}</span> {format && <CheckCircle2 className="ml-1 inline h-3 w-3 text-emerald-600" />}</li>
              <li>Période : 01/06 → 30/06/2026 (estimée)</li>
              <li>Lignes : ~42</li>
              <li>Soldes : 3 250 € → 7 500 €</li>
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setFile(null)}>Annuler</Button>
          <Button disabled={!valid} onClick={onDone}>
            <Upload className="mr-2 h-4 w-4" /> Importer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function detectFormat(name: string): "ofx" | "csv" | "qif" | "mt940" | null {
  const n = name.toLowerCase();
  if (n.endsWith(".ofx") || n.endsWith(".qfx")) return "ofx";
  if (n.endsWith(".csv")) return "csv";
  if (n.endsWith(".qif")) return "qif";
  if (n.endsWith(".940") || n.endsWith(".sta")) return "mt940";
  return null;
}

function Workspace({ statement }: { statement: Statement }) {
  const [lines, setLines] = useState(mockLines);
  const [selected, setSelected] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const counts = useMemo(() => {
    const c = { auto: 0, manual: 0, discrepancy: 0, unmatched: 0 };
    lines.forEach((l) => {
      if (l.match_status === "auto_matched") c.auto++;
      else if (l.match_status === "manually_matched") c.manual++;
      else if (l.match_status === "discrepancy") c.discrepancy++;
      else if (l.match_status === "unmatched") c.unmatched++;
    });
    return c;
  }, [lines]);

  const pct = Math.round(((counts.auto + counts.manual) / lines.length) * 100);
  const unresolved = counts.unmatched + counts.discrepancy;

  const selectedLine = lines.find((l) => l.id === selected);

  function handleManualMatch(entryId: string) {
    if (!selected) return;
    setLines((prev) => prev.map((l) => l.id === selected ? { ...l, match_status: "manually_matched", matched_entry: entryId, confidence: 1 } : l));
    toast.success("Association manuelle créée");
    setSelected(null);
  }
  function handleUnmatch(id: string) {
    setLines((prev) => prev.map((l) => l.id === id ? { ...l, match_status: "unmatched", matched_entry: undefined, confidence: undefined } : l));
  }
  function handleRematch() {
    toast.info("Re-matching automatique lancé…");
  }
  function handleClose() {
    if (unresolved > 0) {
      toast.error(`Impossible de clôturer : ${unresolved} ligne(s) non résolue(s).`);
      return;
    }
    toast.success("Relevé clôturé et rapproché.");
  }

  return (
    <>
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium">{statement.filename}</div>
              <div className="text-xs text-muted-foreground">{statement.account} — {statement.period}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRematch}>
                <RefreshCw className="mr-1 h-4 w-4" /> Re-matching
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowReport(true)}>
                <FileBarChart2 className="mr-1 h-4 w-4" /> Rapport
              </Button>
              <Button size="sm" onClick={handleClose} disabled={unresolved > 0}>
                <Lock className="mr-1 h-4 w-4" /> Clôturer
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Avancement</span>
              <span className="font-mono">{pct}%</span>
            </div>
            <Progress value={pct} />
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Chip color="emerald" icon={<CheckCircle2 className="h-3 w-3" />}>{counts.auto} auto-matchés</Chip>
            <Chip color="sky" icon={<Link2 className="h-3 w-3" />}>{counts.manual} manuels</Chip>
            <Chip color="amber" icon={<AlertTriangle className="h-3 w-3" />}>{counts.discrepancy} à vérifier</Chip>
            <Chip color="rose" icon={<X className="h-3 w-3" />}>{counts.unmatched} sans match</Chip>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Relevé bancaire</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-6" />
                  <TableHead>Date</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((l) => (
                  <TableRow
                    key={l.id}
                    data-state={selected === l.id ? "selected" : undefined}
                    className={cn("cursor-pointer", selected === l.id && "bg-muted/60")}
                    onClick={() => setSelected(l.id)}
                  >
                    <TableCell><MatchDot status={l.match_status} /></TableCell>
                    <TableCell className="text-xs">{l.date}</TableCell>
                    <TableCell className="text-xs">
                      <div className="font-medium">{l.description}</div>
                      {l.matched_entry && (
                        <div className="text-[11px] text-muted-foreground">→ {mockGl.find((g) => g.id === l.matched_entry)?.ref}</div>
                      )}
                    </TableCell>
                    <TableCell className={cn("text-right font-mono text-xs", l.amount < 0 ? "text-rose-600" : "text-emerald-600")}>
                      {fmtEUR(l.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {l.matched_entry && (
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleUnmatch(l.id); }}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              GL — Banque / Caisse
              {selectedLine && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  Suggestions pour {fmtEUR(selectedLine.amount)} du {selectedLine.date}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGl.map((e) => {
                  const closeMatch = selectedLine && Math.abs(e.amount - selectedLine.amount) < 0.01;
                  return (
                    <TableRow key={e.id} className={cn(closeMatch && "bg-primary/5")}>
                      <TableCell className="font-mono text-xs">{e.ref}</TableCell>
                      <TableCell className="text-xs">{e.date}</TableCell>
                      <TableCell className="text-xs">{e.label}</TableCell>
                      <TableCell className={cn("text-right font-mono text-xs", e.amount < 0 ? "text-rose-600" : "text-emerald-600")}>
                        {fmtEUR(e.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {e.matched ? (
                          <Badge variant="outline" className="text-[10px]">déjà liée</Badge>
                        ) : selectedLine ? (
                          <Button size="sm" variant={closeMatch ? "default" : "ghost"} onClick={() => handleManualMatch(e.id)}>
                            <Link2 className="mr-1 h-3 w-3" /> Associer
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {selectedLine && (
              <div className="border-t p-3 text-xs">
                <Button variant="outline" size="sm" onClick={() => toast.success("Écriture corrective créée en Draft")}>
                  <Plus className="mr-1 h-3 w-3" /> Créer une écriture corrective
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {counts.discrepancy + counts.unmatched > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Écarts détectés ({counts.discrepancy + counts.unmatched})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {lines.filter((l) => l.match_status === "unmatched").map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-md border p-2">
                <span><strong>Aucune écriture</strong> — {l.description} <span className="font-mono">{fmtEUR(l.amount)}</span></span>
                <Badge variant="outline">missing_entry</Badge>
              </div>
            ))}
            {lines.filter((l) => l.match_status === "discrepancy").map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-md border p-2">
                <span><strong>Montant différent</strong> — {l.description} (confiance {Math.round((l.confidence ?? 0) * 100)}%)</span>
                <Badge variant="outline">amount_variance</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rapport de rapprochement</DialogTitle>
            <DialogDescription>{statement.filename} — {statement.period}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <Row label="Solde initial" value={fmtEUR(statement.opening)} />
            <Row label="Solde final" value={fmtEUR(statement.closing)} />
            <Row label="Lignes totales" value={String(lines.length)} />
            <Row label="Auto-matchées" value={`${counts.auto}`} />
            <Row label="Manuelles" value={`${counts.manual}`} />
            <Row label="Écarts" value={`${counts.discrepancy}`} />
            <Row label="Sans match" value={`${counts.unmatched}`} />
            <Row label="Avancement" value={`${pct}%`} />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowReport(false)}>Fermer</Button>
            <Button onClick={() => toast.success("Rapport PDF exporté")}>Exporter PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

function MatchDot({ status }: { status: MatchStatus }) {
  const cls =
    status === "auto_matched" ? "bg-emerald-500" :
    status === "manually_matched" ? "bg-sky-500" :
    status === "discrepancy" ? "bg-amber-500" :
    status === "excluded" ? "bg-zinc-400" :
    "bg-rose-500";
  return <span className={cn("inline-block h-2.5 w-2.5 rounded-full", cls)} />;
}

function Chip({ color, icon, children }: { color: "emerald" | "sky" | "amber" | "rose"; icon: React.ReactNode; children: React.ReactNode }) {
  const cls = {
    emerald: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    sky: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    amber: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    rose: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  }[color];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", cls)}>
      {icon}{children}
    </span>
  );
}

function KpiTile({ label, value, tone }: { label: string; value: number; tone?: "ok" | "warn" | "info" }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className={cn("mt-1 text-2xl font-semibold",
            tone === "ok" && "text-emerald-600",
            tone === "warn" && "text-amber-600",
            tone === "info" && "text-sky-600",
          )}>{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
