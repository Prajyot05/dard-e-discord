import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="h-8 flex justify-center fixed top-0 w-full text-accent-foreground border-b border-sidebar-border bg-[#f2f3f5] dark:bg-[#121214]">
        TODO
      </div>
      <div className="pt-8 hidden md:flex h-full w-18 z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="pt-8 md:pl-18 h-full">{children}</main>
    </div>
  );
}
