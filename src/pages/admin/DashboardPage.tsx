import { Users, Star, Gem, DollarSign } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/dashboards/admin/MetricCard";
import ProviderTierChart from "@/components/dashboards/admin/ProviderTierChart";
import { mockProviders } from "@/lib/mockData";
import AiAssistantAlerts from "@/components/dashboards/admin/AiAssistantAlerts";
import TaskQueue from "@/components/dashboards/admin/TaskQueue";

const AdminPage = () => {
    const providers = mockProviders;

    const totalProviders = providers.length;
    const premierProviders = providers.filter(p => p.tier === 'Premier').length;
    const preferredProviders = providers.filter(p => p.tier === 'Preferred').length;
    const monthlyRevenue = 59 * premierProviders + 29 * preferredProviders; // Example calculation

    return (
        <div className="container mx-auto py-10 space-y-6">
            <h1 className="text-3xl font-bold">Command Center</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard title="Total Providers" value={totalProviders} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Premier Tier" value={premierProviders} icon={<Gem className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Preferred Tier" value={preferredProviders} icon={<Star className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Est. Monthly Revenue" value={`$${monthlyRevenue.toLocaleString()}`} icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-3 space-y-6">
                    <AiAssistantAlerts />
                    <TaskQueue />
                </div>
                <div className="lg:col-span-2">
                    <ProviderTierChart providers={providers} />
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Recent Provider Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={providers.slice(0, 5)} />
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminPage;