"use client";

import { useState, useEffect } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { fetchUserDocuments, DocumentMetadata } from "@/backend/supabase/storage.service";
import { useAuth } from "@/context/AuthContext";

export function UploadedDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const docs = await fetchUserDocuments(user.id);
      setDocuments(docs);
    } catch (err) {
      console.error("Failed to load documents: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();

    // Listen to global upload event triggered by UploadModal
    const handleUpload = () => {
      loadDocuments();
    };

    window.addEventListener("documentUploaded", handleUpload);
    return () => window.removeEventListener("documentUploaded", handleUpload);
  }, [user]);

  if (loading) {
    return (
      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Uploaded Documents</h2>
        <div className="flex items-center justify-center p-10 text-slate-400 bg-white rounded-[20px] border border-slate-100">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Uploaded Documents</h2>
      
      {documents.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-[20px] p-8 text-center transition-all hover:bg-slate-100">
          <p className="text-sm font-medium text-slate-500">No documents uploaded yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {documents.map((doc, idx) => {
            const isPdf = doc.fileType === "application/pdf";
            const iconColor = isPdf ? "text-red-500" : "text-blue-500";
            const bgColor = isPdf ? "bg-red-50" : "bg-blue-50";
            const typeLabel = isPdf ? "PDF" : "DOCX";
            
            // Convert Postgres Timestamp gracefully
            const dateStr = doc.createdAt 
              ? `UPLOADED ${new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}` 
              : "UPLOADED RECENTLY";

            return (
              <div 
                key={doc.id || idx}
                className="flex items-center justify-between p-5 rounded-[20px] bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.015)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.04)] hover:border-slate-200 transition-all group"
              >
                <div className="flex items-center gap-5 overflow-hidden">
                  <div className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center shrink-0`}>
                    <FileText className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 mb-1 truncate">{doc.fileName}</h3>
                    <p className="text-[11px] font-medium text-slate-400 font-mono tracking-widest">{dateStr}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 shrink-0 pl-4">
                  <div className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2.5 py-1 rounded-md">
                    {typeLabel}
                  </div>
                  <a 
                    href={doc.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-800 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
