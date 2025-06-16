import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Home, Mail, Calendar, Search, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navAnalytics = [
  // { name: "Dashboard", icon: <Home className="w-4 h-4 mr-2" />, path: "/" },
  { name: "Users", icon: <Mail className="w-4 h-4 mr-2" />, path: "/users" },
  {
    name: "Appointment",
    icon: <Calendar className="w-4 h-4 mr-2" />,
    path: "/appointment",
  },
  {
    name: "Doctors",
    icon: <Search className="w-4 h-4 mr-2" />,
    path: "/doctors",
  },
  {
    name: "Article",
    icon: <Settings className="w-4 h-4 mr-2" />,
    path: "/article",
  },
];

const navServices = [
  // { name: "Dashboard", icon: <Home className="w-4 h-4 mr-2" />, path: "/" },
  { name: "Users", icon: <Mail className="w-4 h-4 mr-2" />, path: "/users" },
  {
    name: "Appointment",
    icon: <Calendar className="w-4 h-4 mr-2" />,
    path: "/appointment",
  },
  {
    name: "Doctors",
    icon: <Search className="w-4 h-4 mr-2" />,
    path: "/doctors",
  },
  {
    name: "Article",
    icon: <Settings className="w-4 h-4 mr-2" />,
    path: "/article",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 py-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase mb-2 tracking-wide">
            HEALTHMATE-ADMIN
          </h2>
          <div className="space-y-1">
            {navAnalytics.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  )
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </SidebarContent>
      {/* <SidebarContent>
        <div className="px-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase mb-2 tracking-wide">
            Services
          </h2>
          <div className="space-y-1">
            {navAnalytics.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  )
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </SidebarContent> */}
    </Sidebar>
  );
}
