import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

interface UpgradeCardProps {
  featureName: string;
}

const UpgradeCard = ({ featureName }: UpgradeCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 text-center">
      <CardHeader>
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
          <Rocket className="h-6 w-6" />
        </div>
        <CardTitle>Unlock {featureName}</CardTitle>
        <CardDescription>This is a Premier-tier feature. Upgrade your plan to access this and other powerful marketing tools.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="lg">Upgrade to Premier</Button>
      </CardContent>
    </Card>
  );
};

export default UpgradeCard;