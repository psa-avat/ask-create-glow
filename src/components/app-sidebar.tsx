import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Plane,
  Calendar,
  ShoppingCart,
  Plug,
  BarChart3,
  Settings,
  PlaneTakeoff,
  BookOpen,
  CreditCard,
  Package,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRole } from "@/lib/role-context";

const opsNav = [
  { title: "Daily Operations", url: "/", icon: LayoutDashboard },
  { title: "Members", url: "/members", icon: Users },
  { title: "Finance", url: "/finance", icon: Wallet },
  { title: "Assets & Availability", url: "/assets", icon: Plane },
  { title: "Planning", url: "/planning", icon: Calendar },
  { title: "Sales & Suppliers", url: "/sales", icon: ShoppingCart },
];

const opsAdmin = [
  { title: "Integrations", url: "/integrations", icon: Plug },
  { title: "Reporting", url: "/reporting", icon: BarChart3 },
  { title: "Administration", url: "/administration", icon: Settings },
];

const memberNav = [
  { title: "Mon tableau de bord", url: "/portal", icon: LayoutDashboard },
  { title: "Logbook", url: "/portal/logbook", icon: BookOpen },
  { title: "Mon compte", url: "/portal/account", icon: CreditCard },
  { title: "Mes packs", url: "/portal/packs", icon: Package },
  { title: "Disponibilités", url: "/portal/availability", icon: Plane },
];

export function AppSidebar() {
  const { role } = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(url + "/"));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <PlaneTakeoff className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">ERP CLUB</span>
            <span className="text-[11px] text-sidebar-foreground/60">Aéroclub Vol à Voile</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {role === "operations" ? (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Opérations</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {opsNav.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Administration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {opsAdmin.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>Espace pilote</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {memberNav.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground">
            JM
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium text-sidebar-foreground">Jean Moreau</span>
            <span className="text-[10px] text-sidebar-foreground/60">Administrateur</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
