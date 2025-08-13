import React from 'react';
import { Tier } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// It's better to place these in the public directory
const badgeImages: Record<Tier, string> = {
  Premier: '/images/PremierBadge_01-04.png',
  Preferred: '/images/PreferredBadge_01.webp',
  Free: '', // No image for Free tier
};

interface TierBadgeProps {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'h-12 w-12',
  md: 'h-20 w-20',
  lg: 'h-28 w-28',
};

const TierBadge: React.FC<TierBadgeProps> = ({ tier, size = 'md' }) => {
  if (tier === 'Free') {
    return (
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Basic Listing
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <img
            src={badgeImages[tier]}
            alt={`${tier} Provider Badge`}
            className={`${sizeMap[size]} object-contain`}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tier} Certified Provider</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TierBadge;