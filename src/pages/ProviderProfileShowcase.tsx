import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FreeProfile from '@/components/provider-profiles/FreeProfile';
import PreferredProfile from '@/components/provider-profiles/PreferredProfile';
import PremierProfile from '@/components/provider-profiles/PremierProfile';
import { mockProviders, providersByTier } from '@/data/mock-providers';
import { ProviderProfile } from '@/types/provider-profile';

const ProviderProfileShowcase = () => {
  const [selectedTier, setSelectedTier] = useState<'Free' | 'Preferred' | 'Premier'>('Free');
  const [selectedProvider, setSelectedProvider] = useState<ProviderProfile>(providersByTier.Free[0]);

  const handleTierChange = (tier: 'Free' | 'Preferred' | 'Premier') => {
    setSelectedTier(tier);
    setSelectedProvider(providersByTier[tier][0]);
  };

  const handleProviderChange = (providerId: string) => {
    const provider = mockProviders.find(p => p.id === providerId);
    if (provider) {
      setSelectedProvider(provider);
    }
  };

  const renderProfile = () => {
    switch (selectedTier) {
      case 'Free':
        return <FreeProfile provider={selectedProvider} />;
      case 'Preferred':
        return <PreferredProfile provider={selectedProvider} />;
      case 'Premier':
        return <PremierProfile provider={selectedProvider} />;
      default:
        return <FreeProfile provider={selectedProvider} />;
    }
  };

  const tierFeatures = {
    Free: [
      'Basic provider information',
      'Location (city/state only)',
      'Specialties and languages',
      'Availability status',
      'Professional verification badge'
    ],
    Preferred: [
      'Everything in Free, plus:',
      'Profile photo',
      'Full contact information',
      'Interactive map',
      'Office hours',
      'Social media links',
      'Extended bio (150 words)',
      'Insurance information',
      'Professional accreditations'
    ],
    Premier: [
      'Everything in Preferred, plus:',
      'Hero banner with clinic photos',
      'Photo gallery with lightbox',
      'Video introduction',
      'Patient testimonials & ratings',
      'Provider-managed FAQs',
      'Published articles showcase',
      'Upcoming events promotion',
      'Online booking integration',
      'Extended bio (300+ words)',
      'Custom content sections'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Provider Profile Showcase
              </h1>
              <p className="text-gray-600">
                Experience the power of tier-based digital identities
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Tier</label>
                <Tabs value={selectedTier} onValueChange={(value) => handleTierChange(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Free">Free</TabsTrigger>
                    <TabsTrigger value="Preferred">Preferred</TabsTrigger>
                    <TabsTrigger value="Premier">Premier</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Provider</label>
                <Select value={selectedProvider.id} onValueChange={handleProviderChange}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {providersByTier[selectedTier].map((provider) =><think>Deciding which files are relevant...

[
  "src/types/provider-profile.ts",
  "src/data/mock-providers.ts",
  "src/components/provider-profiles/FreeProfile.tsx",
  "src/components/provider-profiles/PreferredProfile.tsx",
  "src/components/provider-profiles/PremierProfile.tsx",
  "src/pages/ProviderProfileShowcase.tsx"
]</think><think>Ranked files:

src/pages/support/SupportDashboard.tsx: 0.84

src/components/support/SmartInbox.tsx: 0.70

src/components/ui/badge.tsx: 0.67

src/components/ui/card.tsx: 0.60

src/App.tsx: 0.60

src/components/ui/button.tsx: 0.57

src/components/ui/input.tsx: 0.55

src/components/ui/tabs.tsx: 0.50

src/components/ui/select.tsx: 0.43

src/components/TierBadge.tsx: 0.42

src/components/ui/textarea.tsx: 0.41

src/components/support/ChatDashboard.tsx: 0.40

src/components/ui/command.tsx: 0.39

src/components/support/AnalyticsDashboard.tsx: 0.39

src/components/admin/AdminSidebar.tsx: 0.38

src/components/ui/separator.tsx: 0.38

src/components/support/TicketDetail.tsx: 0.37

src/components/ui/label.tsx: 0.37

src/components/ui/avatar.tsx: 0.37

src/components/ui/form.tsx: 0.36

src/components/ui/enhanced-card.tsx: 0.34

src/components/support/AutomationBuilder.tsx: 0.32

src/pages/Reports.tsx: 0.31

src/components/support/SupportTriageView.tsx: 0.31

src/pages/Support.tsx: 0.30

src/components/layout/Layout.tsx: 0.30

src/components/support/analytics/AgentPerformanceTab.tsx: 0.30

src/components/ui/enhanced-search.tsx: 0.30

src/components/layout/Header.tsx: 0.29

src/components/provider/ProfileSidebar.tsx: 0.29

src/components/ui/enhanced-button.tsx: 0.28

src/components/ui/dialog.tsx: 0.28

src/components/ui/table.tsx: 0.28

src/utils/toast.ts: 0.27

src/components/layout/AdminLayout.tsx: 0.27

src/components/ui/alert.tsx: 0.27

src/components/support/triage/TicketHeader.tsx: 0.26

src/components/support/KnowledgeBase.tsx: 0.26

src/components/ui/toast.tsx: 0.25

src/components/support/automation/RuleDetail.tsx: 0.25

src/components/ui/sonner.tsx: 0.25

src/components/support/analytics/KnowledgeBaseTab.tsx: 0.25

src/components/support/triage/TicketQueue.tsx: 0.25

src/components/ui/enhanced-input.tsx: 0.25

src/components/support/automation/RuleBuilder.tsx: 0.25

src/components/ui/toaster.tsx: 0.24

src/main.tsx: 0.24

src/components/support/analytics/ChannelAnalysisTab.tsx: 0.23

src/components/support/analytics/OverviewTab.tsx: 0.22

src/components/ui/sidebar.tsx: 0.22

src/pages/Provider.tsx: 0.21

src/components/support/analytics/MetricCard.tsx: 0.21

src/components/provider/ProfileHeader.tsx: 0.21

src/components/directory/FilterPanel.tsx: 0.21

src/components/provider/ProfileTabs.tsx: 0.21

src/components/provider/ContactCard.tsx: 0.21

src/components/layout/Breadcrumbs.tsx: 0.20

src/components/support/automation/AutomationRulesList.tsx: 0.20

src/components/ui/sheet.tsx: 0.20

src/components/UpdateProfileForm.tsx: 0.20

src/components/dashboards/ProviderDashboard.tsx: 0.20

src/utils/analyticsHelpers.ts: 0.19

src/components/provider/MediaCard.tsx: 0.19

src/components/SearchBar.tsx: 0.19

src/components/directory/ProviderCard.tsx: 0.19

src/pages/admin/DashboardPage.tsx: 0.19

src/components/ui/navigation-menu.tsx: 0.18

src/pages/UpdateProfile.tsx: 0.18

src/components/ui/drawer.tsx: 0.18

src/components/dashboards/provider/ProfileScoreCard.tsx: 0.18

src/components/data-table/data-table.tsx: 0.18

src/components/dashboards/provider/ResourceCard.tsx: 0.18

src/components/ui/dropdown-menu.tsx: 0.18

src/components/ui/alert-dialog.tsx: 0.17

src/components/dashboards/admin/TaskQueue.tsx: 0.17

src/pages/PublicProviderProfilePage.tsx: 0.17

src/pages/Directory.tsx: 0.17

src/pages/admin/AnalyticsPage.tsx: 0.17

src/components/ui/chart.tsx: 0.17

src/components/ui/scroll-area.tsx: 0.17

src/components/ui/accordion.tsx: 0.17

src/components/admin/command/CommandPalette.tsx: 0.16

src/pages/admin/AiAssistantPage.tsx: 0.16

src/components/data-table/columns.tsx: 0.16

src/components/dashboards/provider/ContentAssistantCard.tsx: 0.15

src/components/support/analytics/AnalyticsHeader.tsx: 0.15

src/pages/Index.tsx: 0.14

src/components/provider/ServicesCard.tsx: 0.14

src/components/dashboards/provider/MembershipTierCard.tsx: 0.14

src/pages/ComparePage.tsx: 0.14

src/components/support/triage/AiAnalysisCard.tsx: 0.14

src/components/support/automation/EmptyRuleState.tsx: 0.14

src/components/dashboards/admin/MetricCard.tsx: 0.14

src/pages/EnhancedDirectory.tsx: 0.14

src/components/ui/skeleton.tsx: 0.14

src/pages/admin/ProvidersPage.tsx: 0.14

src/components/provider/FaqCard.tsx: 0.13

src/pages/Onboarding.tsx: 0.13

src/components/dashboards/provider/PerformanceAnalyticsCard.tsx: 0.13

src/components/ui/page-transition.tsx: 0.13

src/components/dashboards/provider/UpgradeCtaCard.tsx: 0.13

src/components/dashboards/admin/ProviderTierChart.tsx: 0.13

src/components/faq/TopQuestions.tsx: 0.13

src/components/dashboards/StaffDashboard.tsx: 0.13

src/components/layout/Footer.tsx: 0.13

src/components/support/triage/ReplyInterface.tsx: 0.12

src/components/layout/ListItem.tsx: 0.12

src/components/FeaturedProviders.tsx: 0.12

src/components/ui/collapsible.tsx: 0.12

src/components/ui/error-boundary.tsx: 0.12

src/pages/FaqPage.tsx: 0.12

src/components/ui/switch.tsx: 0.12

src/components/ui/empty-state.tsx: 0.12

src/components/directory/MiniProfileCard.tsx: 0.12

src/components/directory/DirectoryMap.tsx: 0.12

src/components/faq/FaqCategory.tsx: 0.12

src/components/faq/FaqAccordion.tsx: 0.11

src/components/FeaturedProviderCard.tsx: 0.11

src/components/enhanced-directory/EnhancedProviderCard.tsx: 0.11

src/components/faq/EscalationCta.tsx: 0.11

src/components/admin/providers/columns.tsx: 0.11

src/components/ui/skeleton-loader.tsx: 0.11

src/components/admin/ai/AiToolsManager.tsx: 0.11

src/components/dashboards/admin/TopViewedProviders.tsx: 0.10

src/components/support/triage/EmptyTicketState.tsx: 0.10

src/components/directory/ComparisonBar.tsx: 0.10

src/components/ui/pagination.tsx: 0.10

src/components/dashboards/admin/EngagementByTypeChart.tsx: 0.10

src/components/admin/automation/AutomationCopilot.tsx: 0.10

src/components/ui/popover.tsx: 0.09

src/components/provider/TestimonialsCard.tsx: 0.09

src/components/ui/checkbox.tsx: 0.09

src/pages/BadgeShowcase.tsx: 0.09

src/components/ui/radio-group.tsx: 0.09

src/components/ui/progress-indicator.tsx: 0.09

src/components/made-with-dyad.tsx: 0.09

src/components/enhanced-directory/EnhancedDirectoryMap.tsx: 0.09

src/components/admin/analytics/TierPerformanceFunnel.tsx: 0.09

src/components/admin/insights/InsightAlertCenter.tsx: 0.08

src/components/ui/progress.tsx: 0.08

src/components/provider/AboutCard.tsx: 0.08

src/components/ui/breadcrumb.tsx: 0.08

src/components/dashboards/provider/AudienceOverviewCard.tsx: 0.08

src/components/dashboards/admin/AiAssistantAlerts.tsx: 0.08

src/components/dashboards/provider/LeadInboxCard.tsx: 0.08

src/components/AnalyticsTracker.tsx: 0.08

src/components/dashboards/provider/ResourceCardSkeleton.tsx: 0.07

src/components/ui/tooltip.tsx: 0.07

src/components/ui/loading-spinner.tsx: 0.06

src/components/admin/analytics/GeographicHeatmap.tsx: 0.06

src/components/ui/enhanced-tooltip.tsx: 0.06

src/components/ui/menubar.tsx: 0.05

src/components/ui/toggle.tsx: 0.05

src/components/ui/context-menu.tsx: 0.05

src/components/ui/carousel.tsx: 0.05

src/components/ui/toggle-group.tsx: 0.05

src/components/ui/resizable.tsx: 0.04

src/components/ui/calendar.tsx: 0.04

src/components/ui/slider.tsx: 0.04

src/pages/MarketingToolkit.tsx: 0.04

src/components/marketing/SocialMediaScheduler.tsx: 0.04

src/components/dashboards/provider/MarketingToolkitCtaCard.tsx: 0.04

src/components/ui/hover-card.tsx: 0.04

src/components/ui/success-animation.tsx: 0.04

src/hooks/use-mobile.tsx: 0.03

src/components/dashboards/provider/RoiCalculatorCard.tsx: 0.03

src/pages/NotFound.tsx: 0.02

src/components/ui/aspect-ratio.tsx: 0.02

src/components/marketing/ContentGenerator.tsx: 0.02</think><dyad-codebase-context files="src/types/provider-profile.ts,src/data/mock-providers.ts,src/components/provider-profiles/FreeProfile.tsx,src/components/provider-profiles/PreferredProfile.tsx,src/components/provider-profiles/PremierProfile.tsx,src/pages/ProviderProfileShowcase.tsx,src/pages/support/SupportDashboard.tsx"></dyad-codebase-context>  (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.provider_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(tierFeatures).map(([tier, features]) => (
              <Card key={tier} className={`${selectedTier === tier ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {tier} Tier
                    <Badge variant={tier === selectedTier ? 'default' : 'secondary'}>
                      {tier === selectedTier ? 'Viewing' : 'Available'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className={feature.startsWith('Everything') ? 'font-medium text-blue-600' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Display */}
      <div className="relative">
        {renderProfile()}
      </div>
    </div>
  );
};

export default ProviderProfileShowcase;