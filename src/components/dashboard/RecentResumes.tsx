"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

export function RecentResumes() {
  const resumes = [
    { title: "Software Engineer Resume", time: "Edited 2 days ago" },
    { title: "Product Designer 2024", time: "Edited 5 days ago" },
    { title: "Generic Professional CV", time: "Edited 1 week ago" },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Recent Resumes</h2>
        <Link href="/dashboard/documents" className="text-sm font-bold text-[#0066ff] hover:text-[#0055cc] transition-colors">
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resumes.map((resume, idx) => (
          <div 
            key={idx}
            className="group cursor-pointer rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all flex flex-col pt-6"
          >
            {/* Document Preview Wireframe */}
            <div className="bg-[#f8fafc] rounded-xl flex-1 mb-5 relative overflow-hidden group-hover:bg-[#f1f5f9] transition-colors aspect-[1/1.3] p-6 flex flex-col gap-3">
              <div className="w-[40%] h-2 bg-slate-200 rounded-full"></div>
              <div className="w-[80%] h-1.5 bg-slate-200 rounded-full"></div>
              <div className="w-[75%] h-1.5 bg-slate-200 rounded-full"></div>
              <div className="w-[100%] h-1.5 bg-slate-200 rounded-full mt-4"></div>
              <div className="w-[60%] h-1.5 bg-slate-200 rounded-full"></div>
            </div>

            {/* Metadata Footer */}
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">{resume.title}</h3>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{resume.time}</p>
              </div>
              <button className="text-slate-400 hover:text-slate-800 transition-colors p-1 rounded-md hover:bg-slate-100">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
