"use client";

import { Plus, FileUp, Sparkles } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "New Resume",
      description: "Create a fresh resume using our high-end editorial templates.",
      icon: Plus,
      color: "bg-[#0066ff]",
    },
    {
      title: "Upload Document",
      description: "Import your existing PDF or DOCX file for AI analysis and styling.",
      icon: FileUp,
      color: "bg-[#0066ff]",
    },
    {
      title: "Use AI Copilot",
      description: "Generate targeted bullet points based on a specific job description.",
      icon: Sparkles,
      color: "bg-[#0066ff]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {actions.map((action, idx) => {
        const Icon = action.icon;
        return (
          <div 
            key={idx} 
            className="bg-white border border-slate-100 rounded-[28px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-full ${action.color} text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
              <Icon className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{action.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {action.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
