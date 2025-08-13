import React, { useState, useEffect } from 'react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users, 
  BarChart3, 
  Bot, 
  Settings, 
  FileText, 
  MessageSquare,
  Zap,
  Calendar,
  Mail,
  Shield,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
  keywords?: string[];
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      title: 'Dashboard',
      description: 'Go to admin dashboard',
      icon: <BarChart3 className="h-4 w-4" />,
      action: () => navigate('/admin'),
      category: 'Navigation'
    },
    {
      id: 'nav-providers',
      title: 'Provider Management',
      description: 'Manage provider accounts',
      icon: <Users className="h-4 w-4" />,
      action: () => navigate('/admin/providers'),
      category: 'Navigation'
    },
    {
      id: 'nav-ai-assistant',
      title: 'AI Assistant',
      description: 'Configure AI tools',
      icon: <Bot className="h-4 w-4" />,
      action: () => navigate('/admin/ai-assistant'),
      category: 'Navigation'
    },
    {
      id: 'nav-analytics',
      title: 'Analytics',
      description: 'View platform analytics',
      icon: <TrendingUp className="h-4 w-4" />,
      action: () => navigate('/admin/analytics'),
      category: 'Navigation'
    },
    {
      id: 'nav-support',
      title: 'Support Dashboard',
      description: 'Manage support tickets',
      icon: <MessageSquare className="h-4 w-4" />,
      action: () => navigate('/support-dashboard'),
      category: 'Navigation'
    },

    // Quick Actions
    {
      id: 'action-create-automation',
      title: 'Create Automation',
      description: 'Build new automation workflow',
      icon: <Zap className="h-4 w-4" />,
      action: () => {
        navigate('/admin/ai-assistant');
        // TODO: Open automation builder modal
      },
      category: 'Quick Actions',
      keywords: ['automation', 'workflow', 'trigger']
    },
    {
      id: 'action-send-campaign',
      title: 'Launch Email Campaign',
      description: 'Send targeted email to providers',
      icon: <Mail className="h-4 w-4" />,
      action: () => {
        // TODO: Open campaign modal
      },
      category: 'Quick Actions',
      keywords: ['email', 'campaign', 'marketing']
    },
    {
      id: 'action-generate-report',
      title: 'Generate Report',
      description: 'Create custom analytics report',
      icon: <FileText className="h-4 w-4" />,
      action: () => {
        // TODO: Open report generator
      },
      category: 'Quick Actions',
      keywords: ['report', 'analytics', 'export']
    },

    // Provider Actions
    {
      id: 'provider-search',
      title: 'Search Providers',
      description: 'Find specific provider accounts',
      icon: <Search className="h-4 w-4" />,
      action: () => navigate('/admin/providers'),
      category: 'Providers',
      keywords: ['provider', 'search', 'find']
    },
    {
      id: 'provider-bulk-action',
      title: 'Bulk Provider Actions',
      description: 'Perform actions on multiple providers',
      icon: <Users className="h-4 w-4" />,
      action: () => navigate('/admin/providers'),
      category: 'Providers',
      keywords: ['bulk', 'multiple', 'batch']
    }
  ];

  const runCommand = (command: CommandItem) => {
    setOpen(false);
    command.action();
  };

  const groupedCommands = commands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <Badge variant="outline" className="ml-auto">
          ⌘K
        </Badge>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {Object.entries(groupedCommands).map(([category, items], index) => (
            <React.Fragment key={category}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={category}>
                {items.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => runCommand(command)}
                    className="flex items-center gap-3"
                  >
                    {command.icon}
                    <div className="flex-1">
                      <div className="font-medium">{command.title}</div>
                      {command.description && (
                        <div className="text-xs text-muted-foreground">
                          {command.description}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;