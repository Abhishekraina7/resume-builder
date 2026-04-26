"use client";

import { Sparkles, FileText, Plus, X } from "lucide-react";

export default function AICopilotDashboard() {
  return (
    <div className="max-w-4xl mx-auto w-full pt-4 pb-16 flex flex-col items-center font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-10 w-full">
        <div className="w-14 h-14 bg-[#f0f5ff] rounded-full flex items-center justify-center mb-5 border border-blue-100">
          <Sparkles className="w-6 h-6 text-[#0066ff]" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">AI Copilot</h1>
        <p className="text-slate-500 font-medium">
          Upload your resume and a job description to get<br/>personalized recommendations.
        </p>
      </div>

      {/* Upload Zones */}
      <div className="w-full flex flex-col md:flex-row gap-6 mb-6">
        
        {/* Resume Dropzone (Active State) */}
        <div className="flex-1 border-2 border-dashed border-[#0066ff] bg-[#f4f8ff] rounded-[24px] p-8 flex flex-col items-center justify-center relative transition-all group">
          <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 text-[#0066ff]">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-4">Your Resume</h3>
          
          <div className="bg-white border border-slate-200 shadow-sm rounded-full px-4 py-1.5 flex items-center gap-3">
            <FileText className="w-3.5 h-3.5 text-[#0066ff]" />
            <span className="text-xs font-semibold text-slate-700">my_resume.pdf</span>
            <button className="text-slate-400 hover:text-slate-700 transition-colors ml-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Job Description Dropzone (Empty State) */}
        <div className="flex-1 border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-[24px] p-8 flex flex-col items-center justify-center cursor-pointer transition-colors">
          <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">Job Description</h3>
          <p className="text-xs text-slate-500 font-medium">Paste or upload PDF</p>
        </div>

      </div>

      {/* Action Button */}
      <button className="w-full bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-500/20 transition-all active:scale-[0.99] mb-12 text-[15px]">
        Analyze with AI
      </button>

      {/* Analysis Results Card */}
      <div className="w-full bg-white rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Match Score Area */}
        <div className="flex flex-col items-center pt-12 pb-10 px-8">
          {/* Circular Donut Chart */}
          <div className="relative w-32 h-32 mb-6">
            <div 
              className="absolute inset-0 rounded-full"
              style={{ background: `conic-gradient(#0066ff 72%, #f1f5f9 0)` }}
            ></div>
            <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-2xl font-extrabold text-slate-900 leading-tight">72%</span>
              <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Match</span>
            </div>
          </div>
          
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">Strong Candidate Match</h2>
          <p className="text-sm font-medium text-slate-500 text-center max-w-sm">
            Your experience aligns well with 80% of required technical skills.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center px-12 border-y border-slate-100 py-4 bg-slate-50/50">
          <button className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors">
            Missing Keywords
          </button>
          <button className="text-[11px] font-extrabold uppercase tracking-widest text-[#0066ff]">
            Strengths
          </button>
          <button className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors">
            Suggestions
          </button>
        </div>

        {/* Recommendations List */}
        <div className="flex flex-col px-10 py-10 gap-8">
          
          {/* Recommendation 1 */}
          <div className="flex relative pl-5 border-l-[3px] border-red-500">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-red-500">Recommendation 1</span>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                Add "Strategic Financial Planning" to your summary. This keyword is prominent in the job requirements but missing from your profile.
              </p>
            </div>
          </div>

          {/* Recommendation 2 */}
          <div className="flex relative pl-5 border-l-[3px] border-green-500">
            <div className="flex flex-col gap-1 w-full relative">
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-green-500">Recommendation 2</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Verified Strength</span>
              </div>
              <p className="text-sm font-medium text-slate-700 leading-relaxed pr-8">
                Your 5+ years of experience in "Product Lifecycle Management" perfectly matches the senior requirement level.
              </p>
            </div>
          </div>

          {/* Recommendation 3 */}
          <div className="flex relative pl-5 border-l-[3px] border-orange-400">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-orange-400">Recommendation 3</span>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                Quantify your achievements in the "Lead Engineer" role. AI suggests: "Managed a team of 12 and improved deployment efficiency by 24%".
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
