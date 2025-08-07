import { FullProviderProfile } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProviderCardProps {
  provider: FullProviderProfile;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered: boolean;
}

const ProviderCard = ({ provider, onMouseEnter, onMouseLeave, isHovered }: ProviderCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/directory/provider/${provider.id}`);
  };

  return (
    <Card 
      className={`transition-all duration-300 cursor-pointer overflow-hidden ${isHovered ? 'shadow-2xl scale-[1.02] border-brand-primary' : 'shadow-md'}`}
      onClick={handleClick} 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
    >
      <CardContent className="p-4 flex flex-col sm:flex-row items-start gap-4">
        <Avatar className="h-20 w-20 border-2 border-brand-light-gray">
          <AvatarImage src={provider.profileImage} alt={provider.name} />
          <AvatarFallback className="text-2xl bg-brand-light-gray text-brand-dark-blue">
            {provider.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold font-heading text-brand-dark-blue truncate">{provider.name}</h3>
          <p className="text-sm text-brand-primary font-semibold truncate">{provider.specialty}</p>
          
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
            <span className="text-sm font-bold text-brand-text">{provider.rating?.toFixed(1)}</span>
            <span className="text-xs text-brand-light-gray">|</span>
            <span className="text-xs text-muted-foreground">{provider.reviewCount} Reviews</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            {provider.conditionsTreated?.slice(0, 3).map(condition => (
              <Badge key={condition} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                {condition}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <div className="px-4 pb-4">
        <Button className="w-full bg-brand-cta hover:bg-orange-600 text-white font-bold">
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default ProviderCard;