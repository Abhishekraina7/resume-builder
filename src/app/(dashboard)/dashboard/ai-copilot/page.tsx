"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserDocuments, DocumentMetadata } from "@/backend/supabase/storage.service";
import { analyzeResumeAction } from "@/app/actions/ai.actions";
import {
  Sparkles,
  FileText,
  Upload,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from "lucide-react";

export default function AICopilotPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [sourceType, setSourceType] = useState<"existing" | "upload">("existing");
  const [selectedDocId, setSelectedDocId] = useState<string>("");
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserDocuments(user.id).then(setDocuments);
    }
  }, [user]);

  const handleAnalyze = async () => {
    if (!jobDescription) {
      setError("Please provide a job description.");
      return;
    }

    if (sourceType === "existing" && !selectedDocId) {
      setError("Please select an existing document.");
      return;
    }

    if (sourceType === "upload" && !localFile) {
      setError("Please upload a resume file.");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const formData = new FormData();
      formData.append("jobDescription", jobDescription);

      if (sourceType === "existing") {
        const selectedDoc = documents.find(d => String(d.id) === selectedDocId);
        if (selectedDoc) {
          formData.append("fileUrl", selectedDoc.downloadUrl);
        }
      } else if (localFile) {
        formData.append("file", localFile);
      }

      const response = await analyzeResumeAction(formData);

      if (response.error) {
        setError(response.error);
      } else {
        setResults(response);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full pt-4 h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight flex items-center gap-3">
          AI Copilot <Sparkles className="w-8 h-8 text-[#0066ff] fill-[#0066ff]/10" />
        </h1>
        <p className="text-slate-500 font-medium">
          Optimize your resume for specific job descriptions using Gemini 1.5 Flash.
        </p>
      </div>

      <div className="flex flex-1 gap-8 overflow-hidden pb-6">
        {/* Left Column: Input */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Document Selection */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0066ff]" /> Select Resume
              </label>

              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setSourceType("existing")}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${sourceType === "existing" ? "bg-white text-[#0066ff] shadow-sm" : "text-slate-500"}`}
                >
                  EXISTING
                </button>
                <button
                  onClick={() => setSourceType("upload")}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${sourceType === "upload" ? "bg-white text-[#0066ff] shadow-sm" : "text-slate-500"}`}
                >
                  UPLOAD
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {sourceType === "existing" ? (
                documents.length === 0 ? (
                  <div className="p-4 text-center border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-sm text-slate-400">No documents found. Upload one in the dashboard.</p>
                  </div>
                ) : (
                  <select
                    value={selectedDocId}
                    onChange={(e) => setSelectedDocId(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 transition-all"
                  >
                    <option value="">Choose an existing document...</option>
                    {documents.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.fileName}</option>
                    ))}
                  </select>
                )
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setLocalFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="w-full p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-sm font-medium flex items-center justify-center gap-3 cursor-pointer hover:border-[#0066ff]/50 hover:bg-[#0066ff]/5 transition-all group"
                  >
                    {localFile ? (
                      <span className="text-[#0066ff] font-bold truncate">{localFile.name}</span>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#0066ff]" />
                        <span className="text-slate-500 group-hover:text-[#0066ff]">Click to upload PDF</span>
                      </>
                    )}
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Job Description Input */}
          <div className="flex-1 bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col">
            <label className="block text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-[#0066ff]" /> Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="flex-1 w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 transition-all resize-none"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !jobDescription || (sourceType === "existing" ? !selectedDocId : !localFile)}
            className="w-full py-4 rounded-2xl bg-[#0066ff] text-white font-bold text-lg shadow-[0_8px_30px_rgb(0,102,255,0.2)] hover:shadow-[0_8px_30px_rgb(0,102,255,0.4)] disabled:bg-slate-200 disabled:shadow-none transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Analyze Resume
              </>
            )}
          </button>
        </div>

        {/* Right Column: Results */}
        <div className="flex-1 bg-slate-50/50 rounded-[32px] border border-slate-200/60 overflow-y-auto custom-scrollbar p-8">
          {!results && !loading && !error && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <div className="w-16 h-16 rounded-3xl bg-slate-200 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">Your AI-powered analysis will appear here.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-[#0066ff] animate-spin mb-4" />
              <p className="text-slate-900 font-bold text-lg">Thinking...</p>
              <p className="text-slate-500 text-sm">Comparing your skills with the job requirements.</p>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
              <div>
                <h4 className="font-bold text-red-900 mb-1">Analysis Failed</h4>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Missing Keywords */}
              <section>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" /> Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.missingKeywords?.map((kw: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-orange-50 text-orange-700 border border-orange-100 rounded-lg text-xs font-bold">
                      {kw}
                    </span>
                  ))}
                </div>
              </section>

              {/* Strengths */}
              <section>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Key Strengths
                </h3>
                <div className="space-y-3">
                  {results.strengths?.map((strength: string, i: number) => (
                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{strength}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Suggestions */}
              <section>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#0066ff]" /> AI Suggestions
                </h3>
                <div className="space-y-3">
                  {results.suggestions?.map((suggestion: string, i: number) => (
                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                        <ChevronRight className="w-3 h-3 text-[#0066ff]" />
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
