import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FullProviderProfile } from "@/types";

interface TopViewedProvidersProps {
  providers: FullProviderProfile[];
}

const TopViewedProviders = ({ providers }: TopViewedProvidersProps) => {
  // For demonstration, we'll just take the first few providers.
  // In a real app, this would come from analytics data.
  const topProviders = providers.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Viewed Providers</CardTitle>
        <CardDescription>Providers with the most profile views this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProviders.map((provider, index) => (
            <div key={provider.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={provider.profileImage} alt={provider.name} />
                <AvatarFallback>{provider.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{provider.name}</p>
                <p className="text-sm text-muted-foreground">{provider.email}</p>
              </div>
              <div className="ml-auto font-medium">+{Math.floor(Math.random() * 1000)} views</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopViewedProviders;