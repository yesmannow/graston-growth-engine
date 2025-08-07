import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tier } from '@/types';

interface TierBadgeProps {
  tier: Tier;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  let variant: "default" | "secondary" | "outline" | "destructive" = "secondary";
  let className = "";

  switch (tier) {
    case "Premier":
      className = "bg-purple-500 text-white hover:bg-purple-600";
      break;
    case "Preferred":
      className = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "Free":
      className = "bg-gray-300 text-gray-800 hover:bg-gray-400";
      break;
    default:
      variant = "secondary";
  }

  return (
    <Badge variant={variant} className={className}>
      {tier}
    </Badge>
  );
};

export default TierBadge;