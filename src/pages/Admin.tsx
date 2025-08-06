import { useEffect, useState } from "react";
import { Users, Star, Gem, AlertTriangle } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { FullProviderProfile } from "@/types";
import { mockProviders } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/dashboards/admin/MetricCard";

const AdminPage = () => {
    const [data, setData] = useState<FullProviderProfile[]>([]);

    useEffect(() => {
        // In a real app, you would fetch data from an API here.
        setData(mockProviders);
    }, []);

    const freeProviders = data.filter(p => p.tier === 'Free').length;
    const preferredProviders = data.filter(p => p.tier === 'Preferred').length;
    const premierProviders = data.filter(p => p.tier === 'Premier').length;
    const highChurnRisk = data.filter(p => p.churnRisk).length;
    const activeTrials = data.filter(p => p.trialStatus === 'Active').length;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <MetricCard title="Free Tier" value={freeProviders} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Preferred Tier" value={preferredProviders} icon={<Star className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Premier Tier" value={premierProviders} icon={<Gem className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="High Churn Risk" value={highChurnRisk} icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Provider Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminPage;