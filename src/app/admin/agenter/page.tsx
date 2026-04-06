"use client";

import { Plus, Bot, Settings } from "lucide-react";
import Topbar from "../../components/admin/Topbar";
import { StatusBadge } from "../../components/admin/SharedComponents";
import { agents } from "../../components/admin/mockData";

export default function AgenterPage() {
  return (
    <>
      <Topbar title="Agenter" />
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">AI-agenter som kjører oppgaver automatisk for plattformen</p>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm text-white font-medium">
            <Plus size={14} /> Ny agent
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {agents.map((a) => (
            <div key={a.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 hover:border-gray-600 cursor-pointer transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.status === "active" ? "bg-violet-500/20" : "bg-gray-700/50"}`}>
                    <Bot size={20} className={a.status === "active" ? "text-violet-400" : "text-gray-500"} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-200 font-medium">{a.name}</div>
                    <div className="text-xs text-gray-500">{a.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Siste kjøring</div>
                    <div className="text-sm text-gray-300">{a.lastRun}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">24t kjøringer</div>
                    <div className="text-sm text-gray-300">{a.runs24h}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Feil 24t</div>
                    <div className={`text-sm ${a.errors24h > 0 ? "text-red-400" : "text-gray-300"}`}>{a.errors24h}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Gj.sn. tid</div>
                    <div className="text-sm text-gray-300">{a.avgTime}</div>
                  </div>
                  <StatusBadge status={a.status} />
                  <Settings size={16} className="text-gray-600 hover:text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
