import { DashboardHeader } from "@/components/layout/header/dashboard-header";
import { DashboardNavbar } from "@/components/layout/navbar/dashboard-navbar";
import { DashboardSidebar } from "@/components/layout/sidebar/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const role = "student";
  const first_name = "Youssef";
  const last_name = "El Sayed";

  const { locale } = await params;
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar userRole={role} locale={locale} />

        <div className="flex w-full flex-1 flex-col overflow-hidden">
          <DashboardHeader
            userName={`${first_name} ${last_name}`}
            userRole={role}
            locale={locale}
          />

          <div className="flex flex-1 flex-col overflow-auto">
            <DashboardNavbar />

            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
