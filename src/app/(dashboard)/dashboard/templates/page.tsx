"use client";

import { useState, useEffect, Suspense } from "react";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function TemplateToast() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    if (searchParams.get("action") === "new-resume") {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 fade-in duration-500">
       <div className="bg-[#0066ff] text-white px-6 py-3 rounded-full shadow-xl shadow-blue-500/30 font-semibold flex items-center gap-3">
         <Sparkles className="w-5 h-5" />
         Choose a template to get started!
       </div>
    </div>
  );
}

const filters = ["All", "Minimal", "Modern", "Academic", "Creative", "ATS-Optimized"];

const templates = [
  {
    id: "meridian",
    name: "Meridian",
    tags: ["MINIMAL", "PROFESSIONAL"],
    category: "Minimal",
    // simple wireframe representation
    wireframe: (
      <div className="flex flex-col gap-3 p-6 h-full">
        <div className="w-1/3 h-3 bg-slate-200 rounded-full mb-2"></div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
        <div className="w-5/6 h-1.5 bg-slate-200 rounded-full"></div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
        <div className="flex gap-4 mt-4 h-full">
           <div className="w-1/2 flex flex-col gap-2">
             <div className="w-full h-8 bg-slate-100 rounded-xl"></div>
             <div className="w-full h-8 bg-slate-100 rounded-xl"></div>
           </div>
           <div className="w-1/2 bg-slate-50 rounded-xl h-full min-h-[80px]"></div>
        </div>
      </div>
    )
  },
  {
    id: "atlas",
    name: "Atlas",
    tags: ["ATS FRIENDLY", "CLASSIC"],
    category: "ATS-Optimized",
    wireframe: (
      <div className="flex flex-col gap-3 p-6 h-full">
         <div className="flex justify-between items-start mb-2">
            <div className="w-1/2 h-3 bg-slate-200 rounded-full"></div>
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
         </div>
         <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
         <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
         <div className="w-3/4 h-1.5 bg-slate-200 rounded-full"></div>
         <div className="flex gap-2 mt-4">
            <div className="w-1/4 h-1.5 bg-slate-200 rounded-full"></div>
         </div>
      </div>
    )
  },
  {
    id: "nova",
    name: "Nova",
    tags: ["MODERN", "DESIGNER"],
    category: "Modern",
    wireframe: (
      <div className="flex gap-4 p-6 h-full">
         <div className="w-1/3 flex flex-col gap-3">
            <div className="w-full h-3 bg-slate-200 rounded-full mb-2"></div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
            <div className="w-3/4 h-1.5 bg-slate-200 rounded-full"></div>
         </div>
         <div className="w-2/3 flex flex-col gap-4">
            <div className="w-full bg-slate-50 rounded-xl h-20"></div>
            <div className="w-full bg-slate-50 rounded-xl h-20"></div>
         </div>
      </div>
    )
  },
  {
    id: "prism",
    name: "Prism",
    tags: ["CREATIVE", "BOLD"],
    category: "Creative",
    wireframe: (
      <div className="flex flex-col gap-3 p-6 h-full">
        <div className="w-1/4 h-3 bg-blue-200 rounded-full mb-1"></div>
        <div className="w-1/2 h-4 bg-slate-200 rounded-full mb-1"></div>
        <div className="flex gap-2 mb-4">
          <div className="w-10 h-3 bg-slate-100 rounded-full"></div>
          <div className="w-10 h-3 bg-slate-100 rounded-full"></div>
          <div className="w-10 h-3 bg-slate-100 rounded-full"></div>
        </div>
        <div className="flex gap-3 h-full border-l-2 border-blue-400 pl-3">
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
            <div className="w-5/6 h-1.5 bg-slate-200 rounded-full"></div>
            <div className="w-[90%] h-1.5 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "axiom",
    name: "Axiom",
    tags: ["ACADEMIC", "STRUCTURED"],
    category: "Academic",
    wireframe: (
      <div className="flex flex-col items-center gap-2 p-6 h-full">
        <div className="w-1/4 h-3 bg-slate-200 rounded-full mb-1"></div>
        <div className="w-1/2 h-1.5 bg-slate-200 rounded-full mb-4"></div>
        <div className="w-full h-px bg-slate-100 mb-2"></div>
        
        <div className="w-full flex justify-between gap-4 mb-2">
           <div className="w-1/4 h-2 bg-slate-200 rounded-full"></div>
           <div className="w-3/4 h-2 bg-slate-100 rounded-full"></div>
        </div>
        <div className="w-full flex justify-between gap-4 mb-2">
           <div className="w-1/4 h-2 bg-slate-200 rounded-full"></div>
           <div className="w-3/4 h-2 bg-slate-100 rounded-full"></div>
        </div>
        <div className="w-full flex justify-between gap-4">
           <div className="w-1/4 h-2 bg-slate-200 rounded-full"></div>
           <div className="w-3/4 h-2 bg-slate-100 rounded-full"></div>
        </div>
      </div>
    )
  },
  {
    id: "crest",
    name: "Crest",
    tags: ["EXECUTIVE", "POLISHED"],
    category: "Modern",
    wireframe: (
      <div className="flex gap-4 p-6 h-full border-r-8 border-slate-50">
         <div className="w-[30%] flex flex-col gap-3 items-center">
            <div className="w-10 h-10 bg-slate-100 rounded-lg mb-2"></div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full"></div>
         </div>
         <div className="w-[70%] flex flex-col gap-3">
            <div className="w-1/3 h-3 bg-slate-200 rounded-full mb-1"></div>
            <div className="w-full bg-slate-50 rounded-2xl h-24"></div>
            <div className="w-full bg-slate-50 rounded-2xl h-24"></div>
         </div>
      </div>
    )
  }
];

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState("nova"); // Pre-select Nova to match design

  const filteredTemplates = templates.filter(
    (t) => activeFilter === "All" || t.category === activeFilter
  );

  return (
    <div className="max-w-5xl mx-auto w-full pt-4 pb-12">
      <Suspense fallback={null}>
        <TemplateToast />
      </Suspense>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Templates</h1>
        <p className="text-slate-500 font-medium">Choose a professionally designed starting point.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeFilter === filter
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          
          return (
            <div key={template.id} className="flex flex-col group relative">
              {/* Card Container */}
              <div 
                className={`relative flex-1 bg-white rounded-t-[28px] overflow-hidden transition-all duration-300 aspect-[1/1.3] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border-2 ${
                  isSelected ? "border-[#0066ff]" : "border-slate-100 group-hover:border-slate-200"
                }`}
              >
                {/* Active Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 z-20 w-7 h-7 bg-[#0066ff] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}

                {/* Wireframe Area */}
                <div className="absolute inset-0 z-0">
                   {template.wireframe}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  <button 
                    className="px-6 py-2.5 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => setSelectedTemplate(template.id)}
                    className="px-6 py-2.5 rounded-full bg-[#0066ff] hover:bg-[#0055cc] text-white font-semibold text-sm shadow-xl shadow-[#0066ff]/20 transition-all hover:scale-105"
                  >
                    Use Template
                  </button>
                </div>
              </div>

              {/* Card Footer (Metadata) */}
              <div 
                className={`bg-white rounded-b-[28px] p-6 border-b-2 border-x-2 transition-all duration-300 ${
                  isSelected ? "border-[#0066ff]" : "border-slate-100 group-hover:border-slate-200"
                } border-t-0`}
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{template.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-slate-100 text-slate-600 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Request Link */}
      <div className="mt-16 text-center text-sm font-medium text-slate-500">
        Don't see what you need?{" "}
        <Link href="/dashboard/templates/request" className="text-[#0066ff] hover:underline font-semibold">
          Request a custom template
        </Link>.
      </div>
    </div>
  );
}
