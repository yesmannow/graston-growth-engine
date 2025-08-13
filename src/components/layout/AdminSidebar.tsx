import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  Settings,
  BarChart3,
  MessageSquare
} from 'lucide-react';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Providers',
    href: '/admin/providers',
    icon: Users
  },
  {
    title: 'AI Assistant',
    href: '/admin/ai-assistant',
    icon: Bot
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    title: 'Support',
    href: '/support-dashboard',
    icon: MessageSquare
  }
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-sidebar border-r h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Admin Panel</h2>
      </div>
      <nav className="px-4 py-4 space-y-2 flex-grow">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};