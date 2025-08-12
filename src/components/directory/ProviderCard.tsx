import { FullProviderProfile } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import TierBadge from "@/components/TierBadge";

interface ProviderCardProps {
  provider: FullProviderProfile;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ProviderCard = ({ provider, onMouseEnter, onMouseLeave }: ProviderCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/directory/provider/${provider.id}`);
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-brand-teal flex flex-col"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 border-2 border-brand-gray">
            <AvatarImage src={provider.profile_image || undefined} alt={provider.name}/>
            <AvatarFallback>{provider.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-heading text-xl font-bold text-brand-blue">{provider.name}</h3>
              {provider.tier && <TierBadge tier={provider.tier} />}
            </div>
            <p className="text-md text-brand-text/90 font-semibold">{provider.specialty}</p>
            <div className="flex items-center mt-1 text-sm">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-bold text-brand-text">{provider.rating?.toFixed(1)}</span>
              <span className="text-brand-text/70 ml-1.5">({provider.review_count} reviews)</span>
            </div>
            {provider.accepting_new_patients !== null && (
              <div className="mt-2">
                {provider.accepting_new_patients ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Accepting New Patients</Badge>
                ) : (
                  <Badge variant="secondary">Not Accepting New Patients</Badge>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {provider.services?.slice(0, 3).map(service => (
            <Badge key={service} variant="secondary" className="bg-brand-gray/20 text-brand-blue font-body">{service}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-gray-50 border-t">
        <Button 
          onClick={handleViewProfile}
          className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-heading font-bold text-lg py-6"
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderCard;