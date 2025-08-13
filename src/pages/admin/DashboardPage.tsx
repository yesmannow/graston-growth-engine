import MetricCard from "@/components/dashboards/admin/MetricCard";
import ProviderTierChart from "@/components/dashboards/admin/ProviderTierChart";
import EngagementByTypeChart from "@/components/dashboards/admin/EngagementByTypeChart";
import GeographicHeatmap from "@/components/admin/analytics/GeographicHeatmap";
import TierPerformanceFunnel from "@/components/admin/analytics/TierPerformanceFunnel";
import TaskQueue from "@/components/dashboards/admin/TaskQueue";
import InsightAlertCenter from "@/components/admin/insights/InsightAlertCenter";
import TopViewedProviders from "@/components/dashboards/admin/TopViewedProviders";
import { mockProviderData } from "@/lib/mockData";
import AiAssistantAlerts from "@/components/dashboards/admin/AiAssistantAlerts";
import { mapMockToFullProfile } from "@/lib/dataMapping";

const AdminDashboardPage = () => {
  const providers = mockProviderData.map(mapMockToFullProfile);

  const calculateMetrics = () => {
    const totalProviders = providers.length;
    const premierProviders = providers.filter((p) => p.tier === 'Premier').length;
    const preferredProviders = providers.filter((p) => p.tier === 'Preferred').length;
    const monthlyRevenue = 59 * premierProviders + 29 * preferredProviders; // Example calculation

    return {
      totalProviders,
      monthlyRevenue,
      premierProviders,
      preferredProviders,
      engagementRate: 76.3, // Mock data
      churnRate: 2.1, // Mock data
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50/50">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Providers" value={metrics.totalProviders.toString()} change="+5 this month" />
        <MetricCard title="Estimated MRR" value={`$${metrics.monthlyRevenue.toLocaleString()}`} change="+3.2%" />
        <MetricCard title="Engagement Rate" value={`${metrics.engagementRate}%`} change="-0.5%" isWarning />
        <MetricCard title="Churn Rate" value={`${metrics.churnRate}%`} change="+0.2%" isDanger />
      </div>

      {/* AI Assistant Alerts */}
      <AiAssistantAlerts />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <ProviderTierChart data={{
            premier: metrics.premierProviders,
            preferred: metrics.preferredProviders,
            free: metrics.totalProviders - metrics.premierProviders - metrics.preferredProviders
          }} />
          <GeographicHeatmap />
          <TopViewedProviders providers={providers} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <InsightAlertCenter />
          <TierPerformanceFunnel />
          <EngagementByTypeChart providers={providers} />
          <TaskQueue />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;