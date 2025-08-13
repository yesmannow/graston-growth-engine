import { FileDown, Eye, Target, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/dashboards/admin/MetricCard";
import TierPerformanceFunnel from "@/components/admin/analytics/TierPerformanceFunnel";
import GeographicHeatmap from "@/components/admin/analytics/GeographicHeatmap";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Advanced Analytics & Reporting</h1>
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard 
          title="Total Profile Views (30d)" 
          value="125,830" 
          icon={<Eye className="h-4 w-4 text-muted-foreground" />} 
          description="+15.2% from last month"
        />
        <MetricCard 
          title="Avg. Conversion Rate" 
          value="4.7%" 
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          description="+0.5% from last month"
        />
        <MetricCard 
          title="New Premier Members (30d)" 
          value="23" 
          icon={<Handshake className="h-4 w-4 text-muted-foreground" />}
          description="-8% from last month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TierPerformanceFunnel />
        <GeographicHeatmap />
      </div>

      <Card>
        <CardHeader>
            <CardTitle>White-Label Report Generator</CardTitle>
            <CardDescription>Configure and schedule automated ROI reports for providers.</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-10">
            <p>Report configuration interface placeholder.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;