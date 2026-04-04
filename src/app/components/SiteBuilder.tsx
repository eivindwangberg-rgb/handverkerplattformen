"use client";

import { useEffect, useState } from "react";

export interface ColorTemplate {
  name: string;
  from: string;
  to: string;
  accent: string;
  preview: [string, string];
  custom?: boolean;
}

function darken(hex: string, amount: number): string {
  const r = Math.max(0, Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount)));
  const g = Math.max(0, Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount)));
  const b = Math.max(0, Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount)));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function lighten(hex: string, amount: number): string {
  const r = Math.min(255, Math.round(parseInt(hex.slice(1, 3), 16) + (255 - parseInt(hex.slice(1, 3), 16)) * amount));
  const g = Math.min(255, Math.round(parseInt(hex.slice(3, 5), 16) + (255 - parseInt(hex.slice(3, 5), 16)) * amount));
  const b = Math.min(255, Math.round(parseInt(hex.slice(5, 7), 16) + (255 - parseInt(hex.slice(5, 7), 16)) * amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function extractColors(src: string): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 50;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve([]); return; }
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      const buckets = new Map<string, number>();
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a < 128) continue;
        // Skip near-white and near-black
        if (r > 220 && g > 220 && b > 220) continue;
        if (r < 30 && g < 30 && b < 30) continue;
        // Quantize
        const qr = Math.round(r / 32) * 32;
        const qg = Math.round(g / 32) * 32;
        const qb = Math.round(b / 32) * 32;
        const key = `#${qr.toString(16).padStart(2, "0")}${qg.toString(16).padStart(2, "0")}${qb.toString(16).padStart(2, "0")}`;
        buckets.set(key, (buckets.get(key) || 0) + 1);
      }

      const sorted = [...buckets.entries()].sort((a, b) => b[1] - a[1]);
      resolve(sorted.slice(0, 3).map(([c]) => c));
    };
    img.onerror = () => resolve([]);
    img.src = src;
  });
}

export const colorTemplates: ColorTemplate[] = [
  { name: "Hav", from: "from-sky-900", to: "to-sky-700", accent: "sky", preview: ["#0c4a6e", "#0369a1"] },
  { name: "Skog", from: "from-emerald-900", to: "to-emerald-700", accent: "emerald", preview: ["#064e3b", "#047857"] },
  { name: "Skifer", from: "from-slate-900", to: "to-slate-700", accent: "slate", preview: ["#0f172a", "#334155"] },
  { name: "Solnedgang", from: "from-orange-900", to: "to-orange-700", accent: "orange", preview: ["#7c2d12", "#c2410c"] },
  { name: "Natt", from: "from-indigo-900", to: "to-indigo-700", accent: "indigo", preview: ["#312e81", "#4338ca"] },
];

export interface SiteData {
  bedriftsnavn: string;
  type: string;
  sted: string;
  telefon: string;
  tjenester: string;
  beskrivelse: string;
  fargemal: number;
  bilde: string;
  bildeFokus: string;
  adresse: string;
  bildeZoom: number;
  bildeHoyde: number;
  ekstraBilder: string[];
  logo: string;
  customColors?: [string, string];
}

const handverkerTyper = [
  "Rørlegger",
  "Elektriker",
  "Snekker",
  "Maler",
  "Murer",
  "Taktekker",
  "Gulvlegger",
  "Annet",
];

export const FALLBACK_IMAGE = "/alexas_fotos-plumber-2547329_1920.jpg";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20";

function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+\s-]/g, "").replace(/\s/g, "");
}

