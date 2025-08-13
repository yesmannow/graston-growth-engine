import { useState, useEffect } from 'react';
import { SupportMetrics } from '@/types/support';

interface AgentPerformance {
  id: string;
  name: string;
  avatar: string;
  ticketsSolved: number;
  avgResponseTime: number;
  customerRating: number;
  status: string;
}

interface ChannelData {
  channel: string;
  tickets: number;
  percentage: number;
}

interface Article {
  title: string;
  views: number;
  helpfulness: number;
}

interface AnalyticsData {
  metrics: SupportMetrics;
  agentPerformance: AgentPerformance[];
  channelData: ChannelData[];
  topArticles: Article[];
}

export const useAnalyticsData = (timeRange: string) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data - in real app this would come from API
      const mockData: AnalyticsData = {
        metrics: {
          totalTickets: 1247,
          openTickets: 89,
          avgFirstResponseTime: 2.3,
          avgResolutionTime: 18.7,
          customerSatisfaction: 4.6,
          slaBreaches: 12,
          agentUtilization: 78
        },
        agentPerformance: [
          {
            id: 'agent-1',
            name: 'Sarah Wilson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
            ticketsSolved: 47,
            avgResponseTime: 1.8,
            customerRating: 4.8,
            status: 'Online'
          },
          {
            id: 'agent-2',
            name: 'Mike Johnson',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            ticketsSolved: 39,
            avgResponseTime: 2.1,
            customerRating: 4.7,
            status: 'Online'
          },
          {
            id: 'agent-3',
            name: 'Lisa Chen',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
            ticketsSolved: 52,
            avgResponseTime: 1.5,
            customerRating: 4.9,
            status: 'Away'
          }
        ],
        channelData: [
          { channel: 'Email', tickets: 567, percentage: 45.5 },
          { channel: 'Chat', tickets: 324, percentage: 26.0 },
          { channel: 'Form', tickets: 234, percentage: 18.8 },
          { channel: 'Social', tickets: 89, percentage: 7.1 },
          { channel: 'Phone', tickets: 33, percentage: 2.6 }
        ],
        topArticles: [
          { title: 'How to Upgrade Your Provider Tier', views: 1247, helpfulness: 89 },
          { title: 'Provider Profile Verification Process', views: 892, helpfulness: 76 },
          { title: 'Billing and Payment FAQ', views: 654, helpfulness: 82 },
          { title: 'Getting Started Guide', views: 543, helpfulness: 91 },
          { title: 'Technical Troubleshooting', views: 432, helpfulness: 74 }
        ]
      };
      
      setData(mockData);
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  const refreshData = () => {
    setData(null);
    setLoading(true);
    // Trigger data refetch
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return { data, loading, refreshData };
};