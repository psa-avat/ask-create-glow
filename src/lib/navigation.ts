import {
  LayoutDashboard,
  Receipt,
  Ticket,
  Calendar,
  Users,
  ShoppingCart,
  ShoppingBag,
  BookOpen,
  Wallet,
  Wrench,
  Clock,
  Plug,
  Settings,
  Plane,
  FileText,
  Tags,
  TableProperties,
  ArrowLeftRight,
  Database,
  CreditCard,
  Building2,
  BarChart3,
  UserCog,
  ShieldCheck,
  HardDrive,
  type LucideIcon,
} from "lucide-react";

export type NavChild = {
  to: string;
  label: string;
  icon?: LucideIcon;
  capability?: string;
};

export type NavSection = {
  to: string;
  label: string;
  icon: LucideIcon;
  capability?: string;
  children?: NavChild[];
};

/**
 * Navigation ordered by business frequency
 * (mirrors docs/PROMPT_MIGRATION_DESIGN.md from club-erp).
 */
export const navSections: NavSection[] = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard },

  // 1. Facturation des vols
  {
    to: "/flights",
    label: "Facturation des vols",
    icon: Receipt,
    capability: "EDIT_FLIGHTS",
    children: [
      { to: "/flights", label: "Vols", icon: Plane },
      { to: "/flights#billing", label: "Facturation", icon: FileText },
      { to: "/flights#packs", label: "Packs", icon: Tags },
      { to: "/flights#gesasso", label: "Envoi Gesasso", icon: ArrowLeftRight },
      { to: "/flights#osrt", label: "Envoi OSRT", icon: ArrowLeftRight },
      { to: "/flights#fetch", label: "Planche — récupération", icon: Database },
    ],
  },

  // 2. Gestion des VI (HelloAsso)
  {
    to: "/discovery",
    label: "Vols d'initiation",
    icon: Ticket,
    children: [
      { to: "/discovery", label: "Bons VI", icon: Ticket },
      { to: "/discovery#types", label: "Types de VI", icon: TableProperties },
      { to: "/discovery#planning", label: "Planning VI", icon: Calendar },
      { to: "/discovery#helloasso", label: "HelloAsso — achats", icon: ShoppingCart },
      { to: "/discovery#sync", label: "Sync Planche", icon: ArrowLeftRight },
    ],
  },

  // 3. Planning
  { to: "/planning", label: "Planning activité", icon: Calendar },

  // 4. Gestion des membres
  {
    to: "/members",
    label: "Membres & adhésions",
    icon: Users,
    capability: "MANAGE_USERS",
    children: [
      { to: "/members", label: "Annuaire", icon: Users },
      { to: "/members#committees", label: "Commissions", icon: Building2 },
      { to: "/members#sheets", label: "Fiches pilotes", icon: FileText },
      { to: "/members#renewal", label: "Renouvellement", icon: CreditCard },
    ],
  },

  // 5. Portail membres (raccourci — vue détaillée via le switcher de rôle)
  {
    to: "/portal",
    label: "Portail membres",
    icon: BookOpen,
    children: [
      { to: "/portal/logbook", label: "Logbooks", icon: FileText },
      { to: "/portal/account", label: "Balance & dépenses", icon: CreditCard },
      { to: "/portal/packs", label: "Packs", icon: Tags },
    ],
  },

  // 6. Ventes
  {
    to: "/sales",
    label: "Ventes",
    icon: ShoppingCart,
    capability: "VIEW_FINANCIALS",
    children: [
      { to: "/sales", label: "Ventes membres", icon: CreditCard },
      { to: "/sales#invoices", label: "Factures", icon: FileText },
      { to: "/sales#payments", label: "Paiements", icon: CreditCard },
    ],
  },

  // 7. Achats
  {
    to: "/purchases",
    label: "Achats",
    icon: ShoppingBag,
    capability: "VIEW_FINANCIALS",
    children: [
      { to: "/purchases", label: "Factures fournisseurs", icon: FileText },
      { to: "/purchases#suppliers", label: "Fournisseurs", icon: Building2 },
    ],
  },

  // 8. Banque / écritures récurrentes
  {
    to: "/finance",
    label: "Banque",
    icon: Wallet,
    capability: "VIEW_FINANCIALS",
    children: [
      { to: "/finance", label: "Vue d'ensemble", icon: LayoutDashboard },
      { to: "/finance#operations", label: "Opérations", icon: ArrowLeftRight },
      { to: "/recurring-entries", label: "Écritures récurrentes", icon: Repeat },
      { to: "/bank-reconciliation", label: "Rapprochement bancaire", icon: GitCompareArrows },
    ],
  },

  // 9. RH
  {
    to: "/rh",
    label: "Ressources humaines",
    icon: Clock,
    children: [
      { to: "/rh", label: "Planning équipe", icon: Calendar },
      { to: "/rh#leaves", label: "Congés", icon: Calendar },
    ],
  },

  // 10. Comptabilité
  {
    to: "/accounting",
    label: "Comptabilité",
    icon: FileText,
    capability: "VIEW_FINANCIALS",
    children: [
      { to: "/accounting", label: "Journal", icon: FileText },
      { to: "/accounting#fy", label: "Exercices", icon: Calendar },
      { to: "/accounting#pcg", label: "Plan comptable", icon: TableProperties },
    ],
  },

  // 11. Machines
  {
    to: "/assets",
    label: "Machines & disponibilité",
    icon: Wrench,
    capability: "MANAGE_ASSETS",
    children: [
      { to: "/assets", label: "Équipement", icon: Wrench },
      { to: "/assets#types", label: "Types d'appareils", icon: TableProperties },
      { to: "/assets#availability", label: "Disponibilité", icon: Calendar },
    ],
  },

  // 12. Tarifs
  { to: "/pricing", label: "Tarifs", icon: Tags },

  // 13. Bilans
  { to: "/reporting", label: "Bilans & états", icon: BarChart3 },

  // 14. Admin / Configurations
  {
    to: "/administration",
    label: "Administration",
    icon: Settings,
    capability: "MANAGE_USERS",
    children: [
      { to: "/administration", label: "Utilisateurs & rôles", icon: UserCog },
      { to: "/administration#audit", label: "Journal d'audit", icon: ShieldCheck },
      { to: "/administration#helloasso", label: "Config HelloAsso", icon: Plug },
      { to: "/administration#planche", label: "Config Planche", icon: Plug },
      { to: "/administration#storage", label: "Stockage", icon: HardDrive },
      { to: "/integrations", label: "Intégrations", icon: Plug },
    ],
  },
];

export const memberNav: NavSection[] = [
  { to: "/portal", label: "Mon tableau de bord", icon: LayoutDashboard },
  { to: "/portal/logbook", label: "Logbook", icon: FileText },
  { to: "/portal/account", label: "Mon compte", icon: CreditCard },
  { to: "/portal/packs", label: "Mes packs", icon: Tags },
  { to: "/portal/availability", label: "Disponibilités", icon: Plane },
];
