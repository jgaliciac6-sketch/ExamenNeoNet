import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { getSession } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar username={session?.usrNombre} />
        <SidebarInset className="min-w-0 flex-1 bg-background">
          <Header username={session?.usrNombre} />
          <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
