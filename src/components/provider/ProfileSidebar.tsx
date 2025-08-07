import React from 'react';
import { FullProviderProfile, Tier, TrainingLevel } from '@/types';
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
      navigator.clipboard.writeText(window.location.href);
      showSuccess("Profile link copied to clipboard!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Provider Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="space-y-3">
          {provider.phone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <a href={`tel:${provider.phone}`} className="hover:underline">
                {provider.phone}
              </a>
            </div>
          )}
          {provider.email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <a href={`mailto:${provider.email}`} className="hover:underline">
                {provider.email}
              </a>
            </div>
          )}
          {provider.website && (
            <div className="flex items-center gap-3 text-sm">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <a href={provider.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Visit Website
              </a>
            </div>
          )}
          {provider.clinicAddress && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <span>{provider.clinicAddress}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Certifications */}
        <div className="space-y-3">
          <h3 className="font-semibold">Graston Technique®</h3>
          {provider.gtCertifications && provider.gtCertifications.length > 0 ? (
            <div className="flex flex-col gap-2">
              {provider.gtCertifications.map((cert, index) => (
                <Badge key={index} variant="secondary" className="py-1 px-2 text-sm">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  {gtCertificationLabels[cert]}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No GT® certifications listed.</p>
          )}
        </div>

        {/* Accreditations */}
        {provider.accreditationLogos && provider.accreditationLogos.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="font-semibold">Accreditations</h3>
              <div className="flex flex-wrap gap-2">
                {provider.accreditationLogos.map((acc, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <a href={acc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 border rounded-md hover:bg-muted transition-colors">
                        <img src={acc.logoUrl} alt={acc.name} className="h-10 object-contain" />
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => onToggleFavorite(provider.id)}
          >
            <Heart className={`h-4 w-4 ${provider.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            Favorite
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          {provider.canCompare && (
            <Button variant="outline" className="w-full flex items-center gap-2 col-span-2">
              <Award className="h-4 w-4" />
              Add to Compare
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;