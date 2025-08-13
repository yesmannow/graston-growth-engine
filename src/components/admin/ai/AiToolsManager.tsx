import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DataTable } from '@/components/data-table/data-table';
import { 
  Bot, 
  Settings, 
  Eye, 
  TrendingUp, 
  MessageSquare, 
  FileText,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AiTool {
  id: string;
  name: string;
  description: string;
  category: 'profile' | 'content' | 'analytics' | 'support';
  isEnabled: boolean;
  tierRequirement: 'Free' | 'Preferred' | 'Premier';
  usageCount: number;
  successRate: number;
  lastUpdated: string;
}

interface AiSuggestion {
  id: string;
  providerId: string;
  providerName: string;
  toolType: string;
  suggestion: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  impact?: string;
}

const AiToolsManager = () => {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([]);
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const { toast } = useToast();

  // Mock data
  React.useEffect(() => {
    const mockTools: AiTool[] = [
      {
        id: 'profile-optimizer',
        name: 'Profile Optimization Assistant',
        description: 'AI suggestions for improving provider profile completeness and appeal',
        category: 'profile',
        isEnabled: true,
        tierRequirement: 'Free',
        usageCount: 1247,
        successRate: 78,
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: 'content-generator',
        name: 'Marketing Content Generator',
        description: 'AI-powered tool for generating marketing copy and social media posts',
        category: 'content',
        isEnabled: true,
        tierRequirement: 'Preferred',
        usageCount: 892,
        successRate: 85,
        lastUpdated: '2024-01-14T15:20:00Z'
      },
      {
        id: 'analytics-interpreter',
        name: 'Analytics Interpreter',
        description: 'Plain-language explanations of provider analytics and performance metrics',
        category: 'analytics',
        isEnabled: true,
        tierRequirement: 'Premier',
        usageCount: 543,
        successRate: 92,
        lastUpdated: '2024-01-13T09:45:00Z'
      },
      {
        id: 'faq-assistant',
        name: 'Patient FAQ Assistant',
        description: 'AI-generated responses to common patient inquiries',
        category: 'support',
        isEnabled: false,
        tierRequirement: 'Preferred',
        usageCount: 234,
        successRate: 67,
        lastUpdated: '2024-01-12T14:10:00Z'
      }
    ];

    const mockSuggestions: AiSuggestion[] = [
      {
        id: 'sugg-1',
        providerId: 'prov-1',
        providerName: 'Dr. Sarah Johnson',
        toolType: 'Profile Optimizer',
        suggestion: 'Add more details about your sports medicine specialization to increase patient trust',
        status: 'pending',
        createdAt: '2024-01-15T10:30:00Z',
        impact: 'Could increase profile views by 15-20%'
      },
      {
        id: 'sugg-2',
        providerId: 'prov-2',
        providerName: 'Dr. Michael Chen',
        toolType: 'Content Generator',
        suggestion: 'Generated social media post about winter sports injury prevention',
        status: 'accepted',
        createdAt: '2024-01-14T16:20:00Z',
        impact: 'Increased engagement by 32%'
      }
    ];

    setTools(mockTools);
    setSuggestions(mockSuggestions);
  }, []);

  const handleToggleTool = (toolId: string) => {
    setTools(prev => prev.map(tool => 
      tool.id === toolId ? { ...tool, isEnabled: !tool.isEnabled } : tool
    ));
    
    toast({
      title: "Tool Updated",
      description: "AI tool status has been updated successfully",
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      profile: Users,
      content: FileText,
      analytics: TrendingUp,
      support: MessageSquare
    };
    return icons[category as keyof typeof icons] || Bot;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
  };

  const suggestionColumns = [
    {
      accessorKey: 'providerName',
      header: 'Provider'
    },
    {
      accessorKey: 'toolType',
      header: 'AI Tool'
    },
    {
      accessorKey: 'suggestion',
      header: 'Suggestion',
      cell: ({ row }: any) => (
        <div className="max-w-xs truncate" title={row.getValue('suggestion')}>
          {row.getValue('suggestion')}
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge className={getStatusColor(row.getValue('status'))}>
          {row.getValue('status')}
        </Badge>
      )
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }: any) => (
        new Date(row.getValue('createdAt')).toLocaleDateString()
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            AI Tools Management
          </h2>
          <p className="text-muted-foreground">Configure and monitor provider-facing AI features</p>
        </div>
        <Button>
          <Sparkles className="h-4 w-4 mr-2" />
          Add New AI Tool
        </Button>
      </div>

      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestion Log</TabsTrigger>
          <TabsTrigger value="templates">Content Templates</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4">
            {tools.map((tool) => {
              const CategoryIcon = getCategoryIcon(tool.category);
              
              return (
                <Card key={tool.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            <Badge variant="outline">{tool.tierRequirement}+</Badge>
                            {tool.isEnabled ? (
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            ) : (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={tool.isEnabled}
                        onCheckedChange={() => handleToggleTool(tool.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{tool.usageCount}</div>
                        <div className="text-xs text-muted-foreground">Total Uses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{tool.successRate}%</div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {new Date(tool.lastUpdated).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Last Updated</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Configure {tool.name}</DialogTitle>
                          </DialogHeader>
                          <AiToolConfiguration tool={tool} />
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Suggestion Log</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={suggestionColumns} data={suggestions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <ContentTemplateManager />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <GlobalAiSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Sub-components
const AiToolConfiguration = ({ tool }: { tool: AiTool }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Minimum Tier Requirement</label>
          <Select defaultValue={tool.tierRequirement}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Preferred">Preferred</SelectItem>
              <SelectItem value="Premier">Premier</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {tool.category === 'profile' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Minimum Bio Length</label>
              <Input type="number" defaultValue="150" />
            </div>
            <div>
              <label className="text-sm font-medium">Required Keywords</label>
              <Input placeholder="graston technique, physical therapy, rehabilitation" />
            </div>
          </div>
        )}

        {tool.category === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Content Tone</label>
              <Select defaultValue="professional">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="encouraging">Encouraging</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Brand Guidelines</label>
              <Textarea placeholder="Enter brand voice and style guidelines..." />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Configuration</Button>
      </div>
    </div>
  );
};

const ContentTemplateManager = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Content Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage AI content generation templates and themes.</p>
          {/* Template management interface would go here */}
        </CardContent>
      </Card>
    </div>
  );
};

const GlobalAiSettings = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Global AI Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Configure global AI behavior and safety settings.</p>
          {/* Global settings interface would go here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AiToolsManager;