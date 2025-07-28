'use client';
import { Calendar, Home, CreditCard, Settings, LogIn } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import PortalHeader from '@/components/ui/custom/portalHeader';
import { authClient } from "@/lib/auth-client";

const loggedInItems = [
  {
    title: 'Service Catalog',
    url: 'customer/',
    icon: Home,
  },
  {
    title: 'My Bookings',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Invoices',
    url: '#',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  }
];

const loggedOutItems = [
  {
    title: 'Service Catalog',
    url: './dummy',
    icon: Home,
  },
  {
    title: 'Log In',
    url: '/login',
    icon: LogIn,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // check if user is logged in
  const { data: session } = authClient.useSession();

  // render different sidebar options if they are logged in
  const sidebarItems = session ? loggedInItems : loggedOutItems;
  const loggedIn = session ? true : false;

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} loggedIn={loggedIn} title='CleanHub Customer Portal'/>
      <main className='w-full'>
        <SidebarTrigger />
        <PortalHeader logoSrc='https://placehold.co/50x50' logoAlt='logo' businessName='Suzys Cleaning'></PortalHeader>
        {children}
      </main>
    </SidebarProvider>
  );
};