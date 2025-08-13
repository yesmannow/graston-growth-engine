import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const AudienceOverviewCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Overview</CardTitle>
        <CardDescription>Visitor location and demographics.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          <Users className="h-6 w-6 text-primary mt-1" />
          <p className="text-sm text-muted-foreground">
            Detailed analytics about your audience, including their location, age, and interests, are available in your Google Analytics dashboard.
          </p>
        </div>
        <Button 
          className="w-full" 
          variant="outline" 
          asChild
        >
          <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
            View in Google Analytics
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AudienceOverviewCard;