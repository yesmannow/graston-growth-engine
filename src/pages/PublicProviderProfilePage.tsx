"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FullProviderProfile } from '@/types/index';
import { mockProviders } from '@/lib/mockData';
import { AnimatePresence, motion } from 'framer-motion';

// Import the new component suite
import ProfileHeader from '@/components/provider/ProfileHeader';
import ProfileTabs from '@/components/provider/ProfileTabs';
import AboutCard from '@/components/provider/AboutCard';
import ContactCard from '@/components/provider/ContactCard';
import ServicesCard from '@/components/provider/ServicesCard';
import MediaCard from '@/components/provider/MediaCard';
import TestimonialsCard from '@/components/provider/TestimonialsCard';
import FaqCard from '@/components/provider/FaqCard';
import { Skeleton } from '@/components/ui/skeleton';

const PublicProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<FullProviderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      const foundProvider = mockProviders.find(p => p.id === id) || null;
      setProvider(foundProvider);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'media', label: 'Media Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'media':
        return <MediaCard media={provider?.media} />;
      case 'testimonials':
        return <TestimonialsCard testimonials={provider?.testimonials} />;
      case 'faq':
        return <FaqCard faqs={provider?.faqs} />;
      case 'overview':
      default:
        return <AboutCard bio={provider?.bio} />;
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!provider) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl font-bold">Provider Not Found</h2>
        <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="bg-muted/40">
      <ProfileHeader provider={provider} />
      
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <ContactCard provider={provider} />
            <ServicesCard services={provider.services} />
          </aside>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="bg-muted/40">
    {/* Header Skeleton */}
    <div className="w-full h-48 bg-muted" />
    <div className="container mx-auto -mt-20">
      <div className="flex items-end gap-4">
        <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
        <div className="pb-4 flex-1">
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
    
    {/* Body Skeleton */}
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex gap-4 border-b">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
        <div className="lg:col-span-4 space-y-8">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export default PublicProviderProfilePage;