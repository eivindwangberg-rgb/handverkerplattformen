"use client";

import { Server, Globe } from "lucide-react";
import Topbar from "../../components/admin/Topbar";
import { StatusBadge } from "../../components/admin/SharedComponents";
import { servers, customers } from "../../components/admin/mockData";

export default function ServerPage() {
  return (
    <>
      <Topbar title="Server / Ruting" />
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Server- og domeneadministrasjon</p>
        </div>

        {/* Server-kort */}
        <div className="grid grid-cols-3 gap-4">
          {servers.map((s) => (
            <div key={s.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 hover:border-gray-600 cursor-pointer transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Server size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-200 font-medium">{s.name}</span>
                </div>
                <StatusBadge status={s.status} />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">CPU</span><span className="text-gray-400">{s.cpu}%</span></div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.cpu}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">RAM</span><span className="text-gray-400">{s.ram}%</span></div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full"><div className="h-full bg-violet-500 rounded-full" style={{ width: `${s.ram}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Disk</span><span className="text-gray-400">{s.disk}%</span></div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.disk}%` }} /></div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700/50 text-xs text-gray-500">
                {s.sites} nettsider &bull; {s.ip}
              </div>
            </div>
          ))}
        </div>

        {/* Domener */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-300 mb-4">Domener</h3>
          <div className="space-y-2">
            {customers.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/20">
                <div className="flex items-center gap-3">
                  <Globe size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-300">{c.name.toLowerCase().replace(/\s+/g, "-")}.dinplattform.no</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{c.name}</span>
                  <span className="text-xs text-gray-500">htz-prod-01</span>
                  <StatusBadge status={c.status === "active" ? "ok" : c.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
