import { useParams } from "react-router-dom";
import { FullProviderProfile } from "@/types";
import ProfileSidebar from "@/components/provider/ProfileSidebar";
import { useState, useEffect } from "react";
import AboutCard from "@/components/provider/AboutCard";
import ServicesCard from "@/components/provider/ServicesCard";
import MediaCard from "@/components/provider/MediaCard";
import TestimonialsCard from "@/components/provider/TestimonialsCard";
import FaqCard from "@/components/provider/FaqCard";
import ContactCard from "@/components/provider/ContactCard";
import { Skeleton } from "@/components/ui/skeleton";
import { showSuccess } from "@/utils/toast";
import { mockProviders } from "@/lib/mockData";

const PublicProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  
  const [provider, setProvider] = useState<FullProviderProfile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProvider = mockProviders.find(p => p.id === id);
      setProvider(foundProvider);
    }
    setIsLoading(false);
  }, [id]);

  // Local state for favorite, as it's not tied to a logged-in user on this public page
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (provider) {
      setIsFavorite(provider.isFavorite || false);
    }
  }, [provider]);

  const handleToggleFavorite = (providerId: string) => {
    setIsFavorite(prev => !prev);
    showSuccess("Favorite status updated for this session.");
  };

  if (isLoading) {
    return (
      <div className="bg-muted/20">
        <div className="container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-1 sticky top-8">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="lg:col-span-3 space-y-8">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Provider not found</h1>
        <p>The provider you are looking for does not exist.</p>
      </div>
    );
  }

  // Create a display provider object that combines fetched data with local state
  const displayProvider = { ...provider, isFavorite };

  return (
    <div className="bg-muted/20">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ProfileSidebar provider={displayProvider} onToggleFavorite={handleToggleFavorite} />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <AboutCard provider={displayProvider} />
            
            {displayProvider.services && displayProvider.services.length > 0 && (
              <ServicesCard services={displayProvider.services} />
            )}

            {displayProvider.tier === 'Premier' && (displayProvider.galleryImages || displayProvider.galleryVideos) && (
              <MediaCard 
                galleryImages={displayProvider.galleryImages || []} 
                galleryVideos={displayProvider.galleryVideos || []} 
              />
            )}

            {displayProvider.testimonials && displayProvider.testimonials.length > 0 && (
              <TestimonialsCard testimonials={displayProvider.testimonials} />
            )}

            {displayProvider.faqs && displayProvider.faqs.length > 0 && (
              <FaqCard faqs={displayProvider.faqs} />
            )}
            
            {displayProvider.tier === 'Premier' && (
              <div id="contact-form">
                <ContactCard provider={displayProvider} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProviderProfilePage;