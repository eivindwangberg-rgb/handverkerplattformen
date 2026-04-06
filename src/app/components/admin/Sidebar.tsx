"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, TrendingUp, Activity, Bot, CreditCard,
  Clock, Server, UserCog, Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { key: "kunder", label: "Kunder", icon: Users, href: "/admin/kunder" },
  { key: "salg", label: "Salg", icon: TrendingUp, href: "/admin/salg" },
  { key: "status", label: "Status", icon: Activity, href: "/admin/status" },
  { key: "agenter", label: "Agenter", icon: Bot, href: "/admin/agenter" },
  { key: "abonnementer", label: "Abonnementer", icon: CreditCard, href: "/admin/abonnementer" },
  { key: "aktivitet", label: "Aktivitet", icon: Clock, href: "/admin/aktivitet" },
  { key: "server", label: "Server / Ruting", icon: Server, href: "/admin/server" },
  { key: "team", label: "Team", icon: UserCog, href: "/admin/team" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-100">Håndverker CRM</span>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-violet-600/20 text-violet-400"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2 px-2">
          <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-violet-400">E</span>
          </div>
          <div>
            <div className="text-xs text-gray-300">Eivind</div>
            <div className="text-xs text-gray-600">Eier</div>
          </div>
        </div>
      </div>
    </div>
  );
}
