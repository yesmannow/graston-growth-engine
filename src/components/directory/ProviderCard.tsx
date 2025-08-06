import { FullProviderProfile } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProviderCardProps {
  provider: FullProviderProfile;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const navigate = useNavigate();

  const tierColors: Record<string, string> = {
    Premier: "bg-purple-600 hover:bg-purple-700 text-white",
    Preferred: "bg-blue-500 hover:bg-blue-600 text-white",
    Free: "bg-gray-500 hover:bg-gray-600 text-white",
  };

  const handleClick = () => {
    navigate(`/directory/provider/${provider.id}`);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={provider.profileImage} alt={provider.name} />
            <AvatarFallback>
              {provider.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base truncate">{provider.name}</h3>
              <Badge className={tierColors[provider.tier]}>
                {provider.tier}
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground mt-1">
              {provider.specialty}
              {provider.clinicianType && provider.clinicianType !== "Other" && (
                <span> • {provider.clinicianType}</span>
              )}
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{provider.location}</span>
            </div>
            
            {provider.rating && (
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(provider.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs ml-1">
                  {provider.rating.toFixed(1)} 
                  {provider.reviewCount && (
                    <span className="text-muted-foreground"> ({provider.reviewCount})</span>
                  )}
                </span>
              </div>
            )}
            
            {provider.languagesSpoken && provider.languagesSpoken.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {provider.languagesSpoken.map(language => (
                  <Badge key={language} variant="outline" className="text-xs py-0 h-5">
                    {language}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3 pt-3 border-t">
          <div className="flex gap-2">
            {provider.contactInfo?.phone && (
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
            )}
            {provider.contactInfo?.website && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
                <a 
                  href={provider.contactInfo.website.startsWith('http') 
                    ? provider.contactInfo.website 
                    : `https://${provider.contactInfo.website}`
                  } 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Website
                </a>
              </Button>
            )}
          </div>
          <Button size="sm" className="h-8 text-xs">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;