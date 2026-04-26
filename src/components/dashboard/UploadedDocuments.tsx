"use client";

import { FileText, Download } from "lucide-react";

export function UploadedDocuments() {
  const documents = [
    {
      title: "Experience_Certificate.pdf",
      date: "UPLOADED OCT 12, 2023",
      type: "PDF",
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Old_Resume_Backup.docx",
      date: "UPLOADED SEP 28, 2023",
      type: "DOCX",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Recommendation_Letter.pdf",
      date: "UPLOADED AUG 15, 2023",
      type: "PDF",
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Uploaded Documents</h2>
      
      <div className="flex flex-col gap-4">
        {documents.map((doc, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between p-5 rounded-[20px] bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.015)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.04)] hover:border-slate-200 transition-all group"
          >
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl ${doc.bgColor} flex items-center justify-center shrink-0`}>
                <FileText className={`w-6 h-6 ${doc.iconColor}`} />
              </div>
              
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">{doc.title}</h3>
                <p className="text-[11px] font-medium text-slate-400 font-mono tracking-widest">{doc.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2.5 py-1 rounded-md">
                {doc.type}
              </div>
              <button className="text-slate-400 hover:text-slate-800 transition-colors opacity-0 group-hover:opacity-100">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
