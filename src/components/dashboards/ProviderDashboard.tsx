import ProfileScoreCard from "./provider/ProfileScoreCard";
import MembershipTierCard from "./provider/MembershipTierCard";
import PerformanceAnalyticsCard from "./provider/PerformanceAnalyticsCard";
import AudienceOverviewCard from "./provider/AudienceOverviewCard";
import LeadInboxCard from "./provider/LeadInboxCard";
import RoiCalculatorCard from "./provider/RoiCalculatorCard";
import UpgradeCtaCard from "./provider/UpgradeCtaCard";
import ContentAssistantCard from "./provider/ContentAssistantCard";

const ProviderDashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Provider Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProfileScoreCard />
        <MembershipTierCard />
        <AudienceOverviewCard />
        
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