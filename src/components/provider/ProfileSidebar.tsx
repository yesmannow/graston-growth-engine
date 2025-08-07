import React from 'react';
import { FullProviderProfile, Tier, TrainingLevel, Accreditation } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Globe, Heart, Share2, CheckCircle, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { showSuccess, showError } from '@/utils/toast';

interface ProfileSidebarProps {
  provider: FullProviderProfile;
  onToggleFavorite: (providerId: string) => void;
}

const tierColors: { [key in Tier]: string } = {
  Premier: "bg-purple-600 hover:bg-purple-700 text-white",
  Preferred: "bg-blue-500 hover:bg-blue-600 text-white",
  Free: "bg-gray-500 hover:bg-gray-600 text-white",
};

const gtCertificationLabels: { [key in TrainingLevel]: string } = {
  GTS: "Graston Technique Specialist (GTS)",
  Advanced: "Advanced Certified",
  Essential: "Essential Certified",
};

const ProfileSidebar = ({ provider, onToggleFavorite }: ProfileSidebarProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: provider.name,
          text: `Check out ${provider.name}'s profile on Graston Technique Directory!`,
          url: window.location.href,
        });
        showSuccess("Profile shared successfully!");
      } catch (error) {
        console.error('Error sharing:', error);
        showError("Failed to share profile.");
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      showSuccess("Profile link copied to clipboard!");
    }
  };

  return (
    <Card className="sticky top-4 lg:top-24 space-y-4">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Contact & Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {provider.contactInfo?.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${provider.contactInfo.phone}`} className="hover:underline">
              {provider.contactInfo.phone}
            </a>
          </div>
        )}
        {provider.contactInfo?.email && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${provider.contactInfo.email}`} className="hover:underline">
              {provider.contactInfo.email}
            </a>
          </div>
        )}
        {provider.contactInfo?.website && (
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <a href={provider.contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Visit Website
            </a>
          </div>
        )}
        {provider.clinicAddress && (
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
            <span>{provider.clinicAddress}</span>
          </div>
        )}

        <Separator />

        <div className="space-y-3">
          <h3 className="font-semibold text-base">Graston Technique® Certification</h3>
          {provider.gtCertifications && provider.gtCertifications.length > 0 ? (
            <div className="flex flex-col gap-2">
              {provider.gtCertifications.map((cert, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2 justify-start">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {gtCertificationLabels[cert]}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No Graston Technique® certifications listed.</p>
          )}
        </div>

        {provider.verificationBadges && provider.verificationBadges.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Verification & Badges</h3>
              <div className="flex flex-col gap-2">
                {provider.verificationBadges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-2 justify-start">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {provider.accreditationLogos && provider.accreditationLogos.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Accreditations</h3>
              <div className="grid grid-cols-2 gap-4">
                {provider.accreditationLogos.map((acc, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <a href={acc.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-2 border rounded-md hover:bg-muted transition-colors">
                        <img src={acc.logoUrl} alt={acc.name} className="h-12 object-contain mb-1" />
                        <span className="text-xs text-center text-muted-foreground">{acc.name}</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{acc.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        <div className="flex flex-col gap-3">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => onToggleFavorite(provider.id)}
          >
            <Heart className={`h-4 w-4 ${provider.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            {provider.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share Profile
          </Button>
          {provider.canCompare && (
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Award className="h-4 w-4" />
              Compare Provider
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;