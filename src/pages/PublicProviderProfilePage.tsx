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
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Linkedin, Facebook as FbIcon, Instagram, Twitter } from 'lucide-react';
import ProviderMap from '@/components/provider/ProviderMap';
import { AccreditationLogo } from '@/types';

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

  const handleToggleFavorite = () => {
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

            {displayProvider.tier === 'Premier' && (displayProvider.gallery_images || displayProvider.gallery_videos) && (
              <MediaCard 
                galleryImages={displayProvider.gallery_images || []} 
                galleryVideos={displayProvider.gallery_videos || []} 
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
            {/* Additional Information Section */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Additional Information</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {displayProvider.clinic_address && (
                  <div><span className="font-semibold">Address:</span> {displayProvider.clinic_address}</div>
                )}
                {displayProvider.coordinates && (
                  <div className="w-full h-64">
                    <ProviderMap
                      coordinates={displayProvider.coordinates}
                      name={displayProvider.name}
                    />
                  </div>
                )}
                {displayProvider.verification_badges && displayProvider.verification_badges.length > 0 && (
                  <div>
                    <span className="font-semibold">Badges:</span>
                    {displayProvider.verification_badges.map((url: string, i: number) => (
                      <img key={i} src={url} alt="Badge" className="inline-block h-6 mx-1" />
                    ))}
                  </div>
                )}
                {displayProvider.accreditation_logos && displayProvider.accreditation_logos.length > 0 && (
                  <div>
                    <span className="font-semibold">Accreditations:</span>
                    {displayProvider.accreditation_logos.map((a: AccreditationLogo) => (
                      <img key={a.name} src={a.logoUrl} alt={a.name} className="inline-block h-6 mx-1" />
                    ))}
                  </div>
                )}
                {(displayProvider.linkedin || displayProvider.facebook || displayProvider.instagram || displayProvider.twitter) && (
                  <div className="flex items-center gap-4">
                    {displayProvider.linkedin && (
                      <a href={displayProvider.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-6 w-6 text-blue-700" />
                      </a>
                    )}
                    {displayProvider.facebook && (
                      <a href={displayProvider.facebook} target="_blank" rel="noopener noreferrer">
                        <FbIcon className="h-6 w-6 text-blue-800" />
                      </a>
                    )}
                    {displayProvider.instagram && (
                      <a href={displayProvider.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-6 w-6 text-pink-500" />
                      </a>
                    )}
                    {displayProvider.twitter && (
                      <a href={displayProvider.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-6 w-6 text-blue-400" />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProviderProfilePage;