import { FullProviderProfile } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Phone, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProviderCardProps {
  provider: FullProviderProfile;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onToggleFavorite: (providerId: string) => void;
  onToggleCompare: (providerId: string) => void;
  isComparing: boolean;
}

const ProviderCard = ({ provider, onMouseEnter, onMouseLeave, onToggleFavorite, onToggleCompare, isComparing }: ProviderCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/directory/provider/${provider.id}`);
  };

  // Tier-specific templates
  if (provider.tier === 'Premier') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow" onClick={handleClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {/* Cover + Avatar */}
        <div className="relative h-32 bg-gradient-to-r from-purple-600 to-blue-500">
          <img
            className="absolute bottom-0 left-4 h-24 w-24 rounded-full border-4 border-white object-cover"
            src={provider.profileImage}
            alt={provider.name}
          />
        </div>
        <div className="pt-16 px-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 truncate">{provider.name}</h2>
          <p className="text-sm text-gray-600 mt-1 truncate">{provider.specialty}</p>
          <p className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-4 h-4 mr-1" />{provider.location}
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-4 px-6 pb-4 text-center">
          <div>
            <dt className="text-lg font-semibold text-gray-900">{provider.rating?.toFixed(1)}</dt>
            <dd className="text-xs text-gray-500">Rating</dd>
          </div>
          <div>
            <dt className="text-lg font-semibold text-gray-900">{provider.reviewCount}</dt>
            <dd className="text-xs text-gray-500">Reviews</dd>
          </div>
          <div>
            <dt className="text-lg font-semibold text-gray-900">{provider.activity}</dt>
            <dd className="text-xs text-gray-500">Activity</dd>
          </div>
        </dl>
        <div className="px-6 pb-4"><p className="text-sm text-gray-700 line-clamp-3">{provider.bio}</p></div>
        <div className="border-t px-6 py-3 bg-gray-50 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={e => e.stopPropagation()}><Phone className="h-5 w-5 mr-1"/>Call</Button>
          <Button variant="ghost" size="sm" asChild><a href={provider.website} target="_blank" rel="noopener"><Globe className="h-5 w-5 mr-1"/>Website</a></Button>
          <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); onToggleFavorite(provider.id); }}><Heart className={`h-5 w-5 ${provider.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}/></Button>
          {provider.can_compare && (
            <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
              <Checkbox id={`compare-${provider.id}`} checked={isComparing} onCheckedChange={() => onToggleCompare(provider.id)} />
              <Label htmlFor={`compare-${provider.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">Compare</Label>
            </div>
          )}
        </div>
      </div>
    );
  }
  if (provider.tier === 'Preferred') {
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col" onClick={handleClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <CardContent className="p-4 flex items-center gap-3 flex-grow">
          <Avatar className="h-12 w-12"><AvatarImage src={provider.profileImage} alt={provider.name}/><AvatarFallback>{provider.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback></Avatar>
          <div className="flex-1">
            <h3 className="font-semibold truncate">{provider.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{provider.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-xs ml-1">{provider.rating?.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
        {provider.can_compare && (
          <CardFooter className="p-4 border-t" onClick={e => e.stopPropagation()}>
            <div className="flex items-center space-x-2">
              <Checkbox id={`compare-${provider.id}`} checked={isComparing} onCheckedChange={() => onToggleCompare(provider.id)} />
              <Label htmlFor={`compare-${provider.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">Compare</Label>
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
  // Free tier minimal
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <h3 className="font-medium text-base truncate">{provider.name}</h3>
      <p className="text-sm text-muted-foreground truncate">{provider.specialty}</p>
    </div>
  );
};

export default ProviderCard;