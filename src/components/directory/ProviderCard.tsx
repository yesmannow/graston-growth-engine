import { FullProviderProfile } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProviderCardProps {
  provider: FullProviderProfile;
}

const tierColors: { [key: string]: string } = {
  Premier: "bg-purple-600 hover:bg-purple-700 text-white",
  Preferred: "bg-blue-500 hover:bg-blue-600 text-white",
  Free: "bg-gray-500 hover:bg-gray-600 text-white",
};

const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <Card className="flex flex-col h-full transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="h-16 w-16 border">
          <AvatarImage src={provider.profileImage} alt={provider.name} />
          <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-bold">{provider.name}</h3>
          <p className="text-sm text-muted-foreground">{provider.specialty}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{provider.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{provider.bio}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <Badge className={tierColors[provider.tier]}>
          <Star className="h-3 w-3 mr-1" />
          {provider.tier}
        </Badge>
        <Button asChild>
          <Link to={`/provider/${provider.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderCard;