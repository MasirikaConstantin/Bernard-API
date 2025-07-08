import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ContactRound, DollarSign, Euro, Folder, LayoutGrid, MonitorCheck } from 'lucide-react';
import AppLogo from './app-logo';
import { title } from 'process';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title : "Controlleurs",
        href : "/controlleurs",
        icon : ContactRound
    },
    {
        title : "Agents",
        href : "/agents",
        icon : ContactRound
    },
    {
        title : "Motocyclistes",
        href : "/motocyclistes",
        icon : ContactRound
    },
    {
        title :"Tarifs",
        href : 'tarifs',
        icon: Euro
    },
    {
        title : "Taxes",
        href : "/taxes",
        icon : BookOpen
    },
    {
        title : "Soldes",
        href : "/soldes",
        icon : DollarSign
    },
   
];



export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
