"use client";

import { useState, useRef } from "react";
import { X, UploadCloud, FileText, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { uploadDocument } from "@/backend/supabase/storage.service";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export function UploadModal({ isOpen, onClose, onUploadComplete }: UploadModalProps) {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleFile = (selectedFile: File) => {
    setError("");
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a valid PDF or DOCX file.");
      return;
    }
    
    // limit to 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    setIsUploading(true);
    setProgress(0);
    setError("");

    try {
      await uploadDocument(file, user.id, (p) => {
        setProgress(p);
      });
      // Delay slightly for UX so user sees 100%
      setTimeout(() => {
        setIsUploading(false);
        setFile(null);
        onUploadComplete();
        onClose();
      }, 500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload document");
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Upload Document</h2>
          <button 
            onClick={onClose}
            disabled={isUploading}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {!file ? (
            /* Drag & Drop Zone */
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragging 
                  ? "border-[#0066ff] bg-[#f0f5ff]" 
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                className="hidden" 
                accept=".pdf,.docx" 
              />
              <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <UploadCloud className="w-5 h-5 text-[#0066ff]" />
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">Choose from device</p>
              <p className="text-xs text-slate-500 font-medium text-center">or drag and drop your PDF/DOCX here</p>
            </div>
          ) : (
            /* Selected File State */
            <div className="border border-slate-200 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-[#f0f5ff] rounded-full flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#0066ff]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                    <p className="text-[11px] font-medium text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                {!isUploading && (
                  <button 
                    onClick={() => setFile(null)}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Uploading Progress */}
              {isUploading && (
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>Uploading...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0066ff] h-full transition-all duration-300 ease-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            disabled={isUploading}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#0066ff] hover:bg-[#0055cc] transition-colors shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center min-w-[100px]"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        
      </div>
    </div>
  );
}
