// Mock data for ERP CLUB UI prototype

export type Role = "operations" | "member";

export const currentUser = {
  name: "Jean Moreau",
  email: "jean.moreau@aeroclub.fr",
  initials: "JM",
  memberId: "M-0421",
};

export const kpis = {
  pendingRevenue: 12_487.5,
  unbilledFlights: 38,
  flightsToday: 24,
  availableAircraft: 7,
  totalAircraft: 9,
  activeMembers: 184,
  monthRevenue: 48_910.2,
  monthExpenses: 21_340.0,
};

export const unbilledFlights = [
  { id: "F-10821", date: "2026-06-11", pilot: "Claire Dupont", aircraft: "F-CABC", duration: "01:24", type: "Solo", amount: 84.0 },
  { id: "F-10822", date: "2026-06-11", pilot: "Marc Lefevre", aircraft: "F-CDEF", duration: "00:48", type: "Instruction", amount: 96.5 },
  { id: "F-10823", date: "2026-06-11", pilot: "Sophie Martin", aircraft: "F-CGHI", duration: "02:15", type: "Solo", amount: 135.0 },
  { id: "F-10824", date: "2026-06-11", pilot: "Antoine Roy", aircraft: "F-CABC", duration: "01:02", type: "Découverte", amount: 110.0 },
  { id: "F-10825", date: "2026-06-10", pilot: "Léa Bernard", aircraft: "F-CJKL", duration: "00:36", type: "Treuillée", amount: 28.0 },
  { id: "F-10826", date: "2026-06-10", pilot: "Hugo Petit", aircraft: "F-CDEF", duration: "03:11", type: "Solo", amount: 191.0 },
  { id: "F-10827", date: "2026-06-10", pilot: "Camille Roux", aircraft: "F-CGHI", duration: "01:45", type: "Instruction", amount: 175.0 },
];

export const members = [
  { id: "M-0421", name: "Jean Moreau", category: "Pilote", balance: -42.5, status: "active", licence: "SPL", lastFlight: "2026-06-09" },
  { id: "M-0387", name: "Claire Dupont", category: "Pilote", balance: 215.0, status: "active", licence: "SPL", lastFlight: "2026-06-11" },
  { id: "M-0512", name: "Marc Lefevre", category: "Instructeur", balance: 0, status: "active", licence: "FI(S)", lastFlight: "2026-06-11" },
  { id: "M-0298", name: "Sophie Martin", category: "Pilote", balance: 78.2, status: "active", licence: "SPL", lastFlight: "2026-06-11" },
  { id: "M-0601", name: "Antoine Roy", category: "Élève", balance: -120.0, status: "active", licence: "—", lastFlight: "2026-06-11" },
  { id: "M-0455", name: "Léa Bernard", category: "Pilote", balance: 340.0, status: "active", licence: "SPL", lastFlight: "2026-06-10" },
  { id: "M-0701", name: "Hugo Petit", category: "Élève", balance: -55.0, status: "active", licence: "—", lastFlight: "2026-06-10" },
];

export const aircraft = [
  { id: "F-CABC", model: "ASK 21", type: "Biplace", status: "available", hours: 4280, nextCheck: "2026-09-12" },
  { id: "F-CDEF", model: "LS4", type: "Monoplace", status: "available", hours: 3120, nextCheck: "2026-08-01" },
  { id: "F-CGHI", model: "Duo Discus", type: "Biplace", status: "reserved", hours: 1890, nextCheck: "2026-12-04" },
  { id: "F-CJKL", model: "Pégase", type: "Monoplace", status: "unavailable", hours: 5640, nextCheck: "2026-06-20" },
  { id: "F-CMNO", model: "Janus C", type: "Biplace", status: "available", hours: 6210, nextCheck: "2026-10-15" },
];

export const events = [
  { id: 1, date: "2026-06-13", title: "Stage perfectionnement", type: "Stage" },
  { id: 2, date: "2026-06-15", title: "Assemblée mensuelle", type: "Réunion" },
  { id: 3, date: "2026-06-20", title: "Visite annuelle F-CJKL", type: "Maintenance" },
  { id: 4, date: "2026-06-22", title: "Compétition régionale", type: "Compétition" },
];

export const journalEntries = [
  { id: "J-2026-0421", date: "2026-06-11", label: "Facturation vols 11/06", debit: 1280.5, credit: 1280.5, journal: "VTE" },
  { id: "J-2026-0420", date: "2026-06-10", label: "Encaissement adhésion M-0298", debit: 240.0, credit: 240.0, journal: "BNK" },
  { id: "J-2026-0419", date: "2026-06-10", label: "Achat carburant", debit: 845.0, credit: 845.0, journal: "ACH" },
  { id: "J-2026-0418", date: "2026-06-09", label: "Pack heures M-0421", debit: 600.0, credit: 600.0, journal: "VTE" },
];

export const memberFlights = [
  { id: "F-10812", date: "2026-06-09", aircraft: "F-CABC", duration: "01:34", type: "Solo", amount: 94.0, status: "billed" },
  { id: "F-10799", date: "2026-06-05", aircraft: "F-CDEF", duration: "02:48", type: "Solo", amount: 168.0, status: "billed" },
  { id: "F-10788", date: "2026-06-02", aircraft: "F-CABC", duration: "00:52", type: "Instruction", amount: 104.0, status: "billed" },
  { id: "F-10770", date: "2026-05-29", aircraft: "F-CGHI", duration: "03:12", type: "Solo", amount: 192.0, status: "billed" },
];

