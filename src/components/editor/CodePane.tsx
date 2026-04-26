"use client";

import { FileText, Sparkles } from "lucide-react";

interface CodePaneProps {
  onOpenAI: () => void;
}

export function CodePane({ onOpenAI }: CodePaneProps) {
  const codeLines = [
    { num: 1, text: "", type: "" },
    { num: 2, text: "\\documentclass[letterpaper,11pt]{article}", type: "keyword" },
    { num: 3, text: "% Template for Software Engineer Resume", type: "comment" },
    { num: 4, text: "\\usepackage{latexsym}", type: "keyword" },
    { num: 5, text: "\\usepackage[empty]{fullpage}", type: "keyword" },
    { num: 6, text: "", type: "" },
    { num: 7, text: "\\begin{document}", type: "keyword" },
    { num: 8, text: "", type: "" },
    { num: 9, text: "\\begin{center}", type: "keyword" },
    { num: 10, text: "    \\textbf{Alex Rivera} \\\\", type: "keyword" },
    { num: 11, text: "    San Francisco, CA $|$ (555) 000-0000 $|$ alex@atelier.dev", type: "text" },
    { num: 12, text: "\\end{center}", type: "keyword" },
    { num: 13, text: "", type: "" },
    { num: 14, text: "\\section{Experience}", type: "keyword" },
    { num: 15, text: "\\begin{itemize}", type: "keyword" },
    { num: 16, text: "    \\item \\textbf{Senior Software Engineer} at Digital Atelier", type: "mixed" },
    { num: 17, text: "    Leading the development of AI-powered document editors.", type: "text" },
    { num: 18, text: "\\end{itemize}", type: "keyword" },
    { num: 19, text: "", type: "" },
    { num: 20, text: "\\end{document}", type: "keyword" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm relative">
      {/* Editor Tabs */}
      <div className="flex bg-[#181818] border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1e1e] border-t-2 border-[#0066ff] text-white">
          <FileText className="w-4 h-4 text-slate-300" />
          <span>main.tex</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 text-slate-500 hover:bg-[#252526] cursor-pointer">
          <FileText className="w-4 h-4" />
          <span>bibliography.bib</span>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 flex">
        {/* Line Numbers */}
        <div className="flex flex-col text-[#858585] select-none text-right pr-4 min-w-[32px]">
          {codeLines.map((line) => (
            <div key={line.num} className="leading-6">{line.num}</div>
          ))}
        </div>
        
        {/* Code Content */}
        <div className="flex flex-col flex-1 pl-2 whitespace-pre font-[family-name:var(--font-geist-mono)]">
          {codeLines.map((line, idx) => {
            // Very simple hardcoded highlighting for visual effect
            let renderedText = <span className="text-[#d4d4d4]">{line.text}</span>;
            
            if (line.type === "keyword") {
              const parts = line.text.split(/(\\[a-zA-Z]+)/g);
              renderedText = (
                <>
                  {parts.map((part, i) => 
                    part.startsWith("\\") ? <span key={i} className="text-[#569cd6]">{part}</span> : <span key={i}>{part}</span>
                  )}
                </>
              );
            } else if (line.type === "comment") {
              renderedText = <span className="text-[#6a9955]">{line.text}</span>;
            } else if (line.type === "mixed") {
              const parts = line.text.split(/(\\[a-zA-Z]+)/g);
              renderedText = (
                <>
                  {parts.map((part, i) => 
                    part.startsWith("\\") ? <span key={i} className="text-[#569cd6]">{part}</span> : 
                    part === "Digital Atelier" ? <span key={i} className="text-[#ce9178]">{part}</span> : <span key={i}>{part}</span>
                  )}
                </>
              );
            }

            return (
              <div key={idx} className="leading-6">
                {renderedText || " "}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ask AI Floating Button */}
      <button 
        onClick={onOpenAI}
        className="absolute bottom-6 right-6 bg-[#0066ff] hover:bg-[#0055cc] text-white px-5 py-3 rounded-full shadow-lg shadow-blue-500/20 flex items-center gap-2 font-bold transition-all hover:scale-105"
      >
        <Sparkles className="w-5 h-5" />
        Ask AI
      </button>
    </div>
  );
}
