import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopNav } from "@/components/layout/DashboardTopNav";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-white text-slate-900 font-sans">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden relative">
          <DashboardTopNav />
          <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
