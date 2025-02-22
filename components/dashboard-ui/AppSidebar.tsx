import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  LogOutIcon,
  Settings,
} from "lucide-react";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Collapsible } from "../ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Button } from "../ui/button";
import { signOut } from "@/auth";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: Inbox,
  },
  {
    title: "P1",
    url: "/payments1",
    icon: Calendar,
  },

  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({
  userName,
  avatarImage,
}: {
  userName: string;
  avatarImage: string;
}) {
  return (
    <Sidebar>
      <SidebarHeader className="flext justify-center items-center">
        <section className="flex  flex-row items-center justify-between p-4">
          <Avatar className="size-11">
            <AvatarImage src={avatarImage} className="ronded-full size-15" />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="outline">
              <LogOutIcon />
            </Button>
          </form>
        </section>
        <h4>{userName}</h4>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Dashboards
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
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
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Testing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Calendar />
                    <span>Addititional</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>24</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
