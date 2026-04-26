"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/backend/firebase/auth.service";
import { 
  LayoutDashboard, 
  FileText, 
  PenTool, 
  Folder, 
  Bot, 
  User, 
  Settings, 
  LogOut 
} from "lucide-react";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/templates", label: "Templates", icon: FileText },
  { href: "/dashboard/editor", label: "Editor", icon: PenTool },
  { href: "/dashboard/documents", label: "Documents", icon: Folder },
  { href: "/dashboard/ai-copilot", label: "AI Copilot", icon: Bot },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="w-[260px] bg-[#f8fafc] border-r border-slate-200 flex flex-col hidden md:flex shrink-0">
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 overflow-hidden text-orange-600 font-bold">
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate text-sm flex items-center gap-2">
              {user?.displayName || "Arjun Sharma"}
              <span className="bg-[#0066ff] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">PRO</span>
            </h3>
            <p className="text-xs text-slate-500 truncate">The Digital Atelier</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? "bg-white text-[#0066ff] shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Nav */}
      <div className="p-4 space-y-1 border-t border-slate-200/50">
        <Link 
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 transition-all"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
