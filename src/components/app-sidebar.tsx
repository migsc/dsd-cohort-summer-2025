import Link from "next/link";
import Logout from "./logout";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
};

interface AppSidebarProps {
  items: SidebarItem[];
  title?: string;
  loggedIn: boolean;
}

export function AppSidebar({
  items,
  title = "CleanHub Portal",
  loggedIn,
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {loggedIn && (
        <div className="mb-4 text-center">
          <Logout />
        </div>
      )}
    </Sidebar>
  );
}
