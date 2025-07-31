'use client';
import { Calendar, Home, CreditCard, Settings, LogIn } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import PortalHeader from '@/components/ui/custom/portalHeader';
import { useAuth } from '@/hooks/useAuth'; 

const loggedInItems = [
  {
    title: 'Service Catalog',
    url: '/customer',
    icon: Home,
  },
  {
    title: 'My Bookings',
    url: '/customer/bookings',
    icon: Calendar,
  },
  {
    title: 'Invoices',
    url: '/customer/invoices',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    url: '/customer/settings',
    icon: Settings,
  }
];

const loggedOutItems = [
  {
    title: 'Service Catalog',
    url: '/customer',
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
  const { isLoggedIn, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // render different sidebar options if they are logged in
  const sidebarItems = isLoggedIn ? loggedInItems : loggedOutItems;

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} loggedIn={isLoggedIn} title='CleanHub Customer Portal'/>
      <main className='w-full'>
        <SidebarTrigger />
        <PortalHeader logoSrc='https://placehold.co/50x50' logoAlt='logo' businessName='Suzys Cleaning'></PortalHeader>
        {children}
      </main>
    </SidebarProvider>
  );
};