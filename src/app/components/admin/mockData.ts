// Mock-data for CRM Dashboard
// Erstatt med ekte API-kall etter hvert som backend bygges ut

export const revenueData = [
  { month: "Okt", revenue: 12000 },
  { month: "Nov", revenue: 18000 },
  { month: "Des", revenue: 15000 },
  { month: "Jan", revenue: 24000 },
  { month: "Feb", revenue: 31000 },
  { month: "Mar", revenue: 28000 },
];

export const leadsChartData = [
  { uke: "Uke 10", nye: 8, konvertert: 3 },
  { uke: "Uke 11", nye: 12, konvertert: 5 },
  { uke: "Uke 12", nye: 6, konvertert: 4 },
  { uke: "Uke 13", nye: 15, konvertert: 7 },
  { uke: "Uke 14", nye: 10, konvertert: 6 },
];

export type Customer = {
  id: number;
  name: string;
  type: string;
  status: "active" | "onboarding" | "paused" | "churned";
  health: number;
  assigned: string;
  lastActive: string;
  interactions: number;
  area: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  plan: string;
  notes: string;
};

export const customers: Customer[] = [
  { id: 1, name: "Bergen Rør og VVS AS", type: "Rørlegger", status: "active", health: 92, assigned: "Eivind", lastActive: "2 timer siden", interactions: 14, area: "Bergen", contact: "Lars Berge", phone: "55 12 34 56", email: "lars@bergenror.no", address: "Strandgaten 42, 5013 Bergen", plan: "Pro", notes: "Svært fornøyd. Vurderer oppgradering til Enterprise." },
  { id: 2, name: "Tromsø Malerservice", type: "Maler", status: "active", health: 78, assigned: "Eivind", lastActive: "1 dag siden", interactions: 8, area: "Tromsø", contact: "Anne Moen", phone: "77 65 43 21", email: "anne@tromsomal.no", address: "Sjøgata 15, 9008 Tromsø", plan: "Basis", notes: "Ønsker hjelp med SEO." },
  { id: 3, name: "Oslo Snekker & Bygg", type: "Snekker", status: "onboarding", health: 65, assigned: "Martin", lastActive: "3 dager siden", interactions: 3, area: "Oslo", contact: "Per Olsen", phone: "22 11 22 33", email: "per@oslosnekker.no", address: "Karl Johans gate 8, 0154 Oslo", plan: "Pro", notes: "Nettopp startet. Trenger opplæring i bildeopplasting." },
  { id: 4, name: "Drammen Elektro AS", type: "Elektriker", status: "active", health: 45, assigned: "Eivind", lastActive: "12 dager siden", interactions: 6, area: "Drammen", contact: "Kari Holm", phone: "32 44 55 66", email: "kari@drammenelektro.no", address: "Engene 12, 3015 Drammen", plan: "Basis", notes: "Lav aktivitet. Bør følges opp." },
  { id: 5, name: "Stavanger Tak og Fasade", type: "Taktekker", status: "paused", health: 32, assigned: "Martin", lastActive: "28 dager siden", interactions: 2, area: "Stavanger", contact: "Tom Strand", phone: "51 77 88 99", email: "tom@stavangertak.no", address: "Klubbgata 3, 4013 Stavanger", plan: "Basis", notes: "Pauset grunnet sesong. Følg opp i april." },
  { id: 6, name: "Kristiansand Gulv", type: "Gulvlegger", status: "active", health: 88, assigned: "Eivind", lastActive: "5 timer siden", interactions: 11, area: "Kristiansand", contact: "Hilde Lund", phone: "38 22 33 44", email: "hilde@krgulv.no", address: "Markens gate 20, 4611 Kristiansand", plan: "Pro", notes: "Aktiv bruker. Har anbefalt oss til andre." },
  { id: 7, name: "Bodø Mur og Puss", type: "Murer", status: "onboarding", health: 55, assigned: "Martin", lastActive: "6 timer siden", interactions: 1, area: "Bodø", contact: "Geir Nilsen", phone: "75 55 66 77", email: "geir@bodomur.no", address: "Storgata 28, 8006 Bodø", plan: "Basis", notes: "Ny kunde. Første samtale gjennomført." },
];

export type Lead = {
  id: number;
  name: string;
  type: string;
  contact: string;
  stage: "new" | "contacted" | "demo" | "offer" | "won" | "lost";
  value: number;
  days: number;
  area: string;
};

export const leads: Lead[] = [
  { id: 1, name: "Ålesund VVS-Service", type: "Rørlegger", contact: "Ole Hansen", stage: "new", value: 3600, days: 2, area: "Ålesund" },
  { id: 2, name: "Trondheim Malerteam", type: "Maler", contact: "Kari Nilsen", stage: "contacted", value: 3600, days: 5, area: "Trondheim" },
  { id: 3, name: "Haugesund Snekkerverksted", type: "Snekker", contact: "Per Olsen", stage: "demo", value: 5400, days: 3, area: "Haugesund" },
  { id: 4, name: "Fredrikstad Elektro", type: "Elektriker", contact: "Lisa Berg", stage: "offer", value: 3600, days: 1, area: "Fredrikstad" },
  { id: 5, name: "Sandnes Byggservice", type: "Snekker", contact: "Tom Eriksen", stage: "contacted", value: 3600, days: 8, area: "Sandnes" },
  { id: 6, name: "Molde Rør AS", type: "Rørlegger", contact: "Grete Vik", stage: "new", value: 5400, days: 0, area: "Molde" },
  { id: 7, name: "Lillehammer Maler", type: "Maler", contact: "Hans Dahl", stage: "demo", value: 3600, days: 6, area: "Lillehammer" },
  { id: 8, name: "Harstad Tak", type: "Taktekker", contact: "Siv Larsen", stage: "won", value: 3600, days: 0, area: "Harstad" },
];

export type Prospect = {
  id: number;
  name: string;
  type: string;
  contact: string;
  phone: string;
  email: string;
  area: string;
  source: string;
  interest: "high" | "medium" | "low";
  assigned: string;
  createdAt: string;
  lastContact: string;
  followUps: { date: string; note: string }[];
};

export const prospects: Prospect[] = [
  {
    id: 1, name: "Nordfjord Byggmester", type: "Snekker", contact: "Rune Vik", phone: "57 11 22 33", email: "rune@nordfjordbygg.no", area: "Nordfjordeid", source: "Facebook-annonse", interest: "high", assigned: "Eivind", createdAt: "28. mars 2026", lastContact: "2 dager siden",
    followUps: [
      { date: "4. april 2026", note: "Ringte — svært interessert. Har 3 ansatte og trenger nettside raskt. Ønsker demo neste uke." },
      { date: "1. april 2026", note: "Sendte e-post med info om Pro-plan. Fikk svar med spørsmål om bildegalleri." },
      { date: "28. mars 2026", note: "Første kontakt via Facebook. Klikket på annonse og fylte ut skjema." },
    ],
  },
  {
    id: 2, name: "Alta Rørleggerservice", type: "Rørlegger", contact: "Ingrid Solheim", phone: "78 44 55 66", email: "ingrid@altaror.no", area: "Alta", source: "Anbefaling", interest: "medium", assigned: "Martin", createdAt: "25. mars 2026", lastContact: "5 dager siden",
    followUps: [
      { date: "1. april 2026", note: "Tok kontakt per telefon. Litt usikker på pris, ønsker å tenke seg om." },
      { date: "25. mars 2026", note: "Henvist av Bergen Rør og VVS. Sendt velkomstmail." },
    ],
  },
  {
    id: 3, name: "Halden Maler og Tapet", type: "Maler", contact: "Erik Bakke", phone: "69 33 44 55", email: "erik@haldenmaler.no", area: "Halden", source: "Google", interest: "high", assigned: "Eivind", createdAt: "2. april 2026", lastContact: "1 dag siden",
    followUps: [
      { date: "5. april 2026", note: "Gjennomgått demo. Meget positiv, ønsker å starte med Pro-plan. Sender tilbud mandag." },
      { date: "3. april 2026", note: "Booket demo. Interessert i galleri-funksjonen for å vise referanseprosjekter." },
      { date: "2. april 2026", note: "Organisk lead fra Google. Registrerte seg for gratis prøveperiode." },
    ],
  },
  {
    id: 4, name: "Gjøvik Elektro og Varmepumper", type: "Elektriker", contact: "Mona Haugen", phone: "61 22 33 44", email: "mona@gjovikelektro.no", area: "Gjøvik", source: "LinkedIn", interest: "low", assigned: "Martin", createdAt: "20. mars 2026", lastContact: "10 dager siden",
    followUps: [
      { date: "27. mars 2026", note: "Sendt oppfølgingsmail. Ingen respons ennå." },
      { date: "20. mars 2026", note: "Tok kontakt via LinkedIn-melding. Virket nysgjerrig men ikke hastverk." },
    ],
  },
  {
    id: 5, name: "Arendal Murmester", type: "Murer", contact: "Bjørn Aas", phone: "37 55 66 77", email: "bjorn@arendalmur.no", area: "Arendal", source: "Messe", interest: "medium", assigned: "Eivind", createdAt: "30. mars 2026", lastContact: "3 dager siden",
    followUps: [
      { date: "3. april 2026", note: "Fulgte opp etter messen. Ønsker mer info om integrasjon med eksisterende nettside." },
      { date: "30. mars 2026", note: "Møtte oss på håndverkermessen i Arendal. Tok med brosjyre og visittkort." },
    ],
  },
];

export type Agent = {
  id: number;
  name: string;
  type: string;
  status: "active" | "paused" | "error" | "planned";
  lastRun: string;
  runs24h: number;
  errors24h: number;
  avgTime: string;
  description: string;
};

export const agents: Agent[] = [
  { id: 1, name: "Nettside-agent", type: "website", status: "active", lastRun: "3 min siden", runs24h: 47, errors24h: 1, avgTime: "2.3s", description: "Genererer og vedlikeholder nettsider" },
  { id: 2, name: "Kundedialog-agent", type: "dialog", status: "active", lastRun: "12 min siden", runs24h: 23, errors24h: 0, avgTime: "4.1s", description: "Chatter med kunder etter publisering" },
  { id: 3, name: "Oppfølgings-agent", type: "follow_up", status: "active", lastRun: "1 time siden", runs24h: 8, errors24h: 0, avgTime: "1.8s", description: "Sender automatiske påminnelser" },
  { id: 4, name: "Innholdsrevisor", type: "content_review", status: "active", lastRun: "2 timer siden", runs24h: 12, errors24h: 2, avgTime: "5.6s", description: "Kvalitetssjekker generert innhold" },
  { id: 5, name: "SEO-agent", type: "seo", status: "planned", lastRun: "—", runs24h: 0, errors24h: 0, avgTime: "—", description: "Analyserer og optimaliserer SEO" },
];

export type ActivityItem = {
  id: number;
  type: string;
  customer: string;
  desc: string;
  time: string;
  icon: "globe" | "bot" | "trending" | "check" | "alert" | "edit" | "plus" | "zap";
};

export const activities: ActivityItem[] = [
  { id: 1, type: "site_published", customer: "Bergen Rør og VVS AS", desc: "Nettside publisert", time: "10 min siden", icon: "globe" },
  { id: 2, type: "agent_chat", customer: "Tromsø Malerservice", desc: "Kundedialog-agent svarte på henvendelse", time: "25 min siden", icon: "bot" },
  { id: 3, type: "stage_change", customer: "Fredrikstad Elektro", desc: "Lead flyttet til «Tilbud»", time: "1 time siden", icon: "trending" },
  { id: 4, type: "onboarding_step", customer: "Bodø Mur og Puss", desc: "Fullførte steg 3 av onboarding", time: "2 timer siden", icon: "check" },
  { id: 5, type: "follow_up_due", customer: "Drammen Elektro AS", desc: "Oppfølging forfalt — lav helsescore", time: "3 timer siden", icon: "alert" },
  { id: 6, type: "site_edit", customer: "Kristiansand Gulv", desc: "Hero-tekst oppdatert via agent", time: "4 timer siden", icon: "edit" },
  { id: 7, type: "new_lead", customer: "Molde Rør AS", desc: "Ny lead registrert", time: "5 timer siden", icon: "plus" },
  { id: 8, type: "experience_approved", customer: "—", desc: "Erfaringspost godkjent: hero-tekst for rørlegger", time: "6 timer siden", icon: "zap" },
];

export type ServerInfo = {
  id: number;
  name: string;
  ip: string;
  cpu: number;
  ram: number;
  disk: number;
  sites: number;
  status: "ok" | "error";
};

export const servers: ServerInfo[] = [
  { id: 1, name: "htz-prod-01", ip: "95.216.xx.xx", cpu: 34, ram: 62, disk: 45, sites: 12, status: "ok" },
  { id: 2, name: "htz-prod-02", ip: "95.216.xx.xx", cpu: 18, ram: 41, disk: 32, sites: 8, status: "ok" },
  { id: 3, name: "htz-staging", ip: "95.216.xx.xx", cpu: 8, ram: 22, disk: 15, sites: 3, status: "ok" },
];

export type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  active: string;
  customers: number;
};

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Eivind", email: "eivind@handverkerplattformen.no", role: "owner", active: "Nå", customers: 4 },
  { id: 2, name: "Martin", email: "martin@handverkerplattformen.no", role: "admin", active: "2 timer siden", customers: 3 },
];

export const subscriptionData = [
  { plan: "Gratis", count: 3, color: "#6b7280" },
  { plan: "Basis", count: 8, color: "#3b82f6" },
  { plan: "Pro", count: 4, color: "#8b5cf6" },
];

export type FollowUp = {
  id: number;
  customer: string;
  reason: string;
  due: string;
  priority: "high" | "medium" | "low";
};

export const followUps: FollowUp[] = [
  { id: 1, customer: "Drammen Elektro AS", reason: "Lav helsescore (45)", due: "I dag", priority: "high" },
  { id: 2, customer: "Oslo Snekker & Bygg", reason: "Onboarding stoppet opp — steg 3", due: "I dag", priority: "medium" },
  { id: 3, customer: "Stavanger Tak og Fasade", reason: "Ingen aktivitet på 28 dager", due: "I morgen", priority: "medium" },
  { id: 4, customer: "Bodø Mur og Puss", reason: "Onboarding — hjelp med bilder", due: "Ons 9. april", priority: "low" },
];
