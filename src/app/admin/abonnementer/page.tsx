"use client";

import { Users, CreditCard, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Topbar from "../../components/admin/Topbar";
import { StatCard } from "../../components/admin/SharedComponents";
import { customers, subscriptionData } from "../../components/admin/mockData";

export default function AbonnementerPage() {
  return (
    <>
      <Topbar title="Abonnementer" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="MRR" value="28 400 kr" change="+12% fra forrige mnd" changeType="up" icon={CreditCard} />
          <StatCard label="Betalende kunder" value="12" change="+2 denne mnd" changeType="up" icon={Users} />
          <StatCard label="Churn rate" value="2.1%" change="-0.5% fra forrige mnd" changeType="up" icon={TrendingUp} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Abonnementstabell */}
          <div className="col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <h3 className="text-sm font-medium text-gray-300">Abonnementer</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-2">Kunde</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-2">Plan</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-2">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-2">Beløp</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-2">Neste faktura</th>
                </tr>
              </thead>
              <tbody>
                {customers.filter((c) => c.status === "active").map((c) => (
                  <tr key={c.id} className="border-b border-gray-700/30 hover:bg-gray-700/20 cursor-pointer">
                    <td className="px-5 py-3 text-sm text-gray-200">{c.name}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400">Pro</span>
                    </td>
                    <td className="px-5 py-3"><span className="text-xs text-emerald-400">Aktiv</span></td>
                    <td className="px-5 py-3 text-sm text-gray-300">3 600 kr/mnd</td>
                    <td className="px-5 py-3 text-sm text-gray-500">1. mai 2026</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie chart */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Fordeling per plan</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={subscriptionData} dataKey="count" nameKey="plan" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {subscriptionData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, color: "#e5e7eb" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {subscriptionData.map((s) => (
                <div key={s.plan} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded" style={{ background: s.color }} />
                    <span className="text-sm text-gray-400">{s.plan}</span>
                  </div>
                  <span className="text-sm text-gray-300">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
