import { Calendar, Home, CreditCard, Settings, LogIn } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import PortalHeader from "@/components/ui/custom/portalHeader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    businessSlug: string;
  }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  // check if user is logged in
  const session = await auth.api.getSession({ headers: await headers() });
  const { businessSlug } = await params;

  let business;
  try {
    business = await prisma.business.findUnique({
      where: {
        businessSlug: businessSlug,
      },
    });

    if (!business) {
      // console.log("Business not found.");
      redirect("/");
    }
  } catch (error) {
    // console.log("Error getting business: ", error);
    redirect("/");
  }

  const loggedInItems = [
    {
      title: "Service Catalog",
      url: `/${businessSlug}`,
      icon: Home,
    },
    {
      title: "My Bookings",
      url: `/${businessSlug}/bookings`,
      icon: Calendar,
    },
    {
      title: "Payments",
      url: `/${businessSlug}/payments`,
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: `/${businessSlug}/settings`,
      icon: Settings,
    },
  ];

  const loggedOutItems = [
    {
      title: "Service Catalog",
      url: `/${businessSlug}`,
      icon: Home,
    },
    {
      title: "Log In",
      url: `/login?business=${businessSlug}`,
      icon: LogIn,
    },
  ];

  if (!session || !session.user || !session.user.id) {
    return (
      <SidebarProvider>
        <AppSidebar
          items={loggedOutItems}
          loggedIn={false}
          title="CleanHub Customer Portal"
        />
        <main className="w-full">
          <SidebarTrigger />
          {/* <PortalHeader
            logoSrc="https://placehold.co/50x50"
            logoAlt="logo"
            businessName={businessSlug}
          ></PortalHeader> */}
          {children}
        </main>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar
        items={loggedInItems}
        loggedIn={true}
        title="CleanHub Customer Portal"
      />
      <main className="w-full">
        <SidebarTrigger />
        {/* <PortalHeader
          logoSrc="https://placehold.co/50x50"
          logoAlt="logo"
          businessName={business.businessName}
        ></PortalHeader> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
