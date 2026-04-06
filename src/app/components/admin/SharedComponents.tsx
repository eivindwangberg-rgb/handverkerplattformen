"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// --- Status Badge ---
type StatusType = "active" | "onboarding" | "paused" | "churned" | "ok" | "error" | "planned";

const statusStyles: Record<StatusType, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  onboarding: "bg-blue-500/20 text-blue-400",
  paused: "bg-yellow-500/20 text-yellow-400",
  churned: "bg-red-500/20 text-red-400",
  ok: "bg-emerald-500/20 text-emerald-400",
  error: "bg-red-500/20 text-red-400",
  planned: "bg-gray-500/20 text-gray-400",
};

const statusLabels: Record<StatusType, string> = {
  active: "Aktiv",
  onboarding: "Onboarding",
  paused: "Pauset",
  churned: "Churnet",
  ok: "OK",
  error: "Feil",
  planned: "Planlagt",
};

export function StatusBadge({ status }: { status: string }) {
  const s = status as StatusType;
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[s] || statusStyles.active}`}>
      {statusLabels[s] || status}
    </span>
  );
}

// --- Health Bar ---
export function HealthBar({ score }: { score: number }) {
  const color = score >= 70 ? "bg-emerald-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";
  const textColor = score >= 70 ? "text-emerald-400" : score >= 50 ? "text-yellow-400" : "text-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs ${textColor}`}>{score}</span>
    </div>
  );
}

// --- Stat Card ---
export function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  icon: LucideIcon;
}) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400">{label}</span>
        <div className="w-9 h-9 rounded-lg bg-gray-700/50 flex items-center justify-center">
          <Icon size={18} className="text-gray-400" />
        </div>
      </div>
      <div className="text-2xl font-semibold text-white mb-1">{value}</div>
      {change && (
        <div className={`flex items-center gap-1 text-xs ${changeType === "up" ? "text-emerald-400" : "text-red-400"}`}>
          {changeType === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {change}
        </div>
      )}
    </div>
  );
}

// --- Stage Badge ---
const stageStyles: Record<string, string> = {
  new: "bg-gray-600/30 text-gray-300",
  contacted: "bg-blue-500/20 text-blue-400",
  demo: "bg-purple-500/20 text-purple-400",
  offer: "bg-amber-500/20 text-amber-400",
  won: "bg-emerald-500/20 text-emerald-400",
  lost: "bg-red-500/20 text-red-400",
};

const stageLabels: Record<string, string> = {
  new: "Ny",
  contacted: "Kontaktet",
  demo: "Demo",
  offer: "Tilbud",
  won: "Lukket",
  lost: "Tapt",
};

export function StageBadge({ stage }: { stage: string }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stageStyles[stage]}`}>
      {stageLabels[stage]}
    </span>
  );
}

// --- Priority Dot ---
export function PriorityDot({ priority }: { priority: "high" | "medium" | "low" }) {
  const color = priority === "high" ? "bg-red-500" : priority === "medium" ? "bg-yellow-500" : "bg-blue-500";
  return <span className={`inline-block w-2 h-2 rounded-full ${color}`} />;
}

// --- Activity Icon ---
import {
  Globe, Bot, TrendingUp, CheckCircle, AlertTriangle, Settings, Plus, Zap,
} from "lucide-react";

const iconMap: Record<string, { icon: LucideIcon; color: string }> = {
  globe: { icon: Globe, color: "text-emerald-400" },
  bot: { icon: Bot, color: "text-blue-400" },
  trending: { icon: TrendingUp, color: "text-amber-400" },
  check: { icon: CheckCircle, color: "text-emerald-400" },
  alert: { icon: AlertTriangle, color: "text-red-400" },
  edit: { icon: Settings, color: "text-violet-400" },
  plus: { icon: Plus, color: "text-blue-400" },
  zap: { icon: Zap, color: "text-amber-400" },
};

export function ActivityIcon({ type }: { type: string }) {
  const entry = iconMap[type] || iconMap.check;
  const Icon = entry.icon;
  return (
    <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center shrink-0">
      <Icon size={14} className={entry.color} />
    </div>
  );
}
