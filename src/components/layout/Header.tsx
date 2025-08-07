"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ListItem from "./ListItem";
import { Gem, User, BarChart, LifeBuoy, FileText, BookOpen, Wrench, Users } from "lucide-react";

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
        <div className="flex flex-1 items-center justify-end space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Dashboards</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <ListItem href="/provider/1" title="Provider Dashboard">
                      Manage your profile, view analytics, and access resources. (Sample ID: 1)
                    </ListItem>
                    <ListItem href="/admin" title="Admin Dashboard">
                      Oversee all providers, view site-wide analytics, and manage content.
                    </ListItem>
                    <ListItem href="/staff" title="Staff Dashboard">
                      Access provider data tables and perform administrative actions.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <ListItem href="/onboarding" title="Onboarding Guide">
                      New to the directory? Start here to set up your profile for success.
                    </ListItem>
                    <ListItem href="/reports" title="Analytics Reports">
                      Download key insights and performance reports for your listings.
                    </ListItem>
                    <ListItem href="/provider/1/toolkit" title="Marketing Toolkit">
                      Access guides, templates, and resources to grow your practice. (Sample ID: 1)
                    </ListItem>
                    <ListItem href="/support" title="Support & Ticketing">
                      Need help? Contact our support team for assistance.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild>
            <Link to="/login">
              <User className="mr-2 h-4 w-4" /> Provider Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;