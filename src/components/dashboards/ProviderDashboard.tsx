"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Gem } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FullProviderProfile } from "@/types";

// Original Cards
import MembershipTierCard from "./provider/MembershipTierCard";
import PerformanceAnalyticsCard from "./provider/PerformanceAnalyticsCard";
import LeadInboxCard from "./provider/LeadInboxCard";
import RoiCalculatorCard from "./provider/RoiCalculatorCard";
import UpgradeCtaCard from "./provider/UpgradeCtaCard";
import ContentAssistantCard from "./provider/ContentAssistantCard";
import MarketingToolkitCtaCard from "./provider/MarketingToolkitCtaCard";

// New Performance & SEO Cards
import ProfileStrengthCard from "@/components/dashboards/provider/performance/ProfileStrengthCard";
import HeadlineAbTestingCard from "@/components/dashboards/provider/performance/HeadlineAbTestingCard";
import LocalSeoTab from "@/components/dashboards/provider/seo/LocalSeoTab";

interface ProviderDashboardProps {
  provider: FullProviderProfile;
}

const ProviderDashboard = ({ provider }: ProviderDashboardProps) => {
  const navigate = useNavigate();
  const isPremier = provider.tier === 'Premier';
  const isPreferredOrPremier = provider.tier === 'Premier' || provider.tier === 'Preferred';

  const renderDashboardGrid = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <PerformanceAnalyticsCard />
      <LeadInboxCard />
      <RoiCalculatorCard />
      <UpgradeCtaCard />
      <ContentAssistantCard />
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {provider.name}'s Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your practice and grow your business
          </p>
        </div>
        <Button 
          onClick={() => navigate(`/update-profile`)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Performance & Optimization Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Performance & Optimization</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isPreferredOrPremier && <ProfileStrengthCard provider={provider} />}
          {isPremier && <HeadlineAbTestingCard />}
          <MembershipTierCard />
          <MarketingToolkitCtaCard providerId={provider.id} />
        </div>
      </div>


      {/* Main Content Area with Tabs for Premier */}
      {isPremier ? (
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Main Dashboard</TabsTrigger>
            <TabsTrigger value="seo">
              <Gem className="h-4 w-4 mr-2 text-purple-500" />
              Local SEO Suite
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            {renderDashboardGrid()}
          </TabsContent>
          <TabsContent value="seo">
            <LocalSeoTab provider={provider} />
          </TabsContent>
        </Tabs>
      ) : (
        renderDashboardGrid()
      )}
    </div>
  );
};

export default ProviderDashboard;