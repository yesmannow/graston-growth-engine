import { FullProviderProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopViewedProvidersProps {
  providers: FullProviderProfile[];
}

const TopViewedProviders = ({ providers }: TopViewedProvidersProps) => {
  const navigate = useNavigate();
  const topProviders = [...providers]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {topProviders.map((provider) => (
          <li 
            key={provider.id} 
            className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
            onClick={() => navigate(`/provider/${provider.id}`)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={provider.profileImage} alt={provider.name} />
                <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{provider.name}</p>
                <p className="text-xs text-muted-foreground">{provider.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{provider.views?.toLocaleString() || 0}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopViewedProviders;