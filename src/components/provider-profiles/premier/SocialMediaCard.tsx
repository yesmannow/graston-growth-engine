import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface SocialMediaCardProps {
  provider: ProviderProfile;
}

const getSocialIcon = (platform: string) => {
  const icons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram
  };
  return icons[platform as keyof typeof icons] || Globe;
};

const SocialMediaCard = ({ provider }: SocialMediaCardProps) => {
  if (!provider.social_media) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {Object.entries(provider.social_media).map(([platform, url]) => {
            if (!url) return null;
            const Icon = getSocialIcon(platform);
            return (
              <Button key={platform} variant="outline" size="sm" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaCard;