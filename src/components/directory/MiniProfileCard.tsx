import { FullProviderProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MiniProfileCardProps {
  provider: FullProviderProfile;
}

const MiniProfileCard = ({ provider }: MiniProfileCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-1 font-sans">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={provider.profile_image || undefined} alt={provider.name} />
          <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{provider.name}</p>
          <p className="text-xs text-gray-500 truncate">{provider.specialty}</p>
        </div>
      </div>
      <Button 
        className="w-full mt-3 h-8 text-xs"
        onClick={() => navigate(`/directory/provider/${provider.id}`)}
      >
        View Profile
      </Button>
    </div>
  );
};

export default MiniProfileCard;