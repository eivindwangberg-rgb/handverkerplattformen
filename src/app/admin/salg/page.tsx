"use client";

import { useState } from "react";
import { Plus, Search, Filter, Phone, Mail, MapPin, User, X, MessageSquare, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Topbar from "../../components/admin/Topbar";
import { leads, leadsChartData, prospects, type Prospect } from "../../components/admin/mockData";

const stages = [
  { key: "new", label: "Ny lead", color: "border-gray-600" },
  { key: "contacted", label: "Kontaktet", color: "border-blue-600" },
  { key: "demo", label: "Demo", color: "border-purple-600" },
  { key: "offer", label: "Tilbud", color: "border-amber-600" },
  { key: "won", label: "Lukket", color: "border-emerald-600" },
] as const;

const interestColor: Record<Prospect["interest"], string> = {
  high: "bg-emerald-500/20 text-emerald-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  low: "bg-gray-500/20 text-gray-400",
};

const interestLabel: Record<Prospect["interest"], string> = {
  high: "Høy",
  medium: "Middels",
  low: "Lav",
};

type Tab = "pipeline" | "prospekter";

function ProspectCard({ prospect, onClose }: { prospect: Prospect; onClose: () => void }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center text-sm font-bold text-violet-300">
            {prospect.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">{prospect.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400">{prospect.type}</span>
              <span className="text-gray-600">·</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${interestColor[prospect.interest]}`}>
                {interestLabel[prospect.interest]} interesse
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-xs text-gray-500">{prospect.source}</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-700/50 transition">
          <X size={16} />
        </button>
      </div>

      {/* Kontaktinfo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-700/30">
        <div className="bg-gray-800/50 px-5 py-3 flex items-center gap-3">
          <User size={14} className="text-gray-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Kontaktperson</p>
            <p className="text-sm text-gray-200">{prospect.contact}</p>
          </div>
        </div>
        <div className="bg-gray-800/50 px-5 py-3 flex items-center gap-3">
          <Phone size={14} className="text-gray-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Telefon</p>
            <a href={`tel:${prospect.phone.replace(/\s/g, "")}`} className="text-sm text-violet-400 hover:text-violet-300">{prospect.phone}</a>
          </div>
        </div>
        <div className="bg-gray-800/50 px-5 py-3 flex items-center gap-3">
          <Mail size={14} className="text-gray-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">E-post</p>
            <a href={`mailto:${prospect.email}`} className="text-sm text-violet-400 hover:text-violet-300 truncate block">{prospect.email}</a>
          </div>
        </div>
        <div className="bg-gray-800/50 px-5 py-3 flex items-center gap-3">
          <MapPin size={14} className="text-gray-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Område</p>
            <p className="text-sm text-gray-200">{prospect.area}</p>
          </div>
        </div>
      </div>

      {/* Oppfølgingslogg */}
      <div className="px-5 py-4 border-t border-gray-700/30">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={14} className="text-gray-500" />
          <p className="text-[10px] uppercase tracking-wider text-gray-500">Oppfølgingslogg ({prospect.followUps.length})</p>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
          {prospect.followUps.map((entry, i) => (
            <div key={i} className="relative pl-4 border-l-2 border-gray-700/50">
              <p className="text-[11px] font-medium text-violet-400">{entry.date}</p>
              <p className="text-sm text-gray-300 mt-0.5 leading-relaxed">{entry.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="px-5 py-3 border-t border-gray-700/30 flex items-center gap-4 text-xs text-gray-500">
        <span>Tildelt: <span className="text-gray-300">{prospect.assigned}</span></span>
        <span>Opprettet: <span className="text-gray-300">{prospect.createdAt}</span></span>
        <span>Siste kontakt: <span className="text-gray-300">{prospect.lastContact}</span></span>
      </div>
    </div>
  );
}

export default function SalgPage() {
  const [tab, setTab] = useState<Tab>("pipeline");
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  return (
    <>
      <Topbar title="Salg" />
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Faner */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-800/50 border border-gray-700/50 rounded-lg p-0.5">
            <button
              onClick={() => setTab("pipeline")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                tab === "pipeline" ? "bg-violet-600 text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => { setTab("prospekter"); setSelectedProspect(null); }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                tab === "prospekter" ? "bg-violet-600 text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Prospekter
              <span className="ml-1.5 text-xs opacity-70">{prospects.length}</span>
            </button>
          </div>

          {tab === "pipeline" && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Pipeline-verdi:</span>
                <span className="text-sm font-semibold text-white">54 000 kr/mnd</span>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm text-white font-medium">
                <Plus size={14} /> Ny lead
              </button>
            </div>
          )}

          {tab === "prospekter" && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  placeholder="Søk prospekter..."
                  className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 w-64 focus:outline-none focus:border-violet-500"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-400 hover:text-gray-200">
                <Filter size={14} /> Filter
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm text-white font-medium">
                <Plus size={14} /> Nytt prospekt
              </button>
            </div>
          )}
        </div>

        {/* Pipeline-fane */}
        {tab === "pipeline" && (
          <>
            <div className="grid grid-cols-5 gap-3">
              {stages.map((stage) => (
                <div key={stage.key} className="space-y-2">
                  <div className={`border-t-2 ${stage.color} pt-3 pb-1 px-1`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stage.label}</span>
                      <span className="text-xs text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">
                        {leads.filter((l) => l.stage === stage.key).length}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {leads.filter((l) => l.stage === stage.key).map((lead) => (
                      <div key={lead.id} className="bg-gray-800/70 border border-gray-700/50 rounded-lg p-3 hover:border-gray-600 cursor-pointer transition-colors">
                        <div className="text-sm text-gray-200 font-medium mb-1">{lead.name}</div>
                        <div className="text-xs text-gray-500 mb-2">{lead.type} &bull; {lead.area}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{lead.contact}</span>
                          <span className="text-xs text-violet-400 font-medium">{lead.value.toLocaleString()} kr/mnd</span>
                        </div>
                        {lead.days > 0 && (
                          <div className={`text-xs mt-2 ${lead.days > 7 ? "text-red-400" : "text-gray-600"}`}>
                            {lead.days} dager i fasen
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Leads siste 5 uker</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={leadsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="uke" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, color: "#e5e7eb" }} />
                  <Line type="monotone" dataKey="nye" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Nye leads" />
                  <Line type="monotone" dataKey="konvertert" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Konvertert" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Prospekter-fane */}
        {tab === "prospekter" && (
          <>
            {selectedProspect && (
              <ProspectCard prospect={selectedProspect} onClose={() => setSelectedProspect(null)} />
            )}

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Firma</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Fagtype</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Kontakt</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Interesse</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Kilde</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Tildelt</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Siste kontakt</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Notater</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {prospects.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProspect(selectedProspect?.id === p.id ? null : p)}
                      className={`border-b border-gray-700/30 cursor-pointer transition ${
                        selectedProspect?.id === p.id
                          ? "bg-violet-600/10 hover:bg-violet-600/15"
                          : "hover:bg-gray-700/20"
                      }`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-200 font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{p.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{p.contact}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${interestColor[p.interest]}`}>
                          {interestLabel[p.interest]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{p.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{p.assigned}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{p.lastContact}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">
                          {p.followUps.length}
                        </span>
                      </td>
                      <td className="px-4 py-3"><ChevronRight size={16} className="text-gray-600" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
