"use client";

import { Search, Bell, HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardTopNav() {
  const pathname = usePathname();
  
  // Format the title based on route logic (e.g. "/dashboard" -> "Dashboard")
  let title = "Dashboard";
  if (pathname !== "/dashboard" && pathname.startsWith("/dashboard/")) {
    const slug = pathname.replace("/dashboard/", "");
    title = slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
  }

  return (
    <header className="h-[80px] px-6 lg:px-10 flex items-center justify-between border-b border-transparent shrink-0">
      <h1 className="text-xl font-bold text-slate-900 tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search resumes..."
            className="w-[280px] bg-[#f1f5f9] border-none rounded-full pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 transition-all"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:text-slate-900 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="hover:text-slate-900 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
