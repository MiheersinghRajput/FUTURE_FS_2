import { Outlet } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[image:var(--gradient-subtle)]">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-10 px-3 sm:px-4">
            <div className="flex items-center gap-2 min-w-0">
              <SidebarTrigger />
              <h1 className="font-semibold text-sm sm:text-base truncate">
                Client Lead Management System
              </h1>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20 shrink-0">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logged in as Admin</span>
              <span className="sm:hidden">Admin</span>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
