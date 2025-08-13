"use client";

import { Link, NavLink } from "react-router-dom";
import { Gem, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import NotificationBell from "./NotificationBell";
import CommandPaletteShortcut from "./CommandPaletteShortcut";

const navItems = [
  { href: "/directory", label: "Find a Provider" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/onboarding", label: "Onboarding" },
  { href: "/support", label: "Support" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Gem className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            Graston Provider Directory
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-end space-x-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button asChild>
            <Link to="/provider/1">Dashboard</Link>
          </Button>
          <NotificationBell />
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Gem className="h-6 w-6 text-primary" />
                  <span className="sr-only">Graston Directory</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                 <Button asChild>
                    <Link to="/provider/1">Dashboard</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <CommandPaletteShortcut />
      </div>
    </header>
  );
};

export default Header;