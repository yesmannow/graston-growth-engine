"use client";

import { Link, NavLink } from "react-router-dom";
import { Gem, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NotificationBell from "./NotificationBell";
import CommandPaletteShortcut from "./CommandPaletteShortcut";
import { useAuthStore, AuthState } from "@/store/auth";

const navItems = [
  { href: "/directory", label: "Find a Provider" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/support", label: "Support" },
];

const Header = () => {
  const isAdmin = useAuthStore((s: AuthState) => s.isAdmin);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      {/* ... */}
    </header>
  );
};

export default Header;