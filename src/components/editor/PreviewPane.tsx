"use client";

import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

export function PreviewPane() {
  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] relative">
      {/* Preview Toolbar */}
      <div className="h-12 border-b border-slate-200 flex items-center justify-between px-6 text-sm text-slate-600 font-medium bg-white shrink-0">
        <div className="flex items-center gap-4">
          <ZoomOut className="w-4 h-4 cursor-pointer hover:text-slate-900" />
          <span>100%</span>
          <ZoomIn className="w-4 h-4 cursor-pointer hover:text-slate-900" />
        </div>
        <div>Page 1 of 1</div>
        <div>
          <Maximize className="w-4 h-4 cursor-pointer hover:text-slate-900" />
        </div>
      </div>

      {/* PDF View Container */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center pb-24">
        {/* The "Paper" Document */}
        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-[800px] aspect-[1/1.4] p-12 lg:p-16 text-slate-900 font-sans cursor-text shrink-0">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-widest mb-2">ALEX RIVERA</h1>
            <p className="text-xs text-slate-500 tracking-widest font-semibold">
              SAN FRANCISCO, CA • (555) 000-0000 • ALEX@ATELIER.DEV
            </p>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <h2 className="text-sm font-bold tracking-widest border-b-2 border-slate-900 pb-2 mb-4">
              EXPERIENCE
            </h2>
            
            <div className="mb-5">
              <div className="flex justify-between items-end mb-1">
                <h3 className="font-bold text-sm">DIGITAL ATELIER</h3>
                <span className="text-xs text-slate-500 italic">Jan 2022 – Present</span>
              </div>
              <p className="text-sm italic mb-2">Senior Software Engineer</p>
              <ul className="list-disc pl-5 text-xs space-y-1.5 text-slate-700 leading-relaxed marker:text-slate-400">
                <li>Architected the core LaTeX compilation engine using WebAssembly, reducing build times by 40%.</li>
                <li>Implemented a collaborative editing environment supporting up to 50 concurrent users.</li>
                <li>Mentored a team of 5 junior engineers and established modern CI/CD practices.</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-end mb-1">
                <h3 className="font-bold text-sm">TECHFLOW SYSTEMS</h3>
                <span className="text-xs text-slate-500 italic">June 2019 – Dec 2021</span>
              </div>
              <p className="text-sm italic mb-2">Full Stack Developer</p>
              <ul className="list-disc pl-5 text-xs space-y-1.5 text-slate-700 leading-relaxed marker:text-slate-400">
                <li>Developed microservices in Node.js serving 1M+ daily active users.</li>
                <li>Redesigned the internal dashboard using React, improving operational efficiency by 25%.</li>
              </ul>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <h2 className="text-sm font-bold tracking-widest border-b-2 border-slate-900 pb-2 mb-4">
              EDUCATION
            </h2>
            <div className="flex justify-between items-end mb-1">
              <h3 className="font-bold text-sm">UNIVERSITY OF CALIFORNIA, BERKELEY</h3>
              <span className="text-xs text-slate-500 italic">Class of 2019</span>
            </div>
            <p className="text-xs text-slate-600">B.S. in Computer Science</p>
          </div>

          {/* Technical Skills Section */}
          <div>
            <h2 className="text-sm font-bold tracking-widest border-b-2 border-slate-900 pb-2 mb-4">
              TECHNICAL SKILLS
            </h2>
            <div className="text-xs space-y-2 text-slate-700">
              <p><span className="font-bold">Languages:</span> JavaScript (ES6+), TypeScript, LaTeX, C++, Rust, Python</p>
              <p><span className="font-bold">Frameworks:</span> React, Node.js, Tailwind CSS, WebAssembly, Express</p>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="bg-white border border-slate-200 shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          <div className="w-2 h-2 rounded-full bg-[#0066ff]"></div>
          Auto-compiled 2s ago
        </div>
      </div>
    </div>
  );
}
