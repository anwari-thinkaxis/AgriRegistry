import {
  LayoutDashboard,
  Tractor,
  NotepadText,
  Plus,
  Shield,
  Bean,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "../../components/ui/sidebar";
import { jwtDecode } from "jwt-decode";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import AuthStore from "../../utils/stores/AuthStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { useNavigate } from "react-router";

interface DecodedToken {
  sub: string; // User ID
  email: string; // User Email
  role: string; // User Role
}

const baseItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "My Farms",
    url: "/farms",
    icon: Tractor,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: NotepadText,
  },
  {
    title: "Produces",
    url: "/produces",
    icon: Bean,
  },
];

const adminItems = [
  {
    title: "Locations",
    url: "/locations",
    icon: Shield,
  },
];

export const AppSidebar = observer(() => {
  const navigate = useNavigate();
  let decodedToken: DecodedToken | null = null;

  if (AuthStore.token) {
    try {
      decodedToken = jwtDecode<DecodedToken>(AuthStore.token);
    } catch (error) {
      console.error("Token decode error:", error);
    }
  }

  const handleSignOut = () => {
    AuthStore.handleClearToken();
    navigate("/auth/login");
  };

  const isAdmin = decodedToken?.role === "Admin";
  const items = isAdmin ? [...baseItems, ...adminItems] : baseItems;

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton>
          <h4>Agri Registry</h4>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              <SidebarGroupLabel>
                <span>Navigation</span>
              </SidebarGroupLabel>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <div className="flex items-center justify-center w-6 h-6">
                        <item.icon className="w-full h-full" />
                      </div>
                      <h6 className="pl-3">{item.title}</h6>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Button type="button" className="rounded-3xl">
                <Plus />
                <h6>New Report</h6>
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {AuthStore.token ? (
          <p>{decodedToken?.email || "Unknown User"}</p>
        ) : (
          <Button>Not logged in</Button>
        )}
        {AuthStore.token && <Button onClick={handleSignOut}>Sign Out</Button>}
      </SidebarFooter>
    </Sidebar>
  );
});