export default function SiteBuilder({
  open,
  onClose,
  onSubmit,
  initialData,
  mode = "wizard",
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SiteData) => void;
  initialData: SiteData;
  mode?: "wizard" | "full";
}) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SiteData>(initialData);
  const [bildePreview, setBildePreview] = useState<string>(initialData.bilde);
  const [ekstraPreviews, setEkstraPreviews] = useState<string[]>(initialData.ekstraBilder);
  const [logoPreview, setLogoPreview] = useState<string>(initialData.logo);
  const [logoColors, setLogoColors] = useState<ColorTemplate[]>([]);
  const [linkedColors, setLinkedColors] = useState(true);
  const presetTypes = handverkerTyper.slice(0, -1);
  const [annetMode, setAnnetMode] = useState(!presetTypes.includes(initialData.type) && initialData.type !== "");

  // Sync form when popup reopens
  useEffect(() => {
    if (open) {
      setForm(initialData);
      setBildePreview(initialData.bilde);
      setEkstraPreviews(initialData.ekstraBilder);
      setLogoPreview(initialData.logo);
      if (initialData.logo) {
        extractColors(initialData.logo).then(generateLogoTemplates);
      }
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const generateLogoTemplates = (colors: string[]) => {
    const templates: ColorTemplate[] = colors.map((c, i) => ({
      name: `Logo ${i + 1}`,
      from: "",
      to: "",
      accent: "",
      preview: [darken(c, 0.4), c] as [string, string],
      custom: true,
    }));
    setLogoColors(templates);
  };

  const handleBilde = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (bildePreview && bildePreview.startsWith("blob:")) URL.revokeObjectURL(bildePreview);
    const url = URL.createObjectURL(file);
    setBildePreview(url);
    setForm((prev) => ({ ...prev, bilde: url }));
  };

  const handleLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (logoPreview && logoPreview.startsWith("blob:")) URL.revokeObjectURL(logoPreview);
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    setForm((prev) => ({ ...prev, logo: url }));
    const colors = await extractColors(url);
    generateLogoTemplates(colors);
  };

  const handleEkstraBilder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setEkstraPreviews((prev) => [...prev, ...urls]);
    setForm((prev) => ({ ...prev, ekstraBilder: [...prev.ekstraBilder, ...urls] }));
  };

  const fjernEkstraBilde = (index: number) => {
    const removed = ekstraPreviews[index];
    if (removed && removed.startsWith("blob:")) URL.revokeObjectURL(removed);
    setEkstraPreviews((prev) => prev.filter((_, i) => i !== index));
    setForm((prev) => ({ ...prev, ekstraBilder: prev.ekstraBilder.filter((_, i) => i !== index) }));
  };

  const set = (key: keyof SiteData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.bedriftsnavn.trim().length > 0 &&
    form.type.length > 0 &&
    form.sted.trim().length > 0 &&
    form.telefon.trim().length > 0 &&
    form.tjenester.trim().length > 0 &&
    form.beskrivelse.trim().length > 0;

  const handleSubmit = () => {
    setLoading(true);
    onSubmit(form);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
  };

  if (!open) return null;

  // ── Field groups for wizard steps ──
  const fieldBedriftsnavn = (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">Bedriftsnavn</label>
      <input type="text" placeholder="F.eks. Bergen Rør & VVS" value={form.bedriftsnavn} onChange={(e) => set("bedriftsnavn", e.target.value)} className={inputClass} />
    </div>
  );

  const fieldLogo = (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">Logo</label>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-500 transition hover:border-sky-400 hover:text-sky-600">
          Velg logo...
          <input type="file" accept="image/*" onChange={handleLogo} className="hidden" />
        </label>
        {logoPreview && <img src={logoPreview} alt="Logo" className="h-10 w-10 rounded object-contain" />}
      </div>
    </div>
  );

  const fieldSted = (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">Sted</label>
      <input type="text" placeholder="F.eks. Bergen" value={form.sted} onChange={(e) => set("sted", e.target.value)} className={inputClass} />
    </div>
  );

  const fieldAdresse = (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">Adresse</label>
      <input type="text" placeholder="F.eks. Strandgaten 1, 5013 Bergen" value={form.adresse ?? ""} onChange={(e) => set("adresse", e.target.value)} className={inputClass} />
    </div>
  );

  const fieldTelefon = (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">Telefon</label>
      <input type="tel" placeholder="F.eks. 55 00 00 00" value={form.telefon} onChange={(e) => set("telefon", e.target.value)} className={inputClass} />
    </div>
  );

  const isAnnet = form.type !== "" && !presetTypes.includes(form.type);
  const fieldType = (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">Type håndverker</label>
      <div className="grid grid-cols-4 gap-1.5">
        {handverkerTyper.map((t) => (
          <button
            key={t}
            onClick={() => {
              if (t === "Annet") {
                setAnnetMode(true);
                if (!isAnnet) set("type", "");
              } else {
                setAnnetMode(false);
                set("type", t);
              }
            }}
            className={`rounded-md border px-2 py-1.5 text-xs font-medium transition ${
              t === "Annet"
                ? annetMode ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 text-gray-600 hover:border-sky-300"
                : form.type === t && !annetMode ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 text-gray-600 hover:border-sky-300"
            }`}
          >{t}</button>
        ))}
      </div>
      {annetMode && (
        <input
          type="text"
          placeholder="Skriv inn type håndverker..."
          value={presetTypes.includes(form.type) ? "" : form.type}
          onChange={(e) => set("type", e.target.value)}
          className={`mt-2 ${inputClass}`}
          autoFocus
        />
      )}
    </div>
  );

  const fieldTjenester = (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">Tjenester</label>
      <textarea rows={2} placeholder="F.eks. Akutt rørlegger, baderomsrenovering, vedlikehold..." value={form.tjenester} onChange={(e) => set("tjenester", e.target.value)} className={inputClass} />
    </div>
  );

  const fieldBeskrivelse = (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">Kort beskrivelse</label>
      <textarea rows={2} placeholder="Fortell litt om bedriften..." value={form.beskrivelse} onChange={(e) => set("beskrivelse", e.target.value)} className={inputClass} />
    </div>
  );

  const fieldBilde = (
    <div className="md:col-span-2">
      <label className="mb-1 block text-xs font-semibold text-gray-700">Hovedbilde</label>
      <div className="flex items-end gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <label className="cursor-pointer rounded-lg border border-dashed border-gray-300 px-4 py-3 text-center text-sm text-gray-500 transition hover:border-sky-400 hover:text-sky-600">
            Velg bilde...
            <input type="file" accept="image/*" onChange={handleBilde} className="hidden" />
          </label>
          <div className="h-28 w-full overflow-hidden rounded-md">
            <img src={bildePreview || FALLBACK_IMAGE} alt="Forhåndsvisning" className="h-full w-full" style={{ objectFit: "cover", objectPosition: form.bildeFokus, transform: `scale(${form.bildeZoom})` }} />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <label className="mb-1 block text-xs font-semibold text-gray-700">Fokuspunkt</label>
          <div
            className="relative h-28 w-full cursor-crosshair rounded-md border border-gray-300 bg-gray-100"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
              setForm((prev) => ({ ...prev, bildeFokus: `${x}% ${y}%` }));
            }}
            onMouseMove={(e) => {
              if (e.buttons !== 1) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
              const y = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
              setForm((prev) => ({ ...prev, bildeFokus: `${x}% ${y}%` }));
            }}
          >
            <img
              src={bildePreview || FALLBACK_IMAGE}
              alt=""
              className="pointer-events-none h-full w-full rounded-md object-cover opacity-40"
            />
            <div
              className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-sky-500 shadow"
              style={{
                left: form.bildeFokus.split(" ")[0] || "50%",
                top: form.bildeFokus.split(" ")[1] || "50%",
              }}
            />
          </div>
          <p className="mt-1 text-[10px] text-gray-400">{form.bildeFokus}</p>
        </div>
      </div>
    </div>
  );

  const fieldEkstraBilder = (
    <div className="md:col-span-2">
      <label className="mb-1 block text-xs font-semibold text-gray-700">Galleri / flere bilder</label>
      <div className="flex flex-wrap items-center gap-3">
        {ekstraPreviews.map((src, i) => (
          <div key={i} className="group relative h-16 w-24 overflow-hidden rounded-md">
            <img src={src} alt={`Bilde ${i + 1}`} className="h-full w-full object-cover" />
            <button onClick={() => fjernEkstraBilde(i)} className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-[10px] text-white opacity-0 transition group-hover:opacity-100">✕</button>
          </div>
        ))}
        <label className="flex h-16 w-24 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 text-gray-400 transition hover:border-sky-400 hover:text-sky-500">
          <span className="text-xl">+</span>
          <input type="file" accept="image/*" multiple onChange={handleEkstraBilder} className="hidden" />
        </label>
      </div>
    </div>
  );

  const fieldBildejustering = (
    <div className="md:col-span-2 flex gap-6">
      <div className="flex-1">
        <label className="mb-1 block text-xs font-semibold text-gray-700">Zoom ({Math.round(form.bildeZoom * 100)}%)</label>
        <input type="range" min="1" max="2" step="0.05" value={form.bildeZoom} onChange={(e) => setForm((prev) => ({ ...prev, bildeZoom: parseFloat(e.target.value) }))} className="w-full" />
      </div>
      <div className="flex-1">
        <label className="mb-1 block text-xs font-semibold text-gray-700">Høyde ({form.bildeHoyde}px)</label>
        <input type="range" min="220" max="500" step="10" value={form.bildeHoyde} onChange={(e) => setForm((prev) => ({ ...prev, bildeHoyde: parseInt(e.target.value) }))} className="w-full" />
      </div>
    </div>
  );

  const currentColors: [string, string] = form.customColors || (form.fargemal >= 0 ? colorTemplates[form.fargemal].preview : ["#0c4a6e", "#0369a1"]);

  const fieldFargetema = (
    <div className="md:col-span-2">
      <label className="mb-1 block text-xs font-semibold text-gray-700">Farger</label>
      <div className="grid grid-cols-[1fr_auto_1fr_1fr] items-end gap-3">
        <div className="flex flex-col gap-1 pr-2">
          <label className="text-xs font-medium text-gray-500">Primærfarge</label>
          <input
            type="color"
            value={currentColors[0]}
            onChange={(e) => {
              const primary = e.target.value;
              const secondary = linkedColors ? lighten(primary, 0.3) : currentColors[1];
              setForm((prev) => ({ ...prev, customColors: [primary, secondary], fargemal: -1 }));
            }}
            className="h-12 w-full cursor-pointer rounded-lg border border-gray-300"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            const next = !linkedColors;
            setLinkedColors(next);
            if (next) {
              setForm((prev) => ({ ...prev, customColors: [currentColors[0], lighten(currentColors[0], 0.3)], fargemal: -1 }));
            }
          }}
          className={`mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm transition ${linkedColors ? "border-sky-500 bg-sky-50 text-sky-600" : "border-gray-300 text-gray-400 hover:border-gray-400"}`}
          title={linkedColors ? "Koblet: sekundærfarge følger primær" : "Frakoblet: velg fargene uavhengig"}
        >
          {linkedColors ? "🔗" : "🔓"}
        </button>
        <div className="flex flex-col gap-1 pl-2">
          <label className="text-xs font-medium text-gray-500">Sekundærfarge</label>
          <input
            type="color"
            value={currentColors[1]}
            onChange={(e) => {
              const secondary = e.target.value;
              const primary = linkedColors ? darken(secondary, 0.3) : currentColors[0];
              setForm((prev) => ({ ...prev, customColors: [primary, secondary], fargemal: -1 }));
            }}
            className="h-12 w-full cursor-pointer rounded-lg border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Resultat</label>
          <div className="flex h-12 w-full overflow-hidden rounded-lg border border-gray-300">
            <div className="w-1/2" style={{ backgroundColor: currentColors[0] }} />
            <div className="w-1/2" style={{ backgroundColor: currentColors[1] }} />
          </div>
        </div>
      </div>
      {logoColors.length > 0 && (
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-sky-600">Foreslatt fra logo</label>
          <div className="grid grid-cols-[1fr_2.5rem_1fr_1fr] gap-3">
            <button
              onClick={() => logoColors[0] && setForm((prev) => ({ ...prev, customColors: logoColors[0].preview, fargemal: -1 }))}
              className={`flex h-12 mr-2 overflow-hidden rounded-lg border transition ${form.customColors && logoColors[0] && form.customColors[0] === logoColors[0].preview[0] && form.customColors[1] === logoColors[0].preview[1] ? "border-gray-900 ring-2 ring-gray-900/20" : "border-gray-200 hover:border-gray-400"}`}
            >
              <div className="w-1/2" style={{ backgroundColor: logoColors[0].preview[0] }} />
              <div className="w-1/2" style={{ backgroundColor: logoColors[0].preview[1] }} />
            </button>
            <div />
            <button
              onClick={() => logoColors[1] && setForm((prev) => ({ ...prev, customColors: logoColors[1].preview, fargemal: -1 }))}
              className={`flex h-12 ml-2 overflow-hidden rounded-lg border transition ${!logoColors[1] ? "invisible" : form.customColors && form.customColors[0] === logoColors[1].preview[0] && form.customColors[1] === logoColors[1].preview[1] ? "border-gray-900 ring-2 ring-gray-900/20" : "border-gray-200 hover:border-gray-400"}`}
            >
              {logoColors[1] && <>
                <div className="w-1/2" style={{ backgroundColor: logoColors[1].preview[0] }} />
                <div className="w-1/2" style={{ backgroundColor: logoColors[1].preview[1] }} />
              </>}
            </button>
            <button
              onClick={() => logoColors[2] && setForm((prev) => ({ ...prev, customColors: logoColors[2].preview, fargemal: -1 }))}
              className={`flex h-12 overflow-hidden rounded-lg border transition ${!logoColors[2] ? "invisible" : form.customColors && form.customColors[0] === logoColors[2].preview[0] && form.customColors[1] === logoColors[2].preview[1] ? "border-gray-900 ring-2 ring-gray-900/20" : "border-gray-200 hover:border-gray-400"}`}
            >
              {logoColors[2] && <>
                <div className="w-1/2" style={{ backgroundColor: logoColors[2].preview[0] }} />
                <div className="w-1/2" style={{ backgroundColor: logoColors[2].preview[1] }} />
              </>}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ── Wizard steps ──
  const wizardSteps = [
    { title: "Hva heter bedriften din?", content: fieldBedriftsnavn, valid: form.bedriftsnavn.trim().length > 0 },
    { title: "Last opp logo (valgfritt)", content: fieldLogo, valid: true },
    { title: "Hva slags håndverker er du?", content: fieldType, valid: form.type.length > 0 },
    { title: "Hvor holder du til?", content: fieldSted, valid: form.sted.trim().length > 0 },
    { title: "Hva er adressen?", content: fieldAdresse, valid: true },
    { title: "Hva er telefonnummeret ditt?", content: fieldTelefon, valid: form.telefon.trim().length > 0 },
    { title: "Hvilke tjenester tilbyr du?", content: fieldTjenester, valid: form.tjenester.trim().length > 0 },
    { title: "Beskriv bedriften din kort", content: fieldBeskrivelse, valid: form.beskrivelse.trim().length > 0 },
    { title: "Velg hovedbilde", content: fieldBilde, valid: true },
    { title: "Juster bildet", content: fieldBildejustering, valid: true },
    { title: "Flere bilder (valgfritt)", content: fieldEkstraBilder, valid: true },
    { title: "Velg fargetema", content: fieldFargetema, valid: true },
  ];

  const currentStep = wizardSteps[step];
  const isLastStep = step === wizardSteps.length - 1;

  const handleWizardNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  // ── Wizard mode ──
  if (mode === "wizard") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 py-8 backdrop-blur-sm">
        <div className="mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-lg">🤖</div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">AI Nettsidebygger</h2>
                <p className="text-xs text-gray-500">Steg {step + 1} av {wizardSteps.length}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 transition hover:text-gray-600">✕</button>
          </div>

          <div className="mb-2 h-1 w-full rounded-full bg-gray-100">
            <div className="h-1 rounded-full bg-sky-500 transition-all duration-300" style={{ width: `${((step + 1) / wizardSteps.length) * 100}%` }} />
          </div>

          <h3 className="mb-4 mt-6 text-xl font-semibold text-gray-900">{currentStep.title}</h3>
          {currentStep.content}

          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Tilbake</button>
            )}
            <button
              onClick={handleWizardNext}
              disabled={!currentStep.valid || loading}
              className="ml-auto rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Bygger nettsiden..." : isLastStep ? "Generer nettside ✨" : "Neste →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Full mode ──
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 py-8 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-lg">🤖</div>
            <h2 className="text-lg font-bold text-gray-900">AI Nettsidebygger</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 transition hover:text-gray-600">✕</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {fieldBedriftsnavn}
          {fieldLogo}
          {fieldSted}
          {fieldAdresse}
          {fieldTelefon}
          {fieldType}
          {fieldTjenester}
          {fieldBeskrivelse}
          {fieldBilde}
          {fieldBildejustering}
          {fieldEkstraBilder}
          {fieldFargetema}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Bygger nettsiden..." : "Oppdater nettside ✨"}
          </button>
        </div>
      </div>
    </div>
  );
}
