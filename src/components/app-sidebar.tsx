import { Calendar, Home, CreditCard, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items if logged in
const items = [
  {
    title: "Service Catalog",
    url: "./dummy",
    icon: Home,
  },
  {
    title: "My Bookings",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Invoices",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CleanHub Client Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}