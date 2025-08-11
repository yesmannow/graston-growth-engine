import React from 'react';
import { FullProviderProfile, Tier, AccreditationLogo } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Heart, Share2, Mail, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { showSuccess, showError } from '@/utils/toast';

interface ProfileSidebarProps {
  provider: FullProviderProfile;
  onToggleFavorite: (providerId: string) => void;
}

const tierColors: Record<Tier, string> = {
  Premier: "border-purple-500 bg-purple-50 text-purple-700",
  Preferred: "border-blue-500 bg-blue-50 text-blue-700",
  Free: "border-gray-400 bg-gray-50 text-gray-600",
};

const ProfileSidebar = ({ provider, onToggleFavorite }: ProfileSidebarProps) => {
  const handleShare = async () => {
    const shareData = {
      title: provider.name,
      text: `Check out ${provider.name}'s profile on the Graston Technique® Provider Directory!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showSuccess("Profile shared successfully!");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showSuccess("Profile link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      showError("Could not share profile at this time.");
    }
  };

  const handleContactClick = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!provider.tier) return null;

  return (
    <TooltipProvider>
      <Card className="overflow-hidden">
        <CardContent className="p-6 text-center">
          <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-background shadow-md">
            <AvatarImage src={provider.profile_image || undefined} alt={provider.name} />
            <AvatarFallback className="text-4xl">
              {provider.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold text-foreground">{provider.name}</h1>
          <p className="text-md text-muted-foreground">{provider.specialty}</p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
            <MapPin className="h-4 w-4" />
            <span>{provider.location}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <Badge variant="outline" className={`font-semibold ${tierColors[provider.tier]}`}>
              {provider.tier} Provider
            </Badge>
            {provider.verification_badges?.includes('Verified') && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-500">
                    <ShieldCheck className="h-4 w-4 mr-1.5" />
                    Verified
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This provider's credentials have been verified.</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>

        <Separator />

        <CardContent className="p-4 space-y-4">
          {provider.tier === 'Premier' && (
            <Button size="lg" className="w-full" onClick={handleContactClick}>
              <Mail className="mr-2 h-4 w-4" /> Contact Provider
            </Button>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={provider.isFavorite ? "default" : "outline"} 
              className="w-full flex items-center gap-2"
              onClick={() => onToggleFavorite(provider.id)}
            >
              <Heart className={`h-4 w-4 ${provider.isFavorite ? 'fill-white' : ''}`} />
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
          </div>
        </CardContent>

        {provider.accreditation_logos && provider.accreditation_logos.length > 0 && (
          <>
            <Separator />
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-center text-muted-foreground mb-3">Accreditations</h3>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {provider.accreditation_logos?.map((acc: AccreditationLogo, index: number) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <a href={acc.url} target="_blank" rel="noopener noreferrer">
                        <img src={acc.logoUrl} alt={acc.name} className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{acc.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </TooltipProvider>
  );
};

export default ProfileSidebar;