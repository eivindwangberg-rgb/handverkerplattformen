"use client";

import { useState } from "react";
import SiteBuilder, { SiteData, colorTemplates, FALLBACK_IMAGE } from "./components/SiteBuilder";
import Portal, { demoMessages } from "./components/Portal";
import PortalButton from "./components/PortalButton";

const emptyData: SiteData = {
  bedriftsnavn: "",
  type: "",
  sted: "",
  telefon: "",
  tjenester: "",
  beskrivelse: "",
  fargemal: -1,
  customColors: ["#0c4a6e", "#0369a1"] as [string, string],
  bilde: "",
  adresse: "",
  bildeFokus: "50% 30%",
  bildeZoom: 1,
  bildeHoyde: 400,
  ekstraBilder: [],
  logo: "",
};

function parseServices(tjenester: string) {
  return tjenester
    .split(/[,\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);
}

export default function Home() {
  const [data, setData] = useState<SiteData>(emptyData);
  const [builderOpen, setBuilderOpen] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (formData: SiteData) => {
    setData(formData);
    setHasSubmitted(true);
  };

  const [portalOpen, setPortalOpen] = useState(false);
  const [messages, setMessages] = useState(demoMessages);
  const unreadCount = messages.filter((m) => !m.readAt).length;

  const [kontaktNavn, setKontaktNavn] = useState("");
  const [kontaktTlf, setKontaktTlf] = useState("");
  const [kontaktMelding, setKontaktMelding] = useState("");
  const [kontaktSendt, setKontaktSendt] = useState(false);

  const services = parseServices(data.tjenester);
  const typeLabel = data.type ? data.type.toLowerCase() : "håndverker";
  const safeTelefon = data.telefon.replace(/[^\d+\s-]/g, "").replace(/\s/g, "");
  const theme = data.fargemal >= 0 ? colorTemplates[data.fargemal] : null;
  const cc = data.customColors;

  // Helpers for gradient styling — supports both Tailwind presets and custom colors
  const gClass = (dir: string) => theme ? `bg-gradient-to-${dir} ${theme.from} ${theme.to}` : "";
  const gStyle = (dir: string) => cc
    ? { background: `linear-gradient(to ${dir === "r" ? "right" : dir === "b" ? "bottom" : "bottom right"}, ${cc[0]}, ${cc[1]})` }
    : undefined;

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      <SiteBuilder
        open={builderOpen}
        onClose={() => setBuilderOpen(false)}
        onSubmit={handleSubmit}
        initialData={data}
        mode={hasSubmitted ? "full" : "wizard"}
      />
      <Portal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        onEditSite={() => setBuilderOpen(true)}
        gradientClass={gClass("br")}
        gradientStyle={gStyle("br")}
        messages={messages}
        onMessagesChange={setMessages}
      />

      {!hasSubmitted && !builderOpen ? (
        <div className={`flex min-h-screen flex-col items-center justify-center ${gClass("b")} px-6 text-center text-white`} style={gStyle("b")}>
          <h1 className="text-3xl font-bold">Velkommen til Nettsidebyggeren</h1>
          <p className="mt-4 text-white/70">Fyll ut informasjon for a generere nettsiden din.</p>
          <button
            onClick={() => setBuilderOpen(true)}
            className="mt-8 rounded-full bg-white px-8 py-3 text-base font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Kom i gang
          </button>
        </div>
      ) : hasSubmitted ? (
        <>
          {/* ── Navbar ── */}
          <header className={`sticky top-0 z-40 ${gClass("r")} shadow-lg`} style={gStyle("r")}>
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <span className="relative flex items-center text-xl font-bold tracking-tight text-white">
                {data.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.logo} alt="Logo" className="mr-3 h-24 w-24 -my-8 object-contain" />
                )}
                {data.bedriftsnavn}
              </span>
              <nav className="flex items-center gap-4">
                <a href="#tjenester" className="hidden text-sm font-medium text-white/80 transition hover:text-white md:block">Tjenester</a>
                <a href="#om" className="hidden text-sm font-medium text-white/80 transition hover:text-white md:block">Om oss</a>
                <a href="#kontakt" className="hidden text-sm font-medium text-white/80 transition hover:text-white md:block">Kontakt</a>
                <a
                  href={safeTelefon ? `tel:+47${safeTelefon}` : "#"}
                  className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                >
                  {data.telefon}
                </a>
                <PortalButton unreadCount={unreadCount} onClick={() => setPortalOpen(true)} />
              </nav>
            </div>
          </header>

          {/* ── Hero ── */}
          <section className="relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ height: `${data.bildeHoyde}px` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.bilde || FALLBACK_IMAGE}
                alt={`${typeLabel} i arbeid`}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: data.bildeFokus,
                  transform: `scale(${data.bildeZoom})`,
                }}
              />
              <div className={`absolute inset-0 ${gClass("r")} opacity-60`} style={gStyle("r")} />
            </div>
            <div
              className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-center"
              style={{ minHeight: `${data.bildeHoyde}px` }}
            >
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                Din {typeLabel} i {data.sted}
              </h1>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#kontakt"
                  className="rounded-lg bg-white px-8 py-3 text-center text-base font-semibold text-gray-900 shadow transition hover:bg-gray-100"
                >
                  Fa et uforpliktende tilbud
                </a>
                <a
                  href={safeTelefon ? `tel:+47${safeTelefon}` : "#"}
                  className="rounded-lg border-2 border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Ring oss na
                </a>
              </div>
            </div>
          </section>

          {/* ── Tjenester ── */}
          {services.length > 0 && (
            <section id="tjenester" className="py-16 md:py-24">
              <div className="mx-auto max-w-6xl px-6">
                <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
                  Vare tjenester
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-gray-500">
                  Vi tilbyr et bredt spekter av tjenester tilpasset dine behov.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-6">
                  {services.map((service, i) => (
                    <div
                      key={service}
                      className={`group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md w-full ${services.length === 1 ? "max-w-sm" : services.length === 2 ? "sm:w-[calc(50%-0.75rem)]" : "sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"}`}
                    >
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${gClass("br")}`} style={gStyle("br")}>
                        <span className="text-lg font-bold text-white">{i + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold">{service}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        Ta kontakt for mer informasjon om {service.toLowerCase()}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Om oss ── */}
          <section id="om" className={`${gClass("br")} py-16 text-white md:py-24`} style={gStyle("br")}>
            <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Om {data.bedriftsnavn}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/80">
                  {data.beskrivelse}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-3xl font-extrabold">24/7</p>
                    <p className="mt-1 text-sm text-white/60">Tilgjengelig</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold">100%</p>
                    <p className="mt-1 text-sm text-white/60">Fornøyde kunder</p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.ekstraBilder[0] || data.bilde || FALLBACK_IMAGE}
                  alt={data.bedriftsnavn}
                  className="h-72 w-full object-cover md:h-96"
                />
              </div>
            </div>
          </section>

          {/* ── Kontakt ── */}
          <section id="kontakt" className="py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kontakt oss</h2>
                    <p className="mt-3 text-gray-500">
                      Ta kontakt for et uforpliktende tilbud eller om du har sporsmal.
                    </p>
                    <div className="mt-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${gClass("br")}`} style={gStyle("br")}>
                          <span className="text-sm text-white">T</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Telefon</p>
                          <a href={safeTelefon ? `tel:+47${safeTelefon}` : "#"} className="font-semibold hover:underline">
                            {data.telefon}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${gClass("br")}`} style={gStyle("br")}>
                          <span className="text-sm text-white">S</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Sted</p>
                          <p className="font-semibold">{data.sted}</p>
                          {data.adresse && <p className="text-sm text-gray-500">{data.adresse}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setKontaktSendt(true); }}>
                    <input
                      type="text"
                      placeholder="Ditt navn"
                      value={kontaktNavn}
                      onChange={(e) => setKontaktNavn(e.target.value)}
                      required
                      className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <input
                      type="tel"
                      placeholder="Telefonnummer"
                      value={kontaktTlf}
                      onChange={(e) => setKontaktTlf(e.target.value)}
                      required
                      className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <textarea
                      rows={4}
                      placeholder="Beskriv hva du trenger hjelp med..."
                      value={kontaktMelding}
                      onChange={(e) => setKontaktMelding(e.target.value)}
                      required
                      className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    {kontaktSendt ? (
                      <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">Takk! Vi tar kontakt snart.</p>
                    ) : (
                      <button type="submit" className={`rounded-lg ${gClass("r")} px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90`} style={gStyle("r")}>
                        Send henvendelse
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer className={`${gClass("r")} py-8 text-white`} style={gStyle("r")}>
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
              <span className="flex items-center gap-2 text-sm font-bold">
                {data.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.logo} alt="Logo" className="h-24 w-24 object-contain" />
                )}
                {data.bedriftsnavn}
              </span>
              <p className="text-xs text-white/50">
                &copy; {new Date().getFullYear()} {data.bedriftsnavn}. Alle rettigheter reservert.
              </p>
              <a
                href={safeTelefon ? `tel:+47${safeTelefon}` : "#"}
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                {data.telefon}
              </a>
            </div>
          </footer>
        </>
      ) : null}
    </div>
  );
}
