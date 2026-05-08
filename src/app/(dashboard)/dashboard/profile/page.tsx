"use client";

import { useAuth } from "@/context/AuthContext";
import { Copy, Navigation, Plus, FileText, Pencil, Crown, FileCode2, ExternalLink } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || "Arjun Sharma";
  const email = user?.email || "arjun@email.com";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-5xl mx-auto w-full pb-16 font-sans">

      {/* Top Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200 mb-12">
        <button className="pb-4 pt-2 text-sm font-bold text-slate-900 border-b-2 border-[#0066ff]">
          Overview
        </button>
        <button className="pb-4 pt-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          Documents
        </button>
        <button className="pb-4 pt-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          Resumes
        </button>
        <button className="pb-4 pt-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          Settings
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-12">
        <div className="relative w-24 h-24 rounded-full bg-[#f1f5f9] flex items-center justify-center text-3xl font-extrabold text-slate-700 shadow-sm mb-4">
          {initials}
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#0066ff] hover:bg-slate-50 transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">{fullName}</h1>
        <p className="text-slate-500 font-medium">{email}</p>

        <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-[#f0f5ff] text-[#0066ff] rounded-full text-[11px] font-extrabold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5" />
          PRO PLAN
        </div>
      </div>

      {/* Personal Info Card */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">Personal Info</h2>
          <button className="flex items-center gap-2 text-sm font-bold text-[#0066ff] hover:text-[#0055cc] transition-colors">
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</p>
            <p className="font-semibold text-slate-900 text-sm">{fullName}</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</p>
            <p className="font-semibold text-slate-900 text-sm">{email}</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Location</p>
            <p className="font-semibold text-slate-900 text-sm">San Francisco, CA</p>
          </div>
        </div>
      </div>

      {/* Split Cards Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

        {/* Generated Resumes */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Generated Resumes</h2>
            <button className="text-sm font-bold text-[#0066ff] hover:text-[#0055cc] transition-colors">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-14 bg-[#f1f5f9] rounded-xl shrink-0 group-hover:bg-[#e2e8f0] transition-colors"></div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-0.5">Software Engineer - 2024</h3>
                <p className="text-[11px] font-medium text-slate-400">Modified Oct 12, 2023</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-14 bg-[#f1f5f9] rounded-xl shrink-0 group-hover:bg-[#e2e8f0] transition-colors"></div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-0.5">Senior Product Designer</h3>
                <p className="text-[11px] font-medium text-slate-400">Modified Sep 28, 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Uploaded Documents</h2>
            <button className="w-8 h-8 rounded-full bg-[#0066ff] text-white flex items-center justify-center hover:bg-[#0055cc] transition-colors shadow-md shadow-blue-500/20 shadow-sm">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#fef2f2] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-0.5">Portfolio_v2.pdf</h3>
                <p className="text-[11px] font-medium text-slate-400">Oct 05 • 2.4 MB</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#f0f5ff] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#0066ff]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-0.5">Recommendation...</h3>
                <p className="text-[11px] font-medium text-slate-400">Sep 30 • 45 KB</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#fef2f2] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-0.5">Cert_Cloud.pdf</h3>
                <p className="text-[11px] font-medium text-slate-400">Aug 12 • 1.1 MB</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="text-center text-xs font-semibold text-slate-400">
        Last synced: 2 minutes ago
      </div>
    </div>
  );
}
