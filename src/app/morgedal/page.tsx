"use client";

import { useState } from "react";
import { Hammer, TreePine, Flower2, Wrench, Phone, MapPin } from "lucide-react";
import ChatWidget from "../components/ChatWidget";

// ── Color theme: Skog (emerald) ──
const PRIMARY = "#064e3b";
const SECONDARY = "#047857";

function gStyle(dir: string): React.CSSProperties {
  return {
    background: `linear-gradient(to ${
      dir === "r" ? "right" : dir === "b" ? "bottom" : "bottom right"
    }, ${PRIMARY}, ${SECONDARY})`,
  };
}

// ── Client data ──
const CLIENT = {
  bedriftsnavn: "Morgedal Drift og Vedlikehald",
  kortnavn: "Morgedal Drift",
  sted: "Morgedal, Telemark",
  telefon: "XXX XX XXX", // TODO: kundens nummer
  telefonRaw: "",
  adresse: "Morgedal",
  hero: "Bygg, hage og restaurering — lokalt i Morgedal",
  beskrivelse:
    "Vi tar oss av hus og hage i Morgedal og omegn. Fra nytt tilbygg til hageanlegg, fra tømmereparasjon til restaurering av eldre bygninger. Lokalt håndverk med respekt for materialene.",
};

const SERVICES = [
  {
    icon: Hammer,
    tittel: "Snekkeri",
    beskrivelse:
      "Nybygg, tilbygg og innvendig rehabilitering. Skreddersøm for ditt prosjekt — ikke standardløsninger.",
  },
  {
    icon: TreePine,
    tittel: "Tømring",
    beskrivelse:
      "Tradisjonell tømmerkonstruksjon og laft. Vi bygger og reparerer med respekt for håndverket.",
  },
  {
    icon: Flower2,
    tittel: "Anleggsgartner",
    beskrivelse:
      "Terrasser, støttemurer, beplantning og drenering. Utendørsområdet ditt i trygge hender.",
  },
  {
    icon: Wrench,
    tittel: "Restaurering",
    beskrivelse:
      "Bevaring av eldre bygninger med original materialbruk og respekt for stilarten.",
  },
];

const TRUST = [
  { label: "Lokalt forankret", value: "Morgedal og omegn" },
  { label: "Bred kompetanse", value: "Fire fagfelt, én kontaktperson" },
];

export default function MorgedalPage() {
  const [kontaktNavn, setKontaktNavn] = useState("");
  const [kontaktTlf, setKontaktTlf] = useState("");
  const [kontaktMelding, setKontaktMelding] = useState("");
  const [kontaktSendt, setKontaktSendt] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40 shadow-lg" style={gStyle("r")}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight text-white">
            {CLIENT.bedriftsnavn}
          </span>
          <nav className="flex items-center gap-4">
            <a
              href="#tjenester"
              className="hidden text-sm font-medium text-white/80 transition hover:text-white md:block"
            >
              Tjenester
            </a>
            <a
              href="#om"
              className="hidden text-sm font-medium text-white/80 transition hover:text-white md:block"
            >
              Om oss
            </a>
            <a
              href="#kontakt"
              className="hidden text-sm font-medium text-white/80 transition hover:text-white md:block"
            >
              Kontakt
            </a>
            {CLIENT.telefonRaw && (
              <a
                href={`tel:+47${CLIENT.telefonRaw}`}
                className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                {CLIENT.telefon}
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={gStyle("br")}>
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center md:py-32">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/60">
            {CLIENT.sted}
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            {CLIENT.hero}
          </h1>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#kontakt"
              className="rounded-lg bg-white px-8 py-3 text-center text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100"
            >
              F&aring; et uforpliktende tilbud
            </a>
            {CLIENT.telefonRaw && (
              <a
                href={`tel:+47${CLIENT.telefonRaw}`}
                className="rounded-lg border-2 border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white/10"
              >
                Ring oss n&aring;
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Tjenester ── */}
      <section id="tjenester" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
            Hva vi kan hjelpe deg med
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-500">
            Fra fundament til ferdig. Fra hage til restaurering. Vi dekker hele
            spekteret.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.tittel}
                  className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                    style={gStyle("br")}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">{service.tittel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {service.beskrivelse}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Om oss ── */}
      <section id="om" className="py-16 text-white md:py-24" style={gStyle("br")}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Om {CLIENT.kortnavn}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                {CLIENT.beskrivelse}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {TRUST.map((t) => (
                  <div key={t.label}>
                    <p className="text-sm font-medium text-white/60">
                      {t.label}
                    </p>
                    <p className="mt-1 text-base font-bold">{t.value}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Placeholder — swap in client photos */}
            <div className="mt-8 overflow-hidden rounded-2xl md:mt-0">
              <div className="flex h-72 items-center justify-center bg-white/10 md:h-96">
                <div className="text-center text-white/40">
                  <TreePine className="mx-auto h-12 w-12" />
                  <p className="mt-3 text-sm">Bilde av prosjekt / om oss</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kontakt ── */}
      <section id="kontakt" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Kontakt oss
                </h2>
                <p className="mt-3 text-gray-500">
                  Ta kontakt for et uforpliktende tilbud — eller bare en prat om
                  prosjektet ditt.
                </p>
                <div className="mt-8 space-y-4">
                  {CLIENT.telefonRaw && (
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={gStyle("br")}
                      >
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Telefon</p>
                        <a
                          href={`tel:+47${CLIENT.telefonRaw}`}
                          className="font-semibold hover:underline"
                        >
                          {CLIENT.telefon}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={gStyle("br")}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Sted</p>
                      <p className="font-semibold">{CLIENT.sted}</p>
                    </div>
                  </div>
                </div>
              </div>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setKontaktSendt(true);
                  setKontaktNavn("");
                  setKontaktTlf("");
                  setKontaktMelding("");
                }}
              >
                <input
                  type="text"
                  placeholder="Ditt navn"
                  value={kontaktNavn}
                  onChange={(e) => setKontaktNavn(e.target.value)}
                  required
                  className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <input
                  type="tel"
                  placeholder="Telefonnummer"
                  value={kontaktTlf}
                  onChange={(e) => setKontaktTlf(e.target.value)}
                  required
                  className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <textarea
                  rows={4}
                  placeholder="Beskriv hva du trenger hjelp med..."
                  value={kontaktMelding}
                  onChange={(e) => setKontaktMelding(e.target.value)}
                  required
                  className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                {kontaktSendt ? (
                  <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    Takk! Vi tar kontakt snart.
                  </p>
                ) : (
                  <button
                    type="submit"
                    className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    style={gStyle("r")}
                  >
                    Send henvendelse
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chat ── */}
      <ChatWidget
        bedriftsnavn={CLIENT.kortnavn}
        gradientClass=""
        gradientStyle={gStyle("br")}
      />

      {/* ── Footer ── */}
      <footer className="py-8 text-white" style={gStyle("r")}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <span className="text-sm font-bold">{CLIENT.bedriftsnavn}</span>
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {CLIENT.bedriftsnavn}. Alle
            rettigheter reservert.
          </p>
          {CLIENT.telefonRaw && (
            <a
              href={`tel:+47${CLIENT.telefonRaw}`}
              className="text-sm font-medium text-white/80 hover:text-white"
            >
              {CLIENT.telefon}
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
