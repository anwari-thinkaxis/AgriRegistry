import { LayoutDashboard, Tractor, NotepadText, Plus } from "lucide-react"

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
} from "../../components/ui/sidebar"
import { jwtDecode } from 'jwt-decode';
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import AuthStore from "../../utils/stores/AuthStore";
import { observer } from 'mobx-react-lite';

interface DecodedToken {
    sub: string;  // User ID
    email: string;  // User Email
    role: string;  // User Role
}

const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
    },
    {
        title: "My Farms",
        url: "#",
        icon: Tractor,
    },
    {
        title: "Reports",
        url: "#",
        icon: NotepadText,
    },
]

export const AppSidebar = observer(() => {
    let decodedToken: DecodedToken | null = null;
    if (AuthStore.token) {
        try {
            decodedToken = jwtDecode<DecodedToken>(AuthStore.token);
        } catch (error) {
            console.error('Token decode error:', error);
        }
    }

    const handleSignOut = () => {
        AuthStore.handleClearToken();
        window.location.href = '/auth/login';
    };

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
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <div className="flex items-center justify-center w-6 h-6">
                                                <item.icon className="w-full h-full" />
                                            </div>
                                            <h6 className="pl-3">{item.title}</h6>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <Button>
                                <Plus />
                                <h6>New Report</h6>
                            </Button>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {AuthStore.token ? (
                    <p>Logged in as: {decodedToken?.email || "Unknown User"}</p>
                ) : (
                    <Button>Not logged in</Button>
                )}
                {AuthStore.token && (
                    <Button onClick={handleSignOut}>
                        Sign Out
                    </Button>
                )}
            </SidebarFooter>
        </Sidebar>
    )
});