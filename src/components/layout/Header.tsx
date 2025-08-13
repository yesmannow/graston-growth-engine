"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Gem, Menu, LayoutDashboard, Rocket, Edit, Eye, Users, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NotificationBell from "./NotificationBell";
import CommandPaletteShortcut from "./CommandPaletteShortcut";
import ListItem from "./ListItem";

const adminComponents: { title: string; href: string; description: string, icon: React.ElementType }[] = [
  {
    title: "Dashboard",
    href: "/admin",
    description: "Get a high-level overview of directory performance and key metrics.",
    icon: LayoutDashboard,
  },
  {
    title: "Providers",
    href: "/admin/providers",
    description: "Manage provider accounts, tiers, and verification status.",
    icon: Users,
  },
  {
    title: "AI Assistant",
    href: "/admin/ai-assistant",
    description: "Configure and monitor AI-powered tools and automations.",
    icon: Bot,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    description: "Dive deep into user engagement and platform growth data.",
    icon: BarChart3,
  },
];

const providerComponents: { title: string; href: string; description: string, icon: React.ElementType }[] = [
    {
      title: "My Dashboard",
      href: "/provider/1/dashboard",
      description: "Track your profile performance, leads, and ROI.",
      icon: LayoutDashboard,
    },
    {
      title: "Marketing Toolkit",
      href: "/provider/1/toolkit",
      description: "Access AI-powered tools to grow your practice.",
      icon: Rocket,
    },
    {
      title: "Edit My Profile",
      href: "/update-profile",
      description: "Keep your information up-to-date for patients.",
      icon: Edit,
    },
    {
      title: "View Public Profile",
      href: "/directory/provider/1",
      description: "See what patients see when they view your profile.",
      icon: Eye,
    },
  ];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Gem className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            Graston Directory
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Find a Provider
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/for-providers" className={navigationMenuTriggerStyle()}>
                  For Providers
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-4">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/about"
                      >
                        <Gem className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          About Our Mission
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Learn about our commitment to connecting patients with the best care.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/what-is-graston-technique" title="What is Graston Technique®?">
                    A comprehensive guide for patients new to GT.
                  </ListItem>
                  <ListItem href="/faq" title="FAQ">
                    Find answers to common questions from patients and providers.
                  </ListItem>
                  <ListItem href="/onboarding" title="Onboarding Guide">
                    New to the directory? Start here to get the most out of your profile.
                  </ListItem>
                  <ListItem href="/support" title="Contact Support">
                    Get help with your profile, billing, or any other questions.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {adminComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      <div className="flex items-start gap-2">
                        <component.icon className="h-4 w-4 mt-1 flex-shrink-0" />
                        <p className="text-sm leading-snug text-muted-foreground">{component.description}</p>
                      </div>
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Provider Hub</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {providerComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      <div className="flex items-start gap-2">
                        <component.icon className="h-4 w-4 mt-1 flex-shrink-0" />
                        <p className="text-sm leading-snug text-muted-foreground">{component.description}</p>
                      </div>
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <CommandPaletteShortcut />
            <NotificationBell />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold mb-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Gem className="h-6 w-6 text-primary" />
                    <span>Graston Directory</span>
                  </Link>
                  <Link to="/" className="hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    Find a Provider
                  </Link>
                  <Link to="/for-providers" className="hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                    For Providers
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="resources">
                      <AccordionTrigger className="text-lg font-medium">Resources</AccordionTrigger>
                      <AccordionContent className="pl-4">
                        <div className="grid gap-4 text-base">
                          <Link to="/about" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                          <Link to="/what-is-graston-technique" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>What is GT®?</Link>
                          <Link to="/faq" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
                          <Link to="/onboarding" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Onboarding</Link>
                          <Link to="/support" className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Support</Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="admin">
                      <AccordionTrigger className="text-lg font-medium">Admin</AccordionTrigger>
                      <AccordionContent className="pl-4">
                        <div className="grid gap-4 text-base">
                          {adminComponents.map(item => (
                            <Link key={item.href} to={item.href} className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>{item.title}</Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="provider">
                      <AccordionTrigger className="text-lg font-medium">Provider Hub</AccordionTrigger>
                      <AccordionContent className="pl-4">
                        <div className="grid gap-4 text-base">
                          {providerComponents.map(item => (
                            <Link key={item.href} to={item.href} className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>{item.title}</Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;