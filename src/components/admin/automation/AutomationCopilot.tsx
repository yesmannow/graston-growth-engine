import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bot, 
  Zap, 
  Mail, 
  Calendar, 
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AutomationSuggestion {
  id: string;
  title: string;
  description: string;
  category: 'retention' | 'engagement' | 'conversion' | 'support';
  priority: 'low' | 'medium' | 'high';
  estimatedImpact: string;
  template: AutomationTemplate;
  metrics: {
    potentialReach: number;
    expectedConversion: number;
    timeToImplement: string;
  };
}

interface AutomationTemplate {
  trigger: {
    type: string;
    conditions: any[];
  };
  actions: {
    type: string;
    config: any;
  }[];
}

const AutomationCopilot = () => {
  const [suggestions, setSuggestions] = useState<AutomationSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<AutomationSuggestion | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Mock AI-generated suggestions based on platform data
    const mockSuggestions: AutomationSuggestion[] = [
      {
        id: 'suggestion-1',
        title: 'Reactivate Dormant Premier Providers',
        description: 'Automatically send personalized reactivation emails to Premier providers who haven\'t logged in for 30+ days',
        category: 'retention',
        priority: 'high',
        estimatedImpact: 'Could reactivate 15-20% of dormant accounts',
        metrics: {
          potentialReach: 47,
          expectedConversion: 12,
          timeToImplement: '5 minutes'
        },
        template: {
          trigger: {
            type: 'provider_inactive',
            conditions: [
              { field: 'last_login', operator: 'older_than', value: '30 days' },
              { field: 'tier', operator: 'equals', value: 'Premier' }
            ]
          },
          actions: [
            {
              type: 'send_email',
              config: {
                template: 'reactivation_premier',
                delay: '0 days'
              }
            },
            {
              type: 'add_tag',
              config: { tag: 'reactivation_campaign' }
            }
          ]
        }
      },
      {
        id: 'suggestion-2',
        title: 'Free Tier Upgrade Nudge',
        description: 'Target Free tier providers with high profile views but low inquiries with upgrade prompts',
        category: 'conversion',
        priority: 'medium',
        estimatedImpact: 'Potential $2,400 monthly revenue increase',
        metrics: {
          potentialReach: 23,
          expectedConversion: 6,
          timeToImplement: '3 minutes'
        },
        template: {
          trigger: {
            type: 'profile_metrics',
            conditions: [
              { field: 'tier', operator: 'equals', value: 'Free' },
              { field: 'profile_views', operator: 'greater_than', value: 100 },
              { field: 'inquiries', operator: 'less_than', value: 5 }
            ]
          },
          actions: [
            {
              type: 'send_email',
              config: {
                template: 'upgrade_opportunity',
                delay: '1 day'
              }
            },
            {
              type: 'show_in_app_message',
              config: {
                message: 'Upgrade to get more patient inquiries',
                duration: '7 days'
              }
            }
          ]
        }
      },
      {
        id: 'suggestion-3',
        title: 'Welcome Series for New Providers',
        description: 'Automatically guide new providers through profile completion with a 5-email series',
        category: 'engagement',
        priority: 'medium',
        estimatedImpact: '40% improvement in profile completion rates',
        metrics: {
          potentialReach: 15,
          expectedConversion: 9,
          timeToImplement: '7 minutes'
        },
        template: {
          trigger: {
            type: 'provider_registered',
            conditions: [
              { field: 'registration_date', operator: 'within_last', value: '1 day' }
            ]
          },
          actions: [
            {
              type: 'send_email_series',
              config: {
                series: 'new_provider_welcome',
                schedule: ['0 days', '2 days', '5 days', '10 days', '20 days']
              }
            }
          ]
        }
      }
    ];

    setSuggestions(mockSuggestions);
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      retention: 'bg-red-100 text-red-800',
      engagement: 'bg-blue-100 text-blue-800',
      conversion: 'bg-green-100 text-green-800',
      support: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const handleBuildAutomation = (suggestion: AutomationSuggestion) => {
    setSelectedSuggestion(suggestion);
    setIsBuilding(true);
  };

  const handleCreateAutomation = async () => {
    if (!selectedSuggestion) return;

    // Simulate automation creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Automation Created",
      description: `"${selectedSuggestion.title}" has been created and activated`,
    });

    setIsBuilding(false);
    setSelectedSuggestion(null);
  };

  const handleCustomPrompt = async () => {
    if (!customPrompt.trim()) return;

    // Simulate AI processing custom prompt
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Custom Automation Generated",
      description: "AI has created a custom automation based on your request",
    });

    setCustomPrompt('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Automation Copilot
          </h2>
          <p className="text-muted-foreground">AI-powered automation suggestions based on your platform data</p>
        </div>
      </div>

      {/* Custom Prompt */}
      <Card className="border-dashed border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Ask AI to Create Custom Automation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe the automation you want to create... e.g., 'Send a follow-up email to providers who haven't completed their profile after 3 days'"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={3}
          />
          <Button onClick={handleCustomPrompt} disabled={!customPrompt.trim()}>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Custom Automation
          </Button>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <div className="grid gap-4">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 h-full bg-primary/20" />
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                    <Badge className={getCategoryColor(suggestion.category)}>
                      {suggestion.category}
                    </Badge>
                    <Badge className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  <p className="text-sm font-medium text-primary">{suggestion.estimatedImpact}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{suggestion.metrics.potentialReach}</div>
                  <div className="text-xs text-muted-foreground">Potential Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{suggestion.metrics.expectedConversion}</div>
                  <div className="text-xs text-muted-foreground">Expected Conversions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{suggestion.metrics.timeToImplement}</div>
                  <div className="text-xs text-muted-foreground">Setup Time</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button onClick={() => handleBuildAutomation(suggestion)}>
                  <Zap className="h-4 w-4 mr-2" />
                  Build This Automation
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Automation Builder Modal */}
      <Dialog open={isBuilding} onOpenChange={setIsBuilding}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Build Automation: {selectedSuggestion?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Workflow Preview */}
            <div className="space-y-4">
              <h4 className="font-medium">Automation Workflow</h4>
              
              {/* Trigger */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium">WHEN</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedSuggestion?.template.trigger.type === 'provider_inactive' && 'Provider is inactive for 30+ days'}
                    {selectedSuggestion?.template.trigger.type === 'profile_metrics' && 'Provider has high views but low inquiries'}
                    {selectedSuggestion?.template.trigger.type === 'provider_registered' && 'New provider registers'}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {selectedSuggestion?.template.actions.map((action, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      {action.type === 'send_email' && <Mail className="h-4 w-4 text-green-600" />}
                      {action.type === 'add_tag' && <Target className="h-4 w-4 text-green-600" />}
                      {action.type === 'send_email_series' && <Calendar className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex-1 p-3 bg-green-50 rounded-lg">
                      <div className="font-medium">THEN</div>
                      <div className="text-sm text-muted-foreground">
                        {action.type === 'send_email' && `Send ${action.config.template} email`}
                        {action.type === 'add_tag' && `Add "${action.config.tag}" tag`}
                        {action.type === 'send_email_series' && `Send welcome email series`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration Options */}
            <div className="space-y-4">
              <h4 className="font-medium">Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email Template</label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Template</SelectItem>
                      <SelectItem value="custom">Custom Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Delay</label>
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1hour">1 Hour</SelectItem>
                      <SelectItem value="1day">1 Day</SelectItem>
                      <SelectItem value="3days">3 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsBuilding(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAutomation}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Create & Activate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AutomationCopilot;