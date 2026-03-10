"use client";

import { AppSidebar, SidebarWrapper } from "@/components/app-sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="">
            <SidebarWrapper>
                <AppSidebar />
                <div className="">{children}</div>
            </SidebarWrapper>
        </main>
    );
}
