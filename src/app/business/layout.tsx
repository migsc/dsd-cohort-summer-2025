import {
  Calendar,
  CreditCard,
  Settings,
  Users,
  FolderKanban,
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const businessItems = [
  {
    title: "Calendar",
    url: "/business",
    icon: Calendar,
  },
  {
    title: "Review Appointments",
    url: "/business/appointments",
    icon: FolderKanban,
  },
  {
    title: "Payments",
    url: "/business/payments",
    icon: CreditCard,
  },
  {
    title: "Customer List",
    url: "/business/customers",
    icon: Users,
  },
  {
    title: "Configure Business",
    url: "/business/configuration",
    icon: Settings,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar
        items={businessItems}
        title="Suzys Cleaning Business Portal"
        loggedIn={true}
      />
      <SidebarTrigger />
      <main className="mt-5 w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
