import { motion } from "framer-motion";
import { FullProviderProfile } from "@/types";
import { EnhancedCard, EnhancedCardContent, EnhancedCardFooter } from "@/components/ui/enhanced-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedTooltip, EnhancedTooltipContent, EnhancedTooltipTrigger } from "@/components/ui/enhanced-tooltip";
import { MapPin, Star, Phone, Globe, Heart, Eye, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface EnhancedProviderCardProps {
  provider: FullProviderProfile;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onToggleFavorite: (providerId: string) => void;
  onToggleCompare: (providerId: string) => void;
  isComparing: boolean;
  viewMode?: 'grid' | 'list';
}

const EnhancedProviderCard = ({ 
  provider, 
  onMouseEnter, 
  onMouseLeave, 
  onToggleFavorite, 
  onToggleCompare, 
  isComparing,
  viewMode = 'grid'
}: EnhancedProviderCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    navigate(`/directory/provider/${provider.id}`);
  };

  const tierColors = {
    Premier: "from-purple-600 to-blue-500",
    Preferred: "from-blue-600 to-cyan-500", 
    Free: "from-gray-400 to-gray-500"
  };

  // Premier tier - Premium card design
  if (provider.tier === 'Premier') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgb(0 0 0 / 0.25)" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl"
        onClick={handleClick}
      >
        {/* Cover with gradient */}
        <div className={`relative h-32 bg-gradient-to-r ${tierColors[provider.tier]}`}>
          <motion.div
            className="absolute inset-0 bg-black/20"
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <Badge className="absolute top-3 right-3 bg-white/90 text-purple-700 hover:bg-white">
            {provider.tier}
          </Badge>
          
          {/* Avatar */}
          <motion.div
            className="absolute bottom-0 left-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage 
                src={provider.profileImage} 
                alt={provider.name}
                onLoad={() => setImageLoaded(true)}
              />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-100 to-blue-100">
                {provider.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        {/* Content */}
        <div className="pt-16 px-6 pb-4">
          <motion.h2 
            className="text-xl font-bold text-gray-900 truncate group-hover:text-primary transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            {provider.name}
          </motion.h2>
          <p className="text-sm text-gray-600 mt-1 truncate">{provider.specialty}</p>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <MapPin className="w-4 h-4 mr-1" />
            {provider.location}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 px-6 pb-4 text-center">
          <EnhancedTooltip>
            <EnhancedTooltipTrigger>
              <div className="cursor-help">
                <div className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {provider.rating?.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
            </EnhancedTooltipTrigger>
            <EnhancedTooltipContent>
              Based on {provider.reviewCount} patient reviews
            </EnhancedTooltipContent>
          </EnhancedTooltip>

          <EnhancedTooltip>
            <EnhancedTooltipTrigger>
              <div className="cursor-help">
                <div className="text-lg font-semibold text-gray-900">{provider.reviewCount}</div>
                <div className="text-xs text-gray-500">Reviews</div>
              </div>
            </EnhancedTooltipTrigger>
            <EnhancedTooltipContent>
              Patient testimonials and feedback
            </EnhancedTooltipContent>
          </EnhancedTooltip>

          <EnhancedTooltip>
            <EnhancedTooltipTrigger>
              <div className="cursor-help">
                <div className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-1">
                  <Eye className="h-4 w-4" />
                  {provider.views || 0}
                </div>
                <div className="text-xs text-gray-500">Views</div>
              </div>
            </EnhancedTooltipTrigger>
            <EnhancedTooltipContent>
              Profile views this month
            </EnhancedTooltipContent>
          </EnhancedTooltip>
        </div>

        {/* Bio */}
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
            {provider.bio}
          </p>
        </div>

        {/* Actions */}
        <div className="border-t px-6 py-4 bg-gray-50/50 flex justify-between items-center">
          <div className="flex gap-2">
            <EnhancedTooltip>
              <EnhancedTooltipTrigger asChild>
                <EnhancedButton 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`tel:${provider.phone}`);
                  }}
                >
                  <Phone className="h-4 w-4" />
                </EnhancedButton>
              </EnhancedTooltipTrigger>
              <EnhancedTooltipContent>Call {provider.name}</EnhancedTooltipContent>
            </EnhancedTooltip>

            <EnhancedTooltip>
              <EnhancedTooltipTrigger asChild>
                <EnhancedButton 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(provider.website, '_blank');
                  }}
                >
                  <Globe className="h-4 w-4" />
                </EnhancedButton>
              </EnhancedTooltipTrigger>
              <EnhancedTooltipContent>Visit website</EnhancedTooltipContent>
            </EnhancedTooltip>

            <EnhancedTooltip>
              <EnhancedTooltipTrigger asChild>
                <EnhancedButton 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(provider.id);
                  }}
                >
                  <Heart className={`h-4 w-4 transition-colors ${provider.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </EnhancedButton>
              </EnhancedTooltipTrigger>
              <EnhancedTooltipContent>
                {provider.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              </EnhancedTooltipContent>
            </EnhancedTooltip>
          </div>

          {provider.can_compare && (
            <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
              <Checkbox 
                id={`compare-${provider.id}`} 
                checked={isComparing} 
                onCheckedChange={() => onToggleCompare(provider.id)}
                className="data-[state=checked]:bg-primary"
              />
              <Label htmlFor={`compare-${provider.id}`} className="text-sm cursor-pointer">
                Compare
              </Label>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Preferred tier - Clean card design
  if (provider.tier === 'Preferred') {
    return (
      <EnhancedCard 
        hoverable 
        clickable
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group"
      >
        <EnhancedCardContent className="p-4">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={provider.profileImage} alt={provider.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-cyan-100">
                  {provider.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                {provider.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">{provider.specialty}</p>
              <div className="flex items-center mt-2 gap-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{provider.rating?.toFixed(1)}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {provider.tier}
                </Badge>
              </div>
            </div>
          </div>
        </EnhancedCardContent>
        
        {provider.can_compare && (
          <EnhancedCardFooter className="p-4 border-t bg-muted/20" onClick={e => e.stopPropagation()}>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`compare-${provider.id}`} 
                checked={isComparing} 
                onCheckedChange={() => onToggleCompare(provider.id)}
              />
              <Label htmlFor={`compare-${provider.id}`} className="text-sm cursor-pointer">
                Compare Provider
              </Label>
            </div>
          </EnhancedCardFooter>
        )}
      </EnhancedCard>
    );
  }

  // Free tier - Minimal design
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px -2px rgb(0 0 0 / 0.1)" }}
      className="p-4 bg-white rounded-lg border hover:border-primary/30 cursor-pointer transition-all duration-200"
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={provider.profileImage} alt={provider.name} />
          <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base truncate hover:text-primary transition-colors">
            {provider.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{provider.specialty}</p>
          <div className="flex items-center mt-1">
            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">{provider.location}</span>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {provider.tier}
        </Badge>
      </div>
    </motion.div>
  );
};

export default EnhancedProviderCard;