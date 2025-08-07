import { Users, Star, Gem, AlertTriangle, Hourglass, FileText, TrendingUp, UserX, Tag } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/dashboards/admin/MetricCard";
import ProviderTierChart from "@/components/dashboards/admin/ProviderTierChart";
import EngagementByTypeChart from "@/components/dashboards/admin/EngagementByTypeChart";
import TopViewedProviders from "@/components/dashboards/admin/TopViewedProviders";
import { mockProviders } from "@/lib/mockData";
import EngagementOpportunityCard from "@/components/dashboards/admin/EngagementOpportunityCard";
import AdminAiAssistant from "@/components/dashboards/admin/AdminAiAssistant";
import { showSuccess } from "@/utils/toast";

const AdminPage = () => {
    const providers = mockProviders;

    const freeProviders = providers.filter(p => p.tier === 'Free').length;
    const preferredProviders = providers.filter(p => p.tier === 'Preferred').length;
    const premierProviders = providers.filter(p => p.tier === 'Premier').length;
    const highChurnRisk = providers.filter(p => p.churnRisk).length;
    const activeTrials = providers.filter(p => p.trialStatus === 'Active').length;

    const handleOpportunityClick = (title: string) => {
        showSuccess(`Action for "${title}" clicked. This would trigger a workflow.`);
    };

    return (
        <div className="container mx-auto py-10 space-y-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <MetricCard title="Free Tier" value={freeProviders} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Preferred Tier" value={preferredProviders} icon={<Star className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Premier Tier" value={premierProviders} icon={<Gem className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="High Churn Risk" value={highChurnRisk} icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />} />
                <MetricCard title="Active Trials" value={activeTrials} icon={<Hourglass className="h-4 w-4 text-muted-foreground" />} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">AI Engagement Opportunities</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <EngagementOpportunityCard
                        icon={<FileText className="h-5 w-5" />}
                        title="Content Ready"
                        value="4 Articles"
                        description="AI-generated articles need approval for Premier providers."
                        ctaText="Review Drafts"
                        onCtaClick={() => handleOpportunityClick("Content Ready")}
                    />
                    <EngagementOpportunityCard
                        icon={<TrendingUp className="h-5 w-5" />}
                        title="Trending Provider"
                        value="Dr. Jane Smith"
                        description="3x traffic increase this week. Potential for a case study."
                        ctaText="View Profile"
                        onCtaClick={() => handleOpportunityClick("Trending Provider")}
                    />
                    <EngagementOpportunityCard
                        icon={<UserX className="h-5 w-5" />}
                        title="Profile Gaps"
                        value="25 Profiles"
                        description="Premier profiles are missing photos or bios, affecting their score."
                        ctaText="Send Nudges"
                        onCtaClick={() => handleOpportunityClick("Profile Gaps")}
                    />
                    <EngagementOpportunityCard
                        icon={<Tag className="h-5 w-5" />}
                        title="Tag Opportunity"
                        value="'Ankle Rehab'"
                        description="This search term is surging. 48 providers could add this tag."
                        ctaText="Notify Providers"
                        onCtaClick={() => handleOpportunityClick("Tag Opportunity")}
                    />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-3">
                    <AdminAiAssistant />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <ProviderTierChart providers={providers} />
                </div>
                <div className="lg:col-span-2">
                    <EngagementByTypeChart providers={providers} />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Viewed Providers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TopViewedProviders providers={providers} />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Provider Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={providers} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;