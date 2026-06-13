import {
  LayoutDashboard,
  Receipt,
  Ticket,
  Calendar,
  Users,
  ShoppingCart,
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

  {
    to: "/flights",
    label: "Facturation & Vols",
    icon: Receipt,
    capability: "EDIT_FLIGHTS",
    children: [
      { to: "/flights", label: "Vols", icon: Plane },
      { to: "/flights#billing", label: "Facturation des vols", icon: FileText },
      { to: "/flights#packs", label: "Packs", icon: Tags },
      { to: "/flights#fetch", label: "Planche — récupération", icon: Database },
    ],
  },

  {
    to: "/discovery",
    label: "Vols d'initiation & HelloAsso",
    icon: Ticket,
    children: [
      { to: "/discovery", label: "Bons VI", icon: Ticket },
      { to: "/discovery#types", label: "Types de VI", icon: TableProperties },
      { to: "/discovery#planning", label: "Planning VI", icon: Calendar },
      { to: "/discovery#helloasso", label: "Achats HelloAsso", icon: ShoppingCart },
      { to: "/discovery#sync", label: "Sync Planche", icon: ArrowLeftRight },
    ],
  },

  { to: "/planning", label: "Planning", icon: Calendar },

  {
    to: "/members",
    label: "Membres",
    icon: Users,
    capability: "MANAGE_USERS",
    children: [
      { to: "/members", label: "Annuaire", icon: Users },
      { to: "/members#committees", label: "Commissions", icon: Building2 },
      { to: "/members#sheets", label: "Fiches pilotes", icon: FileText },
      { to: "/members#renewal", label: "Renouvellement", icon: CreditCard },
    ],
  },

  {
    to: "/sales",
    label: "Ventes & Achats",
    icon: ShoppingCart,
    capability: "VIEW_FINANCIALS",
    children: [
      { to: "/sales", label: "Ventes membres", icon: CreditCard },
      { to: "/sales#suppliers", label: "Factures fournisseurs", icon: FileText },
    ],
  },

  {
    to: "/finance",
    label: "Banque & Comptabilité",
    icon: Wallet,
    capability: "VIEW_FINANCIALS",
    children: [
      { to: "/finance", label: "Vue d'ensemble", icon: LayoutDashboard },
      { to: "/finance#operations", label: "Opérations", icon: ArrowLeftRight },
      { to: "/finance#journal", label: "Journal", icon: FileText },
      { to: "/finance#fy", label: "Exercices", icon: Calendar },
      { to: "/finance#pcg", label: "Plan comptable", icon: TableProperties },
      { to: "/finance#reports", label: "Bilans", icon: BarChart3 },
      { to: "/finance#reconciliation", label: "Rapprochement", icon: ArrowLeftRight },
    ],
  },

  {
    to: "/assets",
    label: "Machines & Tarifs",
    icon: Wrench,
    capability: "MANAGE_ASSETS",
    children: [
      { to: "/assets", label: "Équipement", icon: Wrench },
      { to: "/assets#types", label: "Types d'appareils", icon: TableProperties },
      { to: "/pricing", label: "Tarifs", icon: Tags },
    ],
  },

  { to: "/rh", label: "Ressources humaines", icon: Clock },

  {
    to: "/integrations",
    label: "Intégrations",
    icon: Plug,
    children: [
      { to: "/integrations#members", label: "Push membres Planche", icon: Users },
      { to: "/integrations#machines", label: "Push machines Planche", icon: Wrench },
      { to: "/integrations#gesasso", label: "Sync Gesasso", icon: Plug },
      { to: "/integrations#osrt", label: "Sync OSRT", icon: Plug },
    ],
  },

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
