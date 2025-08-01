"use client";
import { Calendar, Home, CreditCard, Settings, LogIn } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/hooks/useAuth";

const loggedInItems = [
  {
    title: "Service Catalog",
    url: "/customer",
    icon: Home,
  },
  {
    title: "My Bookings",
    url: "/customer/bookings",
    icon: Calendar,
  },
  {
    title: "Payments",
    url: "/customer/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/customer/settings",
    icon: Settings,
  },
];

const loggedOutItems = [
  {
    title: "Service Catalog",
    url: "/customer",
    icon: Home,
  },
  {
    title: "Log In",
    url: "/login",
    icon: LogIn,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  // check if user is logged in
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // render different sidebar options if they are logged in
  const sidebarItems = isLoggedIn ? loggedInItems : loggedOutItems;

  return (
    <SidebarProvider>
      <AppSidebar
        items={sidebarItems}
        loggedIn={isLoggedIn}
        title="Suzy's Cleaning"
      />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
