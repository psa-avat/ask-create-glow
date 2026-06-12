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
