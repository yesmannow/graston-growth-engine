"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import ProfileScoreCard from "./provider/ProfileScoreCard";
import MembershipTierCard from "./provider/MembershipTierCard";
import PerformanceAnalyticsCard from "./provider/PerformanceAnalyticsCard";
import AudienceOverviewCard from "./provider/AudienceOverviewCard";
import LeadInboxCard from "./provider/LeadInboxCard";
import RoiCalculatorCard from "./provider/RoiCalculatorCard";
import UpgradeCtaCard from "./provider/UpgradeCtaCard";
import ContentAssistantCard from "./provider/ContentAssistantCard";
import { FullProviderProfile } from "@/types";
import MarketingToolkitCtaCard from "./provider/MarketingToolkitCtaCard";

interface ProviderDashboardProps {
  provider: FullProviderProfile;
}

const ProviderDashboard = ({ provider }: ProviderDashboardProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      {/* Header with Edit Profile Button */}
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
          onClick={() => navigate(`/provider/${provider.id}/update`)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProfileScoreCard user={provider} />
        <MembershipTierCard />
        <MarketingToolkitCtaCard providerId={provider.id} />
        
        <PerformanceAnalyticsCard />
        <LeadInboxCard />
        <RoiCalculatorCard />
        
        <UpgradeCtaCard />
        <ContentAssistantCard />
      </div>
    </div>
  );
};

export default ProviderDashboard;