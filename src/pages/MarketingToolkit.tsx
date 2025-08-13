import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wand2, Package, Rocket, Star, BookOpen, Zap } from "lucide-react";
import { mockProviders } from "@/lib/mockData";
import { Tier } from "@/types";

// Import all marketing components
import BrandAssetLibrary from "@/components/marketing/BrandAssetLibrary";
import ContentGenerator from "@/components/marketing/ContentGenerator";
import CampaignInABox from "@/components/marketing/CampaignInABox";
import ReputationManager from "@/components/marketing/ReputationManager";
import PatientEducation from "@/components/marketing/PatientEducation";
import UpgradeCard from "@/components/marketing/UpgradeCard";
import AiMarketingCoach from "@/components/marketing/AiMarketingCoach";

const MarketingToolkit = () => {
  const { id } = useParams<{ id: string }>();
  // In a real app, you'd fetch this. For now, we'll find it in mock data.
  const provider = mockProviders.find(p => p.id === id);
  const userTier: Tier = provider?.tier || 'Free';

  const isPremier = userTier === 'Premier';

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Marketing Toolkit</h1>
            <p className="text-muted-foreground">
              AI-powered tools to supercharge your practice's marketing efforts
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Your Tier: {userTier}</Badge>
          {isPremier && <Badge variant="outline">AI Coach Enabled</Badge>}
        </div>
      </div>

      {isPremier && <AiMarketingCoach />}

      <Tabs defaultValue="assets" className="mt-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="assets"><Package className="h-4 w-4 mr-2" />Brand Assets</TabsTrigger>
          <TabsTrigger value="content-ai"><Wand2 className="h-4 w-4 mr-2" />Content AI</TabsTrigger>
          <TabsTrigger value="campaigns"><Rocket className="h-4 w-4 mr-2" />Campaigns</TabsTrigger>
          <TabsTrigger value="reputation"><Star className="h-4 w-4 mr-2" />Reputation</TabsTrigger>
          <TabsTrigger value="education"><BookOpen className="h-4 w-4 mr-2" />Patient Ed</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="mt-6">
          <BrandAssetLibrary />
        </TabsContent>
        <TabsContent value="content-ai" className="mt-6">
          {isPremier ? <ContentGenerator /> : <UpgradeCard featureName="the AI Content Generator" />}
        </TabsContent>
        <TabsContent value="campaigns" className="mt-6">
          {isPremier ? <CampaignInABox /> : <UpgradeCard featureName="Campaign-in-a-Box" />}
        </TabsContent>
        <TabsContent value="reputation" className="mt-6">
          {isPremier ? <ReputationManager /> : <UpgradeCard featureName="the Reputation Suite" />}
        </TabsContent>
        <TabsContent value="education" className="mt-6">
          {isPremier ? <PatientEducation /> : <UpgradeCard featureName="White-Label Education" />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingToolkit;