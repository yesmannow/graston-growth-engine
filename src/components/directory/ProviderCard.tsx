import { FullProviderProfile } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Heart } from "lucide-react";
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

const ProviderCard = ({ 
  provider, 
  onMouseEnter, 
  onMouseLeave,
  onToggleFavorite,
  onToggleCompare,
  isComparing
}: ProviderCardProps) => {
  const navigate = useNavigate();

  const tierColorMap: Record<string, string> = {
    Premier: "border-purple-500",
    Preferred: "border-blue-500",
    Free: "border-gray-300",
  };

  return (
    <Card 
      className={`flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${tierColorMap[provider.tier]}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardHeader className="p-4">
        <div className="flex items-start gap-4">
          <img
            src={provider.profileImage}
            alt={provider.name}
            className="w-20 h-20 rounded-lg object-cover cursor-pointer"
            onClick={() => navigate(`/provider/${provider.id}`)}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <CardTitle 
                className="text-lg font-bold cursor-pointer hover:text-primary"
                onClick={() => navigate(`/provider/${provider.id}`)}
              >
                {provider.name}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onToggleFavorite(provider.id)}>
                <Heart className={`h-5 w-5 ${provider.isFavorite ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold">{provider.rating?.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground ml-1">({provider.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{provider.location}</span>
        </div>
        <p className="text-sm text-foreground line-clamp-3">
          {provider.bio}
        </p>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {provider.can_compare && (
            <>
              <Checkbox 
                id={`compare-${provider.id}`} 
                checked={isComparing} 
                onCheckedChange={() => onToggleCompare(provider.id)}
              />
              <Label htmlFor={`compare-${provider.id}`} className="text-sm font-medium">Compare</Label>
            </>
          )}
        </div>
        <Button onClick={() => navigate(`/provider/${provider.id}`)}>
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderCard;