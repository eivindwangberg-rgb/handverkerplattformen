"use client";

import { Search, Filter } from "lucide-react";
import Topbar from "../../components/admin/Topbar";
import { ActivityIcon } from "../../components/admin/SharedComponents";
import { activities } from "../../components/admin/mockData";

export default function AktivitetPage() {
  return (
    <>
      <Topbar title="Aktivitet" />
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              placeholder="Søk i aktiviteter..."
              className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 w-72 focus:outline-none focus:border-violet-500"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-400 hover:text-gray-200">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <div className="space-y-1">
            {activities.map((a, i) => (
              <div key={a.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-700/20 cursor-pointer">
                <div className="flex flex-col items-center">
                  <ActivityIcon type={a.icon} />
                  {i < activities.length - 1 && <div className="w-px h-8 bg-gray-700/50 mt-1" />}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="text-sm text-gray-200">{a.desc}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.customer} &bull; {a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