export const memberPacks = [
  { id: "P-201", name: "Pack 10h solo", purchased: "2026-04-12", consumed: 6.4, total: 10, value: 600 },
  { id: "P-198", name: "Pack instruction 5h", purchased: "2026-02-03", consumed: 5, total: 5, value: 500 },
];

export type VoucherStatus = "purchased" | "sent" | "scheduled" | "flown" | "expired";
export type VoucherSource = "direct" | "helloasso";

export interface DiscoveryVoucher {
  id: string;
  source: VoucherSource;
  product: string;
  purchaser: string;
  beneficiary: string;
  email: string;
  amount: number;
  purchased: string;
  expires: string;
  status: VoucherStatus;
  scheduledDate?: string;
  flightId?: string;
  pilot?: string;
  aircraft?: string;
}

export const discoveryVouchers: DiscoveryVoucher[] = [
  { id: "VI-2026-0042", source: "helloasso", product: "Vol découverte 20 min", purchaser: "Marie Lambert", beneficiary: "Paul Lambert", email: "marie.l@example.com", amount: 95, purchased: "2026-06-08", expires: "2027-06-08", status: "sent", scheduledDate: "2026-06-15" },
  { id: "VI-2026-0041", source: "helloasso", product: "Vol découverte 30 min", purchaser: "Eric Faure", beneficiary: "Eric Faure", email: "eric.f@example.com", amount: 135, purchased: "2026-06-07", expires: "2027-06-07", status: "purchased" },
  { id: "VI-2026-0040", source: "direct", product: "Vol baptême biplace", purchaser: "Club — guichet", beneficiary: "Julie Renard", email: "julie.r@example.com", amount: 110, purchased: "2026-06-06", expires: "2027-06-06", status: "flown", scheduledDate: "2026-06-11", flightId: "F-10824", pilot: "Antoine Roy", aircraft: "F-CABC" },
  { id: "VI-2026-0039", source: "helloasso", product: "Vol découverte 20 min", purchaser: "Karim Benali", beneficiary: "Sofia Benali", email: "karim.b@example.com", amount: 95, purchased: "2026-06-05", expires: "2027-06-05", status: "scheduled", scheduledDate: "2026-06-14" },
  { id: "VI-2026-0038", source: "direct", product: "Vol découverte 30 min", purchaser: "Laurent Vidal", beneficiary: "Laurent Vidal", email: "l.vidal@example.com", amount: 135, purchased: "2026-05-30", expires: "2027-05-30", status: "purchased" },
  { id: "VI-2025-0237", source: "helloasso", product: "Vol baptême biplace", purchaser: "Anna Schmitt", beneficiary: "Théo Schmitt", email: "anna.s@example.com", amount: 110, purchased: "2025-06-02", expires: "2026-06-02", status: "expired" },
];

export const discoveryKpis = {
  vouchersOpen: 12,
  vouchersMonth: 8,
  revenueMonth: 1020,
  helloassoPending: 3,
  expiringSoon: 2,
};

export const pricingCatalog = {
  flights: [
    { code: "SOL-ASK21", label: "ASK 21 — Solo", unit: "min de vol", price: 1.0, vat: 20 },
    { code: "INS-ASK21", label: "ASK 21 — Instruction", unit: "min de vol", price: 2.05, vat: 20 },
    { code: "SOL-LS4", label: "LS4 — Solo", unit: "min de vol", price: 1.0, vat: 20 },
    { code: "SOL-DUO", label: "Duo Discus — Solo", unit: "min de vol", price: 1.2, vat: 20 },
    { code: "TREU", label: "Treuillée", unit: "treuillée", price: 14.0, vat: 20 },
    { code: "REMORQ-500", label: "Remorquage 500 m", unit: "remorquage", price: 32.0, vat: 20 },
  ],
  memberships: [
    { code: "ADH-PIL", label: "Adhésion pilote", unit: "an", price: 240, vat: 0 },
    { code: "ADH-ELV", label: "Adhésion élève", unit: "an", price: 180, vat: 0 },
    { code: "ADH-JEU", label: "Adhésion jeune (-25)", unit: "an", price: 120, vat: 0 },
    { code: "ADH-EXT", label: "Adhésion externe", unit: "an", price: 60, vat: 0 },
  ],
  packs: [
    { code: "PCK-10S", label: "Pack 10h solo", unit: "pack", price: 600, vat: 20 },
    { code: "PCK-5I", label: "Pack 5h instruction", unit: "pack", price: 500, vat: 20 },
    { code: "PCK-20S", label: "Pack 20h solo", unit: "pack", price: 1150, vat: 20 },
  ],
  discovery: [
    { code: "VI-20", label: "Vol découverte 20 min", unit: "vol", price: 95, vat: 20 },
    { code: "VI-30", label: "Vol découverte 30 min", unit: "vol", price: 135, vat: 20 },
    { code: "VI-BAP", label: "Vol baptême biplace", unit: "vol", price: 110, vat: 20 },
  ],
};
