import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/data-table/data-table';
import { 
  AlertTriangle, 
  TrendingUp, 
  Bot, 
  Users, 
  Mail, 
  Target,
  RefreshCw,
  Filter,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: string;
  type: 'churn_risk' | 'upgrade_opportunity' | 'automation_suggestion';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedCount: number;
  createdAt: string;
  data: any;
  actions: AlertAction[];
}

interface AlertAction {
  id: string;
  label: string;
  type: 'view_cohort' | 'launch_campaign' | 'build_automation';
  primary?: boolean;
}

interface Provider {
  id: string;
  name: string;
  tier: string;
  location: string;
  engagementScore: number;
  profileViews: number;
  inquiries: number;
  lastActivity: string;
  churnRisk: number;
}

const InsightAlertCenter = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [cohortData, setCohortData] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock real-time alerts
  useEffect(() => {
    const mockAlerts: Alert[] = [
      {
        id: 'alert-1',
        type: 'churn_risk',
        title: 'Churn Risk Anomaly Detected',
        description: 'Sudden 35% drop in engagement from Premier providers in California region',
        severity: 'critical',
        affectedCount: 12,
        createdAt: new Date().toISOString(),
        data: {
          region: 'California',
          tier: 'Premier',
          metric: 'engagement',
          change: -35,
          timeframe: '7 days'
        },
        actions: [
          { id: 'view-cohort', label: 'View Cohort', type: 'view_cohort', primary: true },
          { id: 'send-message', label: 'Send Targeted Message', type: 'launch_campaign' }
        ]
      },
      {
        id: 'alert-2',
        type: 'upgrade_opportunity',
        title: 'High-Value Upgrade Candidates',
        description: '18 Free-tier providers with high profile views but low conversion rates',
        severity: 'medium',
        affectedCount: 18,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        data: {
          tier: 'Free',
          avgProfileViews: 245,
          avgConversionRate: 2.1,
          potentialRevenue: 4320
        },
        actions: [
          { id: 'launch-campaign', label: 'Launch Upgrade Campaign', type: 'launch_campaign', primary: true },
          { id: 'view-details', label: 'View Details', type: 'view_cohort' }
        ]
      },
      {
        id: 'alert-3',
        type: 'automation_suggestion',
        title: 'Automation Opportunity',
        description: 'Create reactivation campaign for providers with 30+ days of inactivity',
        severity: 'low',
        affectedCount: 8,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        data: {
          inactivityThreshold: 30,
          suggestedAction: 'reactivation_email'
        },
        actions: [
          { id: 'build-automation', label: 'Build Automation', type: 'build_automation', primary: true }
        ]
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[severity as keyof typeof colors];
  };

  const getAlertIcon = (type: string) => {
    const icons = {
      churn_risk: AlertTriangle,
      upgrade_opportunity: TrendingUp,
      automation_suggestion: Bot
    };
    const Icon = icons[type as keyof typeof icons];
    return Icon ? <Icon className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />;
  };

  const handleAlertAction = async (alert: Alert, action: AlertAction) => {
    setLoading(true);
    
    try {
      switch (action.type) {
        case 'view_cohort':
          await loadCohortData(alert);
          setSelectedAlert(alert);
          break;
          
        case 'launch_campaign':
          await launchCampaign(alert);
          break;
          
        case 'build_automation':
          await buildAutomation(alert);
          break;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute action. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCohortData = async (alert: Alert) => {
    // Simulate API call to load cohort data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockCohortData: Provider[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        tier: 'Premier',
        location: 'Los Angeles, CA',
        engagementScore: 45,
        profileViews: 234,
        inquiries: 12,
        lastActivity: '2024-01-10T10:30:00Z',
        churnRisk: 85
      },
      {
        id: '2',
        name: 'Dr. Michael Chen',
        tier: 'Premier',
        location: 'San Francisco, CA',
        engagementScore: 38,
        profileViews: 189,
        inquiries: 8,
        lastActivity: '2024-01-08T14:20:00Z',
        churnRisk: 92
      }
    ];
    
    setCohortData(mockCohortData);
  };

  const launchCampaign = async (alert: Alert) => {
    // Simulate campaign launch
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Campaign Launched",
      description: `Targeted campaign sent to ${alert.affectedCount} providers`,
    });
  };

  const buildAutomation = async (alert: Alert) => {
    // Simulate automation creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Automation Created",
      description: "New automation workflow has been created and activated",
    });
  };

  const cohortColumns = [
    {
      accessorKey: 'name',
      header: 'Provider Name'
    },
    {
      accessorKey: 'tier',
      header: 'Tier',
      cell: ({ row }: any) => (
        <Badge variant="outline">{row.getValue('tier')}</Badge>
      )
    },
    {
      accessorKey: 'location',
      header: 'Location'
    },
    {
      accessorKey: 'engagementScore',
      header: 'Engagement',
      cell: ({ row }: any) => {
        const score = row.getValue('engagementScore') as number;
        return (
          <div className="flex items-center gap-2">
            <span>{score}%</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full">
              <div 
                className={`h-2 rounded-full ${score > 60 ? 'bg-green-500' : score > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'churnRisk',
      header: 'Churn Risk',
      cell: ({ row }: any) => {
        const risk = row.getValue('churnRisk') as number;
        return (
          <Badge variant={risk > 70 ? 'destructive' : risk > 40 ? 'secondary' : 'default'}>
            {risk}%
          </Badge>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Insight & Alert Center</h2>
          <p className="text-muted-foreground">AI-powered insights and actionable alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {alert.affectedCount} affected
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(alert.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {alert.actions.map((action) => (
                  <Button
                    key={action.id}
                    variant={action.primary ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAlertAction(alert, action)}
                    disabled={loading}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cohort Detail Modal */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAlert?.title} - Affected Providers
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="providers" className="w-full">
            <TabsList>
              <TabsTrigger value="providers">Providers ({cohortData.length})</TabsTrigger>
              <TabsTrigger value="actions">Bulk Actions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="providers" className="space-y-4">
              <DataTable columns={cohortColumns} data={cohortData} />
            </TabsContent>
            
            <TabsContent value="actions" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-20 flex-col gap-2">
                  <Mail className="h-6 w-6" />
                  Send Retention Email
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Target className="h-6 w-6" />
                  Create Custom Campaign
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsightAlertCenter;