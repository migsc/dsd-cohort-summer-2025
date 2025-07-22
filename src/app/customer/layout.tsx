import { Calendar, Home, CreditCard, Settings, LogOut } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import PortalHeader from '@/components/ui/custom/portalHeader';

const customerItems = [
  {
    title: 'Service Catalog',
    url: './dummy',
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
  },
  {
    title: 'Logout',
    url: '/',
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
      <AppSidebar items={customerItems} title='CleanHub Customer Portal'/>
      <main>
        <SidebarTrigger />
        <PortalHeader logoSrc='https://placehold.co/50x50' logoAlt='logo' businessName='Suzys Cleaning'></PortalHeader>
        {children}
      </main>
    </SidebarProvider>
  );
};