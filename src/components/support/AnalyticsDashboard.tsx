import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Clock, Star, Target } from 'lucide-react';

// Components
import MetricCard from './analytics/MetricCard';
import AnalyticsHeader from './analytics/AnalyticsHeader';
import OverviewTab from './analytics/OverviewTab';
import AgentPerformanceTab from './analytics/AgentPerformanceTab';
import ChannelAnalysisTab from './analytics/ChannelAnalysisTab';
import KnowledgeBaseTab from './analytics/KnowledgeBaseTab';

// Hooks and utilities
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import { getMetricChange, exportToCSV } from '@/utils/analyticsHelpers';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  
  const { data, loading, refreshData } = useAnalyticsData(timeRange);

  const handleExport = () => {
    if (!data) return;
    
    // Export different data based on selected tab
    switch (selectedMetric) {
      case 'agents':
        exportToCSV(data.agentPerformance, 'agent-performance');
        break;
      case 'channels':
        exportToCSV(data.channelData, 'channel-analysis');
        break;
      case 'knowledge':
        exportToCSV(data.topArticles, 'knowledge-base-analytics');
        break;
      default:
        exportToCSV([data.metrics], 'support-metrics');
    }
  };

  if (loading || !data) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnalyticsHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onRefresh={refreshData}
        onExport={handleExport}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Tickets"
          value={data.metrics.totalTickets.toLocaleString()}
          change={getMetricChange(data.metrics.totalTickets, 1156)}
          icon={MessageSquare}
          color="bg-blue-600"
        />
        <MetricCard
          title="Avg First Response"
          value={data.metrics.avgFirstResponseTime}
          unit="hours"
          change={getMetricChange(data.metrics.avgFirstResponseTime, 2.8)}
          icon={Clock}
          color="bg-green-600"
        />
        <MetricCard
          title="Customer Satisfaction"
          value={data.metrics.customerSatisfaction}
          unit="/5.0"
          change={getMetricChange(data.metrics.customerSatisfaction, 4.4)}
          icon={Star}
          color="bg-yellow-600"
        />
        <MetricCard
          title="SLA Breaches"
          value={data.metrics.slaBreaches}
          change={getMetricChange(data.metrics.slaBreaches, 18)}
          icon={Target}
          color="bg-red-600"
        />
      </div>

      {/* Detailed Analytics */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="channels">Channel Analysis</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <AgentPerformanceTab agentPerformance={data.agentPerformance} />
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <ChannelAnalysisTab channelData={data.channelData} />
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <KnowledgeBaseTab topArticles={data.topArticles} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;