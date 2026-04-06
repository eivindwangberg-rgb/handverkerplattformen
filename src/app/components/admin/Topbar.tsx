"use client";

import { Search, Bell } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  return (
    <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 shrink-0 bg-gray-900/50">
      <h1 className="text-lg font-semibold text-gray-100">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Søk..."
            className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-200 placeholder-gray-500 w-48 focus:outline-none focus:border-violet-500"
          />
        </div>
        <button className="relative">
          <Bell size={18} className="text-gray-400 hover:text-gray-200" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </div>
  );
}
