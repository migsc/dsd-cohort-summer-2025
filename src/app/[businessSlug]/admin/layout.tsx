import {
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  Users,
  FolderKanban,
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    businessSlug: string;
  }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { businessSlug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized.");
    redirect("/");
  }

  const userId = session.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
        business: {
          where: {
            businessSlug: businessSlug,
          },
          select: { id: true, businessName: true, businessSlug: true },
        },
      },
    });

    if (!user) {
      console.log("User was not found.");
      redirect(`/`);
    }

    const userRole = user.role;

    if (userRole !== "business") {
      console.log("User is not associated as admin of this business.");
      redirect(`/`);
    }
  } catch (error) {
    console.log(error);
    redirect(`/`);
  }

  const businessItems = [
    {
      title: "Calendar",
      url: `/${businessSlug}/admin`,
      icon: Calendar,
    },
    {
      title: "Review Appointments",
      url: `/${businessSlug}/admin/appointments`,
      icon: FolderKanban,
    },
    {
      title: "Payments",
      url: `/${businessSlug}/admin/payments`,
      icon: CreditCard,
    },
    {
      title: "Customer List",
      url: `/${businessSlug}/admin/customers`,
      icon: Users,
    },
    {
      title: "Configure Business",
      url: `/${businessSlug}/admin/configuration`,
      icon: Settings,
    },
  ];
  return (
    <SidebarProvider>
      <AppSidebar items={businessItems} title={businessSlug} loggedIn={true} />
      <SidebarTrigger />
      <main className="mt-5 w-full">{children}</main>
    </SidebarProvider>
  );
}
