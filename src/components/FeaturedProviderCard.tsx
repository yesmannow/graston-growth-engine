import { FullProviderProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface FeaturedProviderCardProps {
  provider: FullProviderProfile;
}

const FeaturedProviderCard = ({ provider }: FeaturedProviderCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-card text-card-foreground rounded-xl border shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col"
      onClick={() => navigate(`/directory/provider/${provider.id}`)}
    >
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={provider.profileImage} alt={provider.name} />
            <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{provider.name}</h3>
            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4 line-clamp-3">
          {provider.bio || "This provider has not yet added a biography."}
        </p>
      </div>
      <div className="p-6 pt-0 border-t mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {provider.location}
        </div>
        <Button variant="secondary" size="sm">View Profile</Button>
      </div>
    </div>
  );
};

export default FeaturedProviderCard;