"use client";

import Link from "next/link";
import { Users, Activity, Clock, CreditCard, Globe, Bot, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Topbar from "../../components/admin/Topbar";
import { StatCard, PriorityDot } from "../../components/admin/SharedComponents";
import { revenueData, agents, followUps, activities } from "../../components/admin/mockData";

const activityIcons: Record<string, { icon: typeof Globe; color: string }> = {
  globe: { icon: Globe, color: "text-emerald-400" },
  bot: { icon: Bot, color: "text-blue-400" },
  trending: { icon: TrendingUp, color: "text-amber-400" },
  check: { icon: CheckCircle, color: "text-emerald-400" },
  alert: { icon: AlertTriangle, color: "text-red-400" },
};

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Nøkkeltall */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Aktive kunder" value="15" change="+3 denne mnd" changeType="up" icon={Users} />
          <StatCard label="I onboarding" value="4" change="+2 denne uken" changeType="up" icon={Activity} />
          <StatCard label="Åpne oppfølginger" value="4" change="2 forfalt" changeType="down" icon={Clock} />
          <StatCard label="MRR" value="28 400 kr" change="+12% fra forrige mnd" changeType="up" icon={CreditCard} />
        </div>

        {/* Grafer + agentstatus */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">Inntekt siste 6 måneder</h3>
              <span className="text-xs text-gray-500">NOK</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, color: "#e5e7eb" }} />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Agentstatus</h3>
            <div className="space-y-3">
              {agents.filter((a) => a.status !== "planned").map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-gray-300">{a.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{a.lastRun}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Oppfølginger + aktivitet */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">Oppfølginger</h3>
              <Link href="/admin/kunder" className="text-xs text-violet-400 hover:text-violet-300">Se alle</Link>
            </div>
            <div className="space-y-3">
              {followUps.map((f) => (
                <div key={f.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 cursor-pointer">
                  <PriorityDot priority={f.priority} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-200 truncate">{f.customer}</div>
                    <div className="text-xs text-gray-500 truncate">{f.reason}</div>
                  </div>
                  <span className={`text-xs whitespace-nowrap ${f.due === "I dag" ? "text-red-400" : "text-gray-500"}`}>
                    {f.due}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">Siste aktivitet</h3>
              <Link href="/admin/aktivitet" className="text-xs text-violet-400 hover:text-violet-300">Se alle</Link>
            </div>
            <div className="space-y-3">
              {activities.slice(0, 5).map((a) => {
                const iconEntry = activityIcons[a.icon] || activityIcons.check;
                const Icon = iconEntry.icon;
                return (
                  <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 cursor-pointer">
                    <div className="w-7 h-7 rounded-full bg-gray-700/50 flex items-center justify-center shrink-0">
                      <Icon size={14} className={iconEntry.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-200 truncate">{a.desc}</div>
                      <div className="text-xs text-gray-500 truncate">{a.customer}</div>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">{a.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
