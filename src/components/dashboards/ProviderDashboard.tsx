import ProfileScoreCard from "./provider/ProfileScoreCard";
import MembershipTierCard from "./provider/MembershipTierCard";
import PerformanceAnalyticsCard from "./provider/PerformanceAnalyticsCard";
import AudienceOverviewCard from "./provider/AudienceOverviewCard";
import LeadInboxCard from "./provider/LeadInboxCard";
import RoiCalculatorCard from "./provider/RoiCalculatorCard";
import UpgradeCtaCard from "./provider/UpgradeCtaCard";
import ContentAssistantCard from "./provider/ContentAssistantCard";
import { UserProfile } from "@/lib/membershipTiers";

// Mock user data - try changing the tier or removing fields!
const mockUser: UserProfile = {
  tier: 'Premier',
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'jane.doe@example.com',
  profile_image: 'url_to_image',
  bio: 'An experienced professional...',
  website_url: 'https://example.com',
  // booking_url is missing
  // video_url is missing
  // social_media_links is missing
};

const ProviderDashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Provider Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProfileScoreCard user={mockUser} />
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