import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Plus,
  Play,
  Eye,
  CalendarClock,
  Repeat,
  CheckCircle2,
  AlertTriangle,
  Pencil,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/recurring-entries")({
  head: () => ({ meta: [{ title: "Écritures récurrentes — ERP CLUB" }] }),
  component: RecurringEntriesPage,
});

type FormulaType = "fixed" | "percentage" | "previous_period" | "rounding_adjustment";

type TemplateLine = {
  id: string;
  account: string;
  debit: number;
  credit: number;
  description: string;
  formula_type: FormulaType;
  formula_params?: { percentage?: number; source_line_index?: number; fallback_amount?: number };
};

type Template = {
  uuid: string;
  code: string;
  name: string;
  journal: string;
  recurrence: "monthly" | "quarterly" | "yearly";
  fiscal_year: string;
  valid_from?: string;
  valid_until?: string;
  cron?: string;
  next_scheduled: string;
  last_generated?: string;
  active: boolean;
  lines: TemplateLine[];
};

const FY_OPTIONS = ["2025/2026", "2024/2025"];
const JOURNAL_OPTIONS = ["OD - Opérations diverses", "VEN - Ventes", "BNQ - Banque"];

const initialTemplates: Template[] = [
  {
    uuid: "1",
    code: "COTIS-MENSUELLE",
    name: "Cotisation mensuelle",
    journal: "OD - Opérations diverses",
    recurrence: "monthly",
    fiscal_year: "2025/2026",
    valid_from: "2025-09-01",
    valid_until: "2026-08-31",
    cron: "0 6 1 * *",
    next_scheduled: "2026-07-01",
    last_generated: "2026-06-01",
    active: true,
    lines: [
      { id: "a", account: "411 - Clients", debit: 100, credit: 0, description: "Cotisation", formula_type: "fixed" },
      { id: "b", account: "756 - Cotisations", debit: 0, credit: 100, description: "Produit", formula_type: "fixed" },
    ],
  },
  {
    uuid: "2",
    code: "AMORT-PLANEUR",
    name: "Amortissement planeurs",
    journal: "OD - Opérations diverses",
    recurrence: "monthly",
    fiscal_year: "2025/2026",
    next_scheduled: "2026-07-15",
    last_generated: "2026-06-15",
    active: true,
    lines: [
      { id: "a", account: "6811 - Dot. amort.", debit: 850, credit: 0, description: "Amortissement", formula_type: "fixed" },
      { id: "b", account: "28154 - Amort. matériel", debit: 0, credit: 850, description: "Cumul", formula_type: "fixed" },
    ],
  },
  {
    uuid: "3",
    code: "TVA",
    name: "Déclaration TVA",
    journal: "OD - Opérations diverses",
    recurrence: "quarterly",
    fiscal_year: "2025/2026",
    next_scheduled: "2026-07-20",
    last_generated: "2026-04-20",
    active: false,
    lines: [
      { id: "a", account: "44571 - TVA collectée", debit: 0, credit: 1240, description: "TVA collectée", formula_type: "previous_period" },
      { id: "b", account: "44566 - TVA déductible", debit: 312, credit: 0, description: "TVA déductible", formula_type: "previous_period" },
      { id: "c", account: "44551 - TVA à décaisser", debit: 928, credit: 0, description: "Solde", formula_type: "rounding_adjustment" },
    ],
  },
];

function fmtEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

function RecurringEntriesPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [editing, setEditing] = useState<Template | null>(null);
  const [previewing, setPreviewing] = useState<Template | null>(null);
  const [generating, setGenerating] = useState<Template | null>(null);

  const kpis = useMemo(() => {
    const due = templates.filter(
      (t) => t.active && new Date(t.next_scheduled) <= new Date("2026-07-01"),
    ).length;
    return {
      total: templates.length,
      active: templates.filter((t) => t.active).length,
      due,
    };
  }, [templates]);

  function handleGenerateAll() {
    toast.success(`${kpis.due} écriture(s) générée(s) en Draft`);
  }

  function handleSave(t: Template) {
    setTemplates((prev) => {
      const exists = prev.find((p) => p.uuid === t.uuid);
      return exists ? prev.map((p) => (p.uuid === t.uuid ? t : p)) : [...prev, t];
    });
    setEditing(null);
    toast.success(`Modèle "${t.code}" enregistré`);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeader
        title="Écritures comptables récurrentes"
        description="Modèles d'écritures générés automatiquement selon une fréquence (mensuel, trimestriel, annuel) ou une expression CRON."
        actions={
          <>
            <Button variant="outline" onClick={handleGenerateAll}>
              <CalendarClock className="mr-2 h-4 w-4" />
              Générer les échéances ({kpis.due})
            </Button>
            <Button
              onClick={() =>
                setEditing({
                  uuid: crypto.randomUUID(),
                  code: "",
                  name: "",
                  journal: JOURNAL_OPTIONS[0],
                  recurrence: "monthly",
                  fiscal_year: FY_OPTIONS[0],
                  next_scheduled: "",
                  active: true,
                  lines: [],
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau modèle
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiTile label="Modèles" value={kpis.total} icon={<Repeat className="h-4 w-4" />} />
        <KpiTile label="Actifs" value={kpis.active} icon={<CheckCircle2 className="h-4 w-4" />} />
        <KpiTile label="À générer" value={kpis.due} icon={<CalendarClock className="h-4 w-4" />} tone={kpis.due > 0 ? "warn" : "ok"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Modèles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Récurrence</TableHead>
                <TableHead>Exercice</TableHead>
                <TableHead>Prochaine échéance</TableHead>
                <TableHead>Dernière génération</TableHead>
                <TableHead>État</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((t) => (
                <TableRow key={t.uuid}>
                  <TableCell className="font-mono text-xs">{t.code}</TableCell>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {t.recurrence === "monthly" ? "Mensuel" : t.recurrence === "quarterly" ? "Trimestriel" : "Annuel"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">{t.fiscal_year}</TableCell>
                  <TableCell className="text-xs">{t.next_scheduled || "—"}</TableCell>
                  <TableCell className="text-xs">{t.last_generated || "—"}</TableCell>
                  <TableCell>
                    {t.active ? (
                      <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300">Actif</Badge>
                    ) : (
                      <Badge variant="outline">Inactif</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setPreviewing(t)}>
                        <Eye className="mr-1 h-4 w-4" />
                        Aperçu
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setGenerating(t)}>
                        <Play className="mr-1 h-4 w-4" />
                        Générer
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditing(t)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {editing && <TemplateEditor template={editing} onSave={handleSave} onClose={() => setEditing(null)} />}
      {previewing && <PreviewDialog template={previewing} onClose={() => setPreviewing(null)} />}
      {generating && (
        <GenerateDialog
          template={generating}
          onConfirm={(date) => {
            toast.success(`Écriture ${generating.code}-${date.replace(/-/g, "").slice(0, 6)} créée en Draft`);
            setGenerating(null);
          }}
          onClose={() => setGenerating(null)}
        />
      )}
    </div>
  );
}

function KpiTile({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone?: "ok" | "warn";
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
        </div>
        <div
          className={
            "rounded-md p-2 " +
            (tone === "warn"
              ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
              : "bg-primary/10 text-primary")
          }
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function TemplateEditor({
  template,
  onSave,
  onClose,
}: {
  template: Template;
  onSave: (t: Template) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Template>(template);

  function updateLine(id: string, patch: Partial<TemplateLine>) {
    setDraft((d) => ({ ...d, lines: d.lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) }));
  }
  function addLine() {
    setDraft((d) => ({
      ...d,
      lines: [
        ...d.lines,
        { id: crypto.randomUUID(), account: "", debit: 0, credit: 0, description: "", formula_type: "fixed" },
      ],
    }));
  }
  function removeLine(id: string) {
    setDraft((d) => ({ ...d, lines: d.lines.filter((l) => l.id !== id) }));
  }

  const totalDebit = draft.lines.reduce((s, l) => s + Number(l.debit || 0), 0);
  const totalCredit = draft.lines.reduce((s, l) => s + Number(l.credit || 0), 0);
  const balanced = totalDebit === totalCredit || draft.lines.some((l) => l.formula_type === "rounding_adjustment");

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{template.code ? `Modifier — ${template.code}` : "Nouveau modèle d'écriture"}</DialogTitle>
          <DialogDescription>
            Définissez le périmètre, la fréquence et les lignes calculées. L'exercice fiscal est obligatoire.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Code">
            <Input value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value })} placeholder="COTIS-MENSUELLE" />
          </Field>
          <Field label="Nom">
            <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </Field>
          <Field label="Journal">
            <Select value={draft.journal} onValueChange={(v) => setDraft({ ...draft, journal: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {JOURNAL_OPTIONS.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Récurrence">
            <Select value={draft.recurrence} onValueChange={(v) => setDraft({ ...draft, recurrence: v as Template["recurrence"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensuel</SelectItem>
                <SelectItem value="quarterly">Trimestriel</SelectItem>
                <SelectItem value="yearly">Annuel</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Exercice fiscal *">
            <Select value={draft.fiscal_year} onValueChange={(v) => setDraft({ ...draft, fiscal_year: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {FY_OPTIONS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Expression CRON" hint="Ex : 0 6 1 * * = 1er du mois à 6h">
            <Input value={draft.cron ?? ""} onChange={(e) => setDraft({ ...draft, cron: e.target.value })} placeholder="0 6 1 * *" />
          </Field>
          <Field label="Valide du">
            <Input type="date" value={draft.valid_from ?? ""} onChange={(e) => setDraft({ ...draft, valid_from: e.target.value })} />
          </Field>
          <Field label="Valide jusqu'au">
            <Input type="date" value={draft.valid_until ?? ""} onChange={(e) => setDraft({ ...draft, valid_until: e.target.value })} />
          </Field>
        </div>

        <div className="rounded-md border bg-muted/40 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Prochaine échéance</span>
            <span className="font-mono">{draft.next_scheduled || "—"}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-muted-foreground">Dernière génération</span>
            <span className="font-mono">{draft.last_generated || "—"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="active" checked={draft.active} onCheckedChange={(v) => setDraft({ ...draft, active: v })} />
          <Label htmlFor="active">Modèle actif</Label>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Lignes</h3>
          <Button variant="outline" size="sm" onClick={addLine}>
            <Plus className="mr-1 h-4 w-4" /> Ajouter une ligne
          </Button>
        </div>

        <div className="space-y-2">
          {draft.lines.map((l) => (
            <div key={l.id} className="rounded-md border p-3">
              <div className="grid grid-cols-12 gap-2">
                <Input className="col-span-4" placeholder="Compte" value={l.account} onChange={(e) => updateLine(l.id, { account: e.target.value })} />
                <Input className="col-span-2" type="number" placeholder="Débit" value={l.debit || ""} onChange={(e) => updateLine(l.id, { debit: Number(e.target.value) })} />
                <Input className="col-span-2" type="number" placeholder="Crédit" value={l.credit || ""} onChange={(e) => updateLine(l.id, { credit: Number(e.target.value) })} />
                <Input className="col-span-3" placeholder="Description" value={l.description} onChange={(e) => updateLine(l.id, { description: e.target.value })} />
                <Button variant="ghost" size="sm" className="col-span-1" onClick={() => removeLine(l.id)}>×</Button>
              </div>
              <div className="mt-2 grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <Select value={l.formula_type} onValueChange={(v) => updateLine(l.id, { formula_type: v as FormulaType })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Montant fixe</SelectItem>
                      <SelectItem value="percentage">Pourcentage</SelectItem>
                      <SelectItem value="previous_period">Période précédente</SelectItem>
                      <SelectItem value="rounding_adjustment">Ajustement d'arrondi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {l.formula_type === "percentage" && (
                  <>
                    <Input className="col-span-2" type="number" placeholder="%" value={l.formula_params?.percentage ?? ""}
                      onChange={(e) => updateLine(l.id, { formula_params: { ...l.formula_params, percentage: Number(e.target.value) } })} />
                    <Input className="col-span-2" type="number" placeholder="Ligne source #"
                      value={l.formula_params?.source_line_index ?? ""}
                      onChange={(e) => updateLine(l.id, { formula_params: { ...l.formula_params, source_line_index: Number(e.target.value) } })} />
                  </>
                )}
                {l.formula_type === "rounding_adjustment" && (
                  <div className="col-span-8 self-center text-xs text-muted-foreground">
                    Le montant est calculé automatiquement pour équilibrer l'écriture.
                  </div>
                )}
              </div>
            </div>
          ))}
          {draft.lines.length === 0 && (
            <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
              Aucune ligne. Cliquez sur « Ajouter une ligne ».
            </div>
          )}
        </div>

        <div className="flex items-center justify-between rounded-md border bg-muted/40 p-3 text-sm">
          <span>Totaux</span>
          <div className="flex items-center gap-6 font-mono">
            <span>D {fmtEUR(totalDebit)}</span>
            <span>C {fmtEUR(totalCredit)}</span>
            {balanced ? (
              <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">Équilibré</Badge>
            ) : (
              <Badge variant="destructive">Écart {fmtEUR(Math.abs(totalDebit - totalCredit))}</Badge>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Annuler</Button>
          <Button onClick={() => onSave(draft)} disabled={!draft.code || !draft.name || !draft.fiscal_year}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PreviewDialog({ template, onClose }: { template: Template; onClose: () => void }) {
  const totalDebit = template.lines.reduce((s, l) => s + l.debit, 0);
  const totalCredit = template.lines.reduce((s, l) => s + l.credit, 0);
  const balanced = totalDebit === totalCredit;
  const ref = `${template.code}-202607`;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Aperçu — {ref}</DialogTitle>
          <DialogDescription>Simulation sans persistance. {template.name} — 07/2026</DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Compte</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Débit</TableHead>
              <TableHead className="text-right">Crédit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {template.lines.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-mono text-xs">{l.account}</TableCell>
                <TableCell className="text-xs">{l.description}</TableCell>
                <TableCell className="text-right font-mono">{l.debit ? fmtEUR(l.debit) : "—"}</TableCell>
                <TableCell className="text-right font-mono">{l.credit ? fmtEUR(l.credit) : "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between rounded-md border bg-muted/40 p-3 text-sm">
          <div className="flex gap-4 font-mono">
            <span>D {fmtEUR(totalDebit)}</span>
            <span>C {fmtEUR(totalCredit)}</span>
          </div>
          {balanced ? (
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Équilibré
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertTriangle className="mr-1 h-3 w-3" /> Déséquilibré
            </Badge>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function GenerateDialog({
  template,
  onConfirm,
  onClose,
}: {
  template: Template;
  onConfirm: (date: string) => void;
  onClose: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(template.next_scheduled || today);
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Générer — {template.code}</DialogTitle>
          <DialogDescription>L'écriture sera créée en Draft et visible dans le journal {template.journal}.</DialogDescription>
        </DialogHeader>
        <Field label="Date cible">
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Annuler</Button>
          <Button onClick={() => onConfirm(date)}>
            <Play className="mr-1 h-4 w-4" /> Générer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}
