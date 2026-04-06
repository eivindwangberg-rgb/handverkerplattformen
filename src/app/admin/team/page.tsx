"use client";

import { Plus, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import Topbar from "../../components/admin/Topbar";
import { teamMembers } from "../../components/admin/mockData";

const permissions = [
  { action: "Se dashboard", owner: true, admin: true, member: true },
  { action: "Administrere kunder", owner: true, admin: true, member: true },
  { action: "Administrere salg", owner: true, admin: true, member: true },
  { action: "Konfigurere agenter", owner: true, admin: true, member: false },
  { action: "Administrere abonnementer", owner: true, admin: true, member: false },
  { action: "Server-administrasjon", owner: true, admin: true, member: false },
  { action: "Administrere team", owner: true, admin: false, member: false },
  { action: "Slette kunder", owner: true, admin: false, member: false },
];

export default function TeamPage() {
  return (
    <>
      <Topbar title="Team" />
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Administrer teammedlemmer og tilganger</p>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm text-white font-medium">
            <Plus size={14} /> Inviter medlem
          </button>
        </div>

        {/* Teammedlemmer */}
        <div className="grid grid-cols-1 gap-3">
          {teamMembers.map((m) => (
            <div key={m.id} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-violet-400">{m.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-200 font-medium">{m.name}</div>
                    <div className="text-xs text-gray-500">{m.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Rolle</div>
                    <span className={`text-xs font-medium ${m.role === "owner" ? "text-amber-400" : "text-blue-400"}`}>
                      {m.role === "owner" ? "Eier" : "Admin"}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Tildelte kunder</div>
                    <div className="text-sm text-gray-300">{m.customers}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Sist aktiv</div>
                    <div className="text-sm text-gray-300">{m.active}</div>
                  </div>
                  <MoreHorizontal size={16} className="text-gray-600 hover:text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rettighetsmatrise */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-300 mb-4">Rettigheter</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-3 py-2">Handling</th>
                <th className="text-center text-xs font-medium text-amber-500 uppercase px-3 py-2">Eier</th>
                <th className="text-center text-xs font-medium text-blue-500 uppercase px-3 py-2">Admin</th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase px-3 py-2">Medlem</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {permissions.map((p, i) => (
                <tr key={i} className="border-b border-gray-700/30">
                  <td className="px-3 py-2 text-gray-300">{p.action}</td>
                  <td className="px-3 py-2 text-center">
                    {p.owner ? <CheckCircle size={14} className="inline text-emerald-500" /> : <XCircle size={14} className="inline text-gray-700" />}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {p.admin ? <CheckCircle size={14} className="inline text-emerald-500" /> : <XCircle size={14} className="inline text-gray-700" />}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {p.member ? <CheckCircle size={14} className="inline text-emerald-500" /> : <XCircle size={14} className="inline text-gray-700" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
