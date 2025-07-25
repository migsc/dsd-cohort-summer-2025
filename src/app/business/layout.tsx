import { Calendar, CreditCard, Settings, LogOut, Users, FolderKanban } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const businessItems = [
  {
    title: "Calendar",
    url: "/business/",
    icon: Calendar,
  },
  {
    title: "Review Appointments",
    url: "#",
    icon: FolderKanban,
  },
  {
    title: "Payments",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Client List",
    url: "#",
    icon: Users,
  },
  {
    title: "Configure Business",
    url: "#",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar items={businessItems} title="CleanHub Business Portal" />
      <SidebarTrigger />
      <main className="mt-5 w-full">{children}</main>
    </SidebarProvider>
  );
}
