"use client";

import { Globe, Bot, Server, Zap, ExternalLink } from "lucide-react";
import Topbar from "../../components/admin/Topbar";
import { StatCard, StatusBadge, HealthBar } from "../../components/admin/SharedComponents";
import { customers, agents, servers } from "../../components/admin/mockData";

export default function StatusPage() {
  return (
    <>
      <Topbar title="Status" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Nettsider oppe" value="12/12" icon={Globe} />
          <StatCard label="Gj.sn. responstid" value="340ms" change="-15% fra forrige uke" changeType="up" icon={Zap} />
          <StatCard label="Agenter aktive" value="4/5" icon={Bot} />
          <StatCard label="Servere" value="3/3 OK" icon={Server} />
        </div>

        {/* Nettsider */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-300 mb-4">Nettsider</h3>
          <div className="space-y-2">
            {customers.filter((c) => c.status === "active").map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/20">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-gray-200">{c.name.toLowerCase().replace(/\s+/g, "-")}.dinplattform.no</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-gray-500">Respons: 280ms</span>
                  <span className="text-xs text-gray-500">Oppetid: 99.9%</span>
                  <HealthBar score={c.health} />
                  <ExternalLink size={14} className="text-gray-600 hover:text-gray-400 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* AI-agenter */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-300 mb-4">AI-agenter</h3>
            <div className="space-y-3">
              {agents.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/20">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${a.status === "active" ? "bg-emerald-500" : "bg-gray-600"}`} />
                    <div>
                      <div className="text-sm text-gray-200">{a.name}</div>
                      <div className="text-xs text-gray-500">{a.runs24h} kjøringer siste 24t</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {a.errors24h > 0 && <span className="text-xs text-red-400">{a.errors24h} feil</span>}
                    <StatusBadge status={a.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Servere */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Servere</h3>
            <div className="space-y-3">
              {servers.map((s) => (
                <div key={s.id} className="p-3 rounded-lg bg-gray-700/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-200 font-medium">{s.name}</span>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div><span className="text-gray-500">CPU</span><div className="text-gray-300">{s.cpu}%</div></div>
                    <div><span className="text-gray-500">RAM</span><div className="text-gray-300">{s.ram}%</div></div>
                    <div><span className="text-gray-500">Disk</span><div className="text-gray-300">{s.disk}%</div></div>
                    <div><span className="text-gray-500">Sider</span><div className="text-gray-300">{s.sites}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
