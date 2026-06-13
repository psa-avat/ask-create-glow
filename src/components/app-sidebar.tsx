import { Link, useRouterState } from "@tanstack/react-router";
import { PlaneTakeoff, ChevronRight } from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useRole } from "@/lib/role-context";
import { navSections, memberNav, type NavSection } from "@/lib/navigation";

function isParentActive(pathname: string, section: NavSection) {
  if (section.to === "/") return pathname === "/";
  return pathname === section.to || pathname.startsWith(section.to + "/");
}

export function AppSidebar() {
  const { role } = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash ?? "" });

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
          <SidebarGroup>
            <SidebarGroupLabel>Opérations</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navSections.map((section) => {
                  const active = isParentActive(pathname, section);
                  const Icon = section.icon;
                  return (
                    <SidebarMenuItem key={section.to}>
                      <SidebarMenuButton asChild isActive={active} tooltip={section.label}>
                        <Link to={section.to}>
                          <Icon />
                          <span>{section.label}</span>
                          {section.children?.length ? (
                            <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-50 group-data-[collapsible=icon]:hidden" />
                          ) : null}
                        </Link>
                      </SidebarMenuButton>
                      {active && section.children?.length ? (
                        <SidebarMenuSub>
                          {section.children.map((child) => {
                            const [path, anchor] = child.to.split("#");
                            const isChildActive =
                              pathname === path && (anchor ? hash === `#${anchor}` || hash === anchor : !hash);
                            const ChildIcon = child.icon;
                            return (
                              <SidebarMenuSubItem key={child.to}>
                                <SidebarMenuSubButton asChild isActive={isChildActive}>
                                  <Link
                                    to={path}
                                    hash={anchor || undefined}
                                  >
                                    {ChildIcon ? <ChildIcon className="h-3.5 w-3.5" /> : null}
                                    <span>{child.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      ) : null}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>Espace pilote</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {memberNav.map((item) => {
                  const active =
                    item.to === "/portal"
                      ? pathname === "/portal" || pathname === "/portal/"
                      : pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                        <Link to={item.to}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
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
