import { auth } from "@/auth";
import { AppSidebar } from "@/components/dashboard-ui/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "leaflet/dist/leaflet.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    // Redirect to login page if not authenticated
    return <div>Redirecting to login...</div>;
  }

  const userName = session.user?.name || "Guest";
  const avatarImage = session.user?.image as string;
  return (
    <SidebarProvider>
      <AppSidebar userName={userName} avatarImage={avatarImage} />
      <main className="flex h-screen w-full bg-teal-50 ">
        <SidebarTrigger />
        <section className="flex flex-1 w-full">{children}</section>
      </main>
    </SidebarProvider>
  );
}
