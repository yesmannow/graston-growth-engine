"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  defaultCollapsed?: boolean;
}

export function Sidebar({
  children,
  className,
  defaultCollapsed = false,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={cn(
        "group relative h-full transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="h-full overflow-y-auto border-r bg-background px-3 py-4">
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm"
          >
            {collapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

// Add missing exports
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-screen">{children}</div>;
};

export const SidebarInset = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1 flex flex-col">{children}</div>;
};

export const SidebarTrigger = ({ className }: { className?: string }) => {
  return (
    <button className={cn("p-2 hover:bg-accent rounded-md", className)}>
      <ChevronRight className="h-4 w-4" />
    </button>
  );
};