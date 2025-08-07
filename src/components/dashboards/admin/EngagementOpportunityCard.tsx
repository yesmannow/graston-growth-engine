import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface EngagementOpportunityCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
}

const EngagementOpportunityCard = ({ icon, title, value, description, ctaText, onCtaClick }: EngagementOpportunityCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mb-4">{description}</p>
        <Button size="sm" className="w-full" onClick={onCtaClick}>
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EngagementOpportunityCard;