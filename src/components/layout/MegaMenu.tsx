"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const MegaMenu = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="px-2 py-1 hover:bg-accent-hover rounded">
          Menu
        </NavigationMenuTrigger>
        <NavigationMenuContent className="w-[400px]">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Directory</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/">Find a Provider</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/providers/101">Sample Profile</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/about">About Us</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/faq">FAQ</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/onboarding">Onboarding</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/support">Support</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default MegaMenu;