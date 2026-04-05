# Portalarkitektur — «Min side»

**Håndverkerplattformen**
Versjon 0.1 • April 2026
Status: Planleggingsdokument

---

## 1. Konsept

«Rediger»-knappen i headeren erstattes med «Min side». Denne åpner et sidepanel som glir inn fra høyre. Panelet er kundens portal — ett sted for redigering, meldinger, og etter hvert agentbaserte tjenester.

Nettsiden forblir synlig i bakgrunnen med en overlay, slik at kunden alltid ser konteksten. Dette gjør at redigering føles som en del av nettsiden, ikke et separat system.

---

## 2. Navigasjonsstruktur

### Header-endring

```
FØR:   [Bergen Rør og VVS]  Tjenester  Om oss  Kontakt  [55 12 34 56]  [Rediger]
ETTER: [Bergen Rør og VVS]  Tjenester  Om oss  Kontakt  [55 12 34 56]  [Min side 🔴]
```

Den røde prikken (badge) vises kun når det er uleste meldinger. Klikk åpner sidepanelet.

### Sidepanel — menystruktur

```
┌──────────────────────────────────┐
│  ✕                    Min side   │
│─────────────────────────────────│
│                                  │
│  📝  Rediger nettside            │  ← MVP: det du har i dag
│  💬  Meldinger (2)               │  ← MVP: fra plattformen
│                                  │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Kommer snart:                   │
│  🤖  Chat med rådgiver           │  ← Fase 2: kundedialog-agent
│  📊  SEO-rapport                 │  ← Fase 2: SEO-agent
│  📈  Statistikk                  │  ← Fase 3: analytiker-agent
│                                  │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  ⚙️  Innstillinger               │  ← Kontaktinfo, domene
│  🚪  Logg ut                     │
│                                  │
└──────────────────────────────────┘
```

### Hva hvert menypunkt gjør

**Rediger nettside** — Åpner den eksisterende SiteBuilder-dialogen i `full`-modus. Identisk med dagens «Rediger»-funksjon, bare tilgjengelig fra et nytt sted.

**Meldinger** — Viser en enkel meldingsliste med uleste markert. Erstatter e-post for rutinemeldinger. Meldingstyper fra CRM-spesifikasjonen: `info`, `action_required`, `update`, `tip`. Badge-tallet i menyen viser antall uleste.

**Innstillinger** — Kontaktinfo (telefon, e-post, adresse) som oppdaterer nettsiden automatisk. Senere: domene-tilkobling, faktura.

---

## 3. Flyt og oppførsel

### Åpne portalen

```
Kunde klikker «Min side» i headeren
    │
    ▼
Sidepanel glir inn fra høyre (400px bredde)
Nettsiden dimmes med semi-transparent overlay
    │
    ▼
Panel viser menyen med to aktive valg:
  - Rediger nettside
  - Meldinger (med ulest-badge)
```

### Redigering

```
Kunde klikker «Rediger nettside»
    │
    ▼
SiteBuilder åpnes i full-modus (eksisterende funksjon)
Sidepanelet lukkes automatisk
    │
    ▼
Kunden redigerer og klikker «Oppdater nettside»
Nettsiden oppdateres i sanntid
```

### Meldinger

```
Kunde klikker «Meldinger»
    │
    ▼
Sidepanelet viser meldingsliste:
  ┌──────────────────────────────┐
  │  ← Tilbake         Meldinger│
  │──────────────────────────────│
  │  🔴 Tips: Legg til           │
  │     kundeuttalelser          │
  │     for 3 timer siden        │
  │                              │
  │  ✅ Nettsidens hastighet     │
  │     er forbedret             │
  │     i går                    │
  │                              │
  │  🔴 Vi trenger oppdatert     │
  │     e-postadresse            │
  │     2 dager siden            │
  └──────────────────────────────┘
    │
    ▼
Kunde klikker på en melding
    │
    ▼
Meldingsinnhold vises i panelet
Meldingen markeres som lest (PATCH /api/messages/:id/read)
Badge-tallet oppdateres
```

---

## 4. Teknisk implementering

### Nye komponenter

```
src/app/components/
├── SiteBuilder.tsx           ← Eksisterende (ingen endring)
├── Portal.tsx                ← NY: Sidepanelet med meny
├── PortalMessages.tsx        ← NY: Meldingsliste og meldingsvisning
└── PortalButton.tsx          ← NY: «Min side»-knappen i headeren
```

### Portal.tsx — Sidepanelet

Ansvar: Rendrer sidepanelet, håndterer åpne/lukke-animasjon, viser menyen, og bytter mellom undervisninger (meldinger, innstillinger).

State:
- `isOpen` — om panelet er synlig
- `activeView` — hvilken undervisning som vises (`menu` | `messages` | `message-detail` | `settings`)
- `unreadCount` — antall uleste meldinger (for badge)

### PortalButton.tsx — Header-knappen

Erstatter «Rediger»-knappen. Viser «Min side» med rød badge når det er uleste meldinger.

```tsx
// Konseptuelt:
<button onClick={openPortal}>
  Min side
  {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
</button>
```

### PortalMessages.tsx — Meldingssystemet

MVP-versjon: Meldinger lagres i React state (som resten av appen). Ingen backend ennå. Hardkodede eksempelmeldinger som viser konseptet.

Fase 2: Kobles til CRM API-et (`GET /api/customers/:id/messages`).

### Datastruktur for meldinger (samsvarer med CRM-spesifikasjonen)

```typescript
interface Message {
  id: string;
  subject: string;
  body: string;                                    // Markdown
  type: "info" | "action_required" | "update" | "tip";
  readAt: string | null;                           // ISO timestamp
  createdAt: string;                               // ISO timestamp
}
```

---

## 5. Endringer i eksisterende kode

### page.tsx

Headeren endres fra:

```tsx
<button onClick={() => setBuilderOpen(true)}>Rediger</button>
```

til:

```tsx
<PortalButton unreadCount={unreadCount} onClick={() => setPortalOpen(true)} />
```

`setBuilderOpen(true)` flyttes inn i Portal.tsx og trigges fra «Rediger nettside»-menypunktet.

### SiteBuilder.tsx

Ingen endringer. Den åpnes og lukkes på samme måte som før — bare fra et nytt sted.

---

## 6. Meldingsinnhold for MVP (hardkodet)

For å demonstrere verdien av meldinger uten backend, leveres disse eksempelmeldingene:

```typescript
const demoMessages: Message[] = [
  {
    id: "1",
    subject: "Velkommen til plattformen!",
    body: "Nettsiden din er nå publisert. Her er noen tips for å komme godt i gang:\n\n- **Legg til kundeuttalelser** — nettsider med kundeuttalelser får 40% mer trafikk\n- **Last opp flere bilder** — vis frem arbeidet ditt\n- **Del nettsiden** — send lenken til eksisterende kunder",
    type: "info",
    readAt: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    subject: "Tips: Legg til kundeuttalelser",
    body: "Visste du at nettsider med kundeuttalelser får opptil 40% mer trafikk? Be dine fornøyde kunder om en kort anbefaling — det trenger ikke være mer enn én setning.",
    type: "tip",
    readAt: null,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    subject: "Nettsiden din er optimalisert",
    body: "Vi har forbedret lastetiden på nettsiden din. Den laster nå 35% raskere enn før.",
    type: "update",
    readAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];
```

---

## 7. Utvidelsesplan — fra MVP til full portal

| Fase | Menypunkt | Kobles til | Inntektsmodell |
|------|-----------|------------|----------------|
| MVP | Rediger nettside | Eksisterende SiteBuilder | Gratis |
| MVP | Meldinger | Hardkodede demo-meldinger → CRM API | Gratis (holder kunden aktiv) |
| 2 | Chat med rådgiver | Kundedialog-agenten | Inkludert / begrenset |
| 2 | SEO-rapport | SEO-agenten | Betalt tillegg |
| 2 | Innstillinger | Kontaktinfo, domene | Gratis / domene mot betaling |
| 3 | Statistikk | Analytiker-agenten | Betalt tillegg |
| 3 | Bookingsystem | Ny agent (tredjepartsintegrasjon) | Betalt tillegg |

Hvert nye menypunkt er en naturlig utvidelse — ingen redesign nødvendig. Panelet skalerer ved å legge til menylinjer.

---

## 8. Autentisering (fremtidig)

MVP har ingen innlogging — portalen er tilgjengelig for alle som ser «Min side»-knappen. Dette er greit fordi:
- Nettsiden har ingen sensitiv data i MVP
- Meldingene er hardkodede demo-meldinger
- Redigeringsfunksjonen endrer bare lokal state

Når CRM-integrasjonen er på plass (fase 2), legges autentisering til:
- Kunden logger inn med telefonnummer + engangskode (SMS)
- JWT med `customer`-rolle begrenser tilgang til egne data
- «Min side» viser «Logg inn» for uautentiserte, menyen for innloggede

---

## 9. Design-retningslinjer

- Sidepanelet skal følge fargetemaet kunden valgte — primærfarge i panelheader
- Animasjon: glid inn fra høyre, 300ms ease-out
- Overlay: bakgrunnen dimmes med `bg-black/40`
- Mobilvisning: panelet tar full bredde i stedet for 400px
- Meldinger med `action_required` vises med oransje indikator
- Meldinger med `tip` vises med blå indikator
