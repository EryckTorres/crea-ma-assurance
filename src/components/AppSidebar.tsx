import {
  LayoutDashboard, Upload, FileText, ListChecks, BarChart3, Settings, Search, Activity, Shield, LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: { group: string; items: NavItem[] }[] = [
  {
    group: "Profissional",
    items: [
      { title: "Painel", url: "/dashboard", icon: LayoutDashboard, roles: ["professional"] },
      { title: "Enviar CAT", url: "/upload", icon: Upload, roles: ["professional"] },
      { title: "Meus Processos", url: "/my-processes", icon: FileText, roles: ["professional"] },
    ],
  },
  {
    group: "Fiscal",
    items: [
      { title: "Fila de Processos", url: "/processes", icon: ListChecks, roles: ["analyst"] },
      { title: "Analytics", url: "/analytics", icon: BarChart3, roles: ["analyst", "admin"] },
    ],
  },
  {
    group: "Admin",
    items: [
      { title: "Configurações", url: "/settings", icon: Settings, roles: ["admin"] },
      { title: "Saúde do Sistema", url: "/system-health", icon: Activity, roles: ["admin"] },
    ],
  },
  {
    group: "Ferramentas",
    items: [
      { title: "Busca Semântica", url: "/search", icon: Search, roles: ["professional", "analyst", "admin"] },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, logout } = useAuth();

  if (!user) return null;

  const filteredGroups = navItems
    .map((g) => ({ ...g, items: g.items.filter((i) => i.roles.includes(user.role)) }))
    .filter((g) => g.items.length > 0);

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar text-sidebar-foreground">
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm">
            CR
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sidebar-accent-foreground text-sm tracking-wide">CREA-MA</span>
              <span className="text-[10px] text-sidebar-muted-foreground">Verificação de CAT</span>
            </div>
          )}
        </div>

        {filteredGroups.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="text-sidebar-muted-foreground text-[10px] uppercase tracking-widest px-4">
              {!collapsed && group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <NavLink
                        to={item.url}
                        end
                        className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-sidebar border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="h-7 w-7 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
              <Shield className="h-3.5 w-3.5 text-sidebar-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-sidebar-accent-foreground">{user.name}</span>
              <span className="text-[10px] text-sidebar-muted-foreground capitalize">{user.role}</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "sm"}
          className="w-full text-sidebar-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sair</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
