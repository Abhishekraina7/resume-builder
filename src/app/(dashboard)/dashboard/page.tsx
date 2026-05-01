"use client";

import { useAuth } from "@/context/AuthContext";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentResumes } from "@/components/dashboard/RecentResumes";
import { UploadedDocuments } from "@/components/dashboard/UploadedDocuments";

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.email?.split("@")[0] || "Arjun";

  return (
    <div className="max-w-5xl mx-auto w-full pt-4">
      {/* Header Greeting */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Good morning, {firstName} <span className="inline-block origin-[70%_70%] animate-[wave_2.5s_infinite]">👋</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Here's what's happening with your resumes.
        </p>
      </div>

      <QuickActions />
      <RecentResumes />
      <UploadedDocuments />
    </div>
  );
}
