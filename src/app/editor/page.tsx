"use client";

import Link from "next/link";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { CodePane } from "@/components/editor/CodePane";
import { PreviewPane } from "@/components/editor/PreviewPane";
import { ArrowLeft, History, Settings, Share2 } from "lucide-react";

export default function EditorPage() {
  return (
    <AuthGuard>
      <div className="h-screen w-full flex flex-col overflow-hidden bg-white font-sans">
        
        {/* Editor Top Navigation */}
        <header className="h-[60px] border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white">
          
          {/* Left: Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard/templates" className="text-slate-400 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Link href="/dashboard/templates" className="text-slate-500 hover:text-slate-900 transition-colors">Templates</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900">Software Engineer Resume</span>
            </div>
          </div>

          {/* Center: Template Name (Hidden on very small screens) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ATLAS TEMPLATE</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-900 transition-colors">
              <History className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-slate-900 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="h-4 w-px bg-slate-200 mx-1"></div>

            <button className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
              Compile
            </button>
            <button className="px-5 py-2 text-sm font-semibold text-white bg-[#0066ff] border border-transparent rounded-full hover:bg-[#0055cc] transition-colors shadow-sm shadow-blue-500/20">
              Download PDF
            </button>
            
            <div className="h-4 w-px bg-slate-200 mx-1"></div>

            <button className="text-slate-500 hover:text-slate-900 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Split Pane Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Code Editor (50%) */}
          <div className="w-1/2 h-full flex flex-col border-r border-[#2d2d2d] bg-[#1e1e1e]">
            <CodePane />
          </div>
          
          {/* Right PDF Preview (50%) */}
          <div className="w-1/2 h-full flex flex-col bg-[#f8fafc]">
            <PreviewPane />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
