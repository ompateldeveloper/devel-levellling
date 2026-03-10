"use client";

import { cn } from "@/lib/utils";
import { Button, Slider } from "@base-ui/react";
import { LayoutDashboard, FolderKanban, CheckSquare, Users, Settings } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { UserCard } from "./user-card";
interface Item {
    title: string;
    url: string;
    icon: any;
}
const items: Item[] = [
    {
        title: "[SYSTEM]",
        url: "/interface",
        icon: LayoutDashboard,
    },
    {
        title: "[DUNGEONS]",
        url: "/interface/projects",
        icon: FolderKanban,
    },
    {
        title: "[QUESTS]",
        url: "/interface/tasks",
        icon: CheckSquare,
    },
    {
        title: "[GUILDS]",
        url: "/interface/teams",
        icon: Users,
    },
    {
        title: "[SETTINGS]",
        url: "/interface/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const [index, setIndex] = React.useState(0);
    const handleSetIndex = (index: number) => {
        setIndex(index);
    };
    return (
        <Sidebar>
            <UserCard
                className="my-8"
                name="Sang jin woo"
                avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <SidebarContent>
                <SidebarMenu index={index}>
                    {items.map((item, i) => (
                        <SidebarMenuItem key={item.title} item={item} active={index === i} onClick={() => handleSetIndex(i)} />
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}

const Sidebar = ({ children }: { children: ReactNode }) => {
    return <div className="min-h-screen min-w-64 flex flex-col">{children}</div>;
};
const SidebarContent = ({ children }: { children: ReactNode }) => {
    return <div className="">{children}</div>;
};

const SidebarMenu = ({ children, index }: { children: ReactNode; index: number }) => {
    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col flex-1 h-full pl-4 m-0">{children}</div>
            <div className="relative flex justify-center w-3 -translate-0.5">
                <div className="absolute flex items-center justify-center transition-all duration-300 ease-in-out h-12" style={{ top: `calc(var(--spacing) * ${index * 12})` }}>
                    <div className="absolute h-12 bg-cyan-500 w-0.5 blur-[1px]"></div>
                    <div className="absolute w-2 h-2 bg-cyan-500 rotate-45 origin-center translate-x-0"></div>
                </div>
                <div className="w-0.5 h-full bg-radial from-cyan-500/30 to-cyan-500/10"></div>
            </div>
        </div>
    );
};
export const SidebarWrapper = ({ children }: { children: ReactNode[] }) => {
    return <div className="flex min-h-screen w-full">{children}</div>;
};
const SidebarMenuItem = ({ item, active = false, onClick, ...props }: { item: Item; active?: boolean; onClick?: () => void }) => {
    return (
        <Link href={item.url} onClick={onClick} className="w-full cursor-pointer group">
            <Button
                className={cn(
                    "h-12 flex items-center gap-4 w-full px-6 border-l-2 transition-all duration-300 group-hover:text-cyan-500 group-hover:text-shadow-cyan-500 text-shadow-xs",
                    active ? "border-cyan-500 text-cyan-500  bg-cyan-500/5" : "border-transparent",
                )}
                type="button"
                {...props}
            >
                <item.icon className={cn("h-5 w-5 transition-transform duration-300", active && "scale-110")} />
                <div className="relative">
                    <span className={cn("font-medium", active ? "border-cyan-500 text-cyan-500 text-shadow-cyan-500 bg-cyan-500/5" : "border-transparent")}>{item.title}</span>
                    <span className="absolute inset-0 translate-y-[2px] opacity-50 font-medium">{item.title}</span>
                </div>
            </Button>
        </Link>
    );
};
