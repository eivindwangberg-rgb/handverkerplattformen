"use client";

import { useState } from "react";
import { Search, Filter, Plus, ChevronRight, Phone, Mail, MapPin, FileText, User, X } from "lucide-react";
import Topbar from "../../components/admin/Topbar";
import { StatusBadge, HealthBar } from "../../components/admin/SharedComponents";
import { customers, type Customer } from "../../components/admin/mockData";

function CustomerCard({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center text-sm font-bold text-violet-300">
            {customer.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">{customer.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400">{customer.type}</span>
              <span className="text-gray-600">·</span>
              <StatusBadge status={customer.status} />
              <span className="text-gray-600">·</span>
              <span className="text-xs text-gray-500">{customer.plan}-plan</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-700/50 transition">
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-700/30">
        <div className="bg-gray-800/50 px-5 py-3 flex items-center gap-3">
          <User size={14} className="text-gray-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Kontaktperson</p>
            <p className="text-sm text-gray-200">{customer.contact}</p>
          </div>
        </div>
        <div className="bg-gray-800/50 px-5 py-3 flex items-center gap-3">
          <Phone size={14} className="text-gray-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Telefon</p>
            <a href={`tel:${customer.phone.replace(/\s/g, "")}`} className="text-sm text-violet-400 hover:text-violet-300">{customer.phone}</a>
          </div>
        </div>
        <div className="bg-gray-800/50 px-5 py-3 flex items-center gap-3">
          <Mail size={14} className="text-gray-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">E-post</p>
            <a href={`mailto:${customer.email}`} className="text-sm text-violet-400 hover:text-violet-300 truncate block">{customer.email}</a>
          </div>
        </div>
        <div className="bg-gray-800/50 px-5 py-3 flex items-center gap-3">
          <MapPin size={14} className="text-gray-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Adresse</p>
            <p className="text-sm text-gray-200">{customer.address}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-700/30 flex items-start gap-3">
        <FileText size={14} className="text-gray-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-500">Notater</p>
          <p className="text-sm text-gray-300">{customer.notes}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-700/30 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Tildelt: <span className="text-gray-300">{customer.assigned}</span></span>
          <span>Siste aktivitet: <span className="text-gray-300">{customer.lastActive}</span></span>
          <span>Interaksjoner: <span className="text-gray-300">{customer.interactions}</span></span>
        </div>
        <HealthBar score={customer.health} />
      </div>
    </div>
  );
}

export default function KunderPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  return (
    <>
      <Topbar title="Kunder" />
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                placeholder="Søk etter kunde..."
                className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 w-72 focus:outline-none focus:border-violet-500"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-400 hover:text-gray-200">
              <Filter size={14} /> Filter
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm text-white font-medium">
            <Plus size={14} /> Ny kunde
          </button>
        </div>

        {selectedCustomer && (
          <CustomerCard customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
        )}

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Firma</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Fagtype</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Helse</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Tildelt</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Siste aktivitet</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Område</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(selectedCustomer?.id === c.id ? null : c)}
                  className={`border-b border-gray-700/30 cursor-pointer transition ${
                    selectedCustomer?.id === c.id
                      ? "bg-violet-600/10 hover:bg-violet-600/15"
                      : "hover:bg-gray-700/20"
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-gray-200 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{c.type}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3"><HealthBar score={c.health} /></td>
                  <td className="px-4 py-3 text-sm text-gray-400">{c.assigned}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{c.lastActive}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{c.area}</td>
                  <td className="px-4 py-3"><ChevronRight size={16} className="text-gray-600" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
