import React from "react";
import { Provider } from "@/types/provider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface ProfileHeaderProps {
  provider: Provider;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ provider }) => (
  <div className="bg-white p-6 flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 shadow">
    <Avatar className="h-32 w-32 border">
      <AvatarImage src={provider.profile_photo.url} alt={provider.profile_photo.alt} />
      <AvatarFallback>
        {provider.provider_name.split(" ").map(n => n[0]).join("")}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-3xl font-bold">{provider.provider_name}</h1>
      <p className="text-lg text-muted-foreground">{provider.practitioner_type.name}</p>
      <div className="mt-2 flex items-center justify-center md:justify-start space-x-2">
        <Badge>
          <img src={provider.tier_badge.url} alt={provider.tier_badge.alt} className="h-5 w-5 mr-1 inline" />
          {provider.membership_tier}
        </Badge>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {provider.location.clinic_city}, {provider.location.clinic_state}
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;