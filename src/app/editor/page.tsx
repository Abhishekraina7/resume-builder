"use client";

import Link from "next/link";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { CodePane } from "@/components/editor/CodePane";
import { PreviewPane } from "@/components/editor/PreviewPane";
import { AICopilotPane } from "@/components/editor/AICopilotPane";
import { ArrowLeft, History, Settings, Share2, Download, Play } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { templates } from "@/data/templates";

function EditorContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "atlas";
  
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [latexCode, setLatexCode] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileError, setCompileError] = useState<string | null>(null);

  // Load initial template code
  useEffect(() => {
    const template = templates.find(t => t.id === templateId) || templates[0];
    setLatexCode(template.latexSource);
  }, [templateId]);

  const handleCompile = async () => {
    if (!latexCode.trim()) return;
    
    setIsCompiling(true);
    setCompileError(null);

    try {
      const response = await fetch("/api/compile-latex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latexCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to compile LaTeX.");
      }

      setPdfUrl(data.pdfUrl);
    } catch (error: any) {
      console.error("Compilation Error:", error);
      setCompileError(error.message || "An unexpected error occurred during compilation.");
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `resume-${templateId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-white font-sans">
      
      {/* Editor Top Navigation */}
      <header className="h-[60px] border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white z-10 relative shadow-sm">
        
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/templates" className="text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Link href="/dashboard/templates" className="text-slate-500 hover:text-slate-900 transition-colors">Templates</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 capitalize">{templateId} Resume</span>
          </div>
        </div>

        {/* Center: Template Name (Hidden on very small screens) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{templateId} TEMPLATE</span>
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

          <button 
            onClick={handleCompile}
            disabled={isCompiling}
            className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isCompiling ? "Compiling..." : "Compile"}
          </button>
          <button 
            onClick={handleDownload}
            disabled={!pdfUrl}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#0066ff] border border-transparent rounded-full hover:bg-[#0055cc] transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          
          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          <button className="text-slate-500 hover:text-slate-900 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Split Pane Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Code Editor (50%) */}
        <div className="w-1/2 h-full flex flex-col border-r border-[#2d2d2d] bg-[#1e1e1e]">
          <CodePane 
            onOpenAI={() => setIsAIOpen(true)} 
            latexSource={latexCode}
            onChange={setLatexCode}
            onCompile={handleCompile}
          />
        </div>
        
        {/* Right PDF Preview (50%) */}
        <div className="w-1/2 h-full flex flex-col bg-[#f8fafc]">
          <PreviewPane 
            pdfUrl={pdfUrl}
            isCompiling={isCompiling}
            error={compileError}
          />
        </div>

        {/* AI Copilot Slide-over */}
        {isAIOpen && (
          <AICopilotPane onClose={() => setIsAIOpen(false)} />
        )}
      </main>
    </div>
  );
}

export default function EditorPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Editor...</div>}>
        <EditorContent />
      </Suspense>
    </AuthGuard>
  );
}
