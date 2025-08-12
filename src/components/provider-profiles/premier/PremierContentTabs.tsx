import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProviderProfile } from '@/types/provider-profile';
import OverviewTab from './OverviewTab';
import GalleryTab from './GalleryTab';
import ArticlesTab from './ArticlesTab';
import EventsTab from './EventsTab';
import TestimonialsTab from './TestimonialsTab';
import FaqTab from './FaqTab';

interface PremierContentTabsProps {
  provider: ProviderProfile;
}

const PremierContentTabs = ({ provider }: PremierContentTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="articles">Articles</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="testimonials">Reviews</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab provider={provider} />
      </TabsContent>
      <TabsContent value="gallery">
        <GalleryTab provider={provider} />
      </TabsContent>
      <TabsContent value="articles">
        <ArticlesTab provider={provider} />
      </TabsContent>
      <TabsContent value="events">
        <EventsTab provider={provider} />
      </TabsContent>
      <TabsContent value="testimonials">
        <TestimonialsTab provider={provider} />
      </TabsContent>
      <TabsContent value="faq">
        <FaqTab provider={provider} />
      </TabsContent>
    </Tabs>
  );
};

export default PremierContentTabs;