"use client";

import { ZoomIn, ZoomOut, Maximize, Loader2, AlertCircle } from "lucide-react";

interface PreviewPaneProps {
  pdfUrl: string | null;
  isCompiling: boolean;
  error: string | null;
}

export function PreviewPane({ pdfUrl, isCompiling, error }: PreviewPaneProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] relative h-full">
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
      <div className="flex-1 overflow-hidden relative bg-[#e2e8f0] flex justify-center p-4">
        {/* Error State */}
        {error && !isCompiling && (
          <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Compilation Failed</h3>
            <p className="text-slate-600 max-w-md">{error}</p>
          </div>
        )}

        {/* Loading Overlay */}
        {isCompiling && (
          <div className="absolute inset-0 z-20 bg-slate-900/10 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-[#0066ff] animate-spin" />
              <p className="text-sm font-bold text-slate-700">Compiling LaTeX...</p>
            </div>
          </div>
        )}

        {/* The PDF Document */}
        {pdfUrl ? (
          <iframe 
            src={pdfUrl} 
            className="w-full h-full max-w-[850px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg bg-white"
            title="Resume PDF Preview"
          />
        ) : (
          <div className="w-full h-full max-w-[850px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg bg-white flex items-center justify-center text-slate-400 font-medium flex-col gap-2">
            <p>No PDF generated yet.</p>
            <p className="text-xs">Click "Compile" or press Ctrl+S to render.</p>
          </div>
        )}
      </div>
    </div>
  );
}
