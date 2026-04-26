"use client";

import { X, Sparkles, ArrowUp, CheckCircle2 } from "lucide-react";

interface AICopilotPaneProps {
  onClose: () => void;
}

export function AICopilotPane({ onClose }: AICopilotPaneProps) {
  const suggestions = ["Fill with details", "Improve summary", "Fix LaTeX"];

  return (
    <div className="w-[380px] h-full bg-white flex flex-col border-l border-slate-200 shadow-2xl absolute right-0 top-0 z-50 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="h-[72px] border-b border-slate-100 flex items-center justify-between px-5 shrink-0 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f0f5ff] text-[#0066ff] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">AI Copilot</h2>
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">LaTeX Intelligence</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className="flex gap-2 px-5 py-4 overflow-x-auto no-scrollbar shrink-0 border-b border-slate-50">
        {suggestions.map((s) => (
          <button 
            key={s} 
            className="whitespace-nowrap px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50">
        
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-[#0066ff] text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed shadow-sm shadow-blue-500/10 font-medium">
            Fill in my work experience from my uploaded resume.
          </div>
        </div>

        {/* Assistant Message */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-1 text-[#0066ff]">
               <Sparkles className="w-4 h-4" />
               <span className="text-[11px] font-bold tracking-widest uppercase">Assistant</span>
            </div>
          </div>
          
          <div className="text-slate-700 text-sm leading-relaxed px-1">
            I found your work experience from the PDF. I've filled in 2 positions:
          </div>

          {/* Action Cards */}
          <div className="space-y-2">
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-sm font-semibold text-slate-800">TechNova Solutions</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-sm font-semibold text-slate-800">Quantum Leap AI</span>
            </div>
          </div>

          <div className="text-slate-700 text-sm leading-relaxed px-1 mt-3">
            Would you like me to refine the bullet points for these roles as well?
          </div>
        </div>

        {/* User Message 2 */}
        <div className="flex justify-end">
          <div className="bg-[#0066ff] text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed shadow-sm shadow-blue-500/10 font-medium">
            Can you improve my professional summary?
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-slate-100 bg-white shrink-0">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            className="w-full bg-[#f1f5f9] border-none rounded-full pl-5 pr-12 py-3.5 text-sm text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0066ff]/20 transition-all outline-none"
          />
          <button className="absolute right-1.5 w-9 h-9 rounded-full bg-[#0066ff] hover:bg-[#0055cc] flex items-center justify-center text-white transition-all shadow-md shadow-blue-500/20 active:scale-95">
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-3 px-4 leading-tight">
          Copilot may produce inaccurate information about document structure.
        </p>
      </div>
    </div>
  );
}
