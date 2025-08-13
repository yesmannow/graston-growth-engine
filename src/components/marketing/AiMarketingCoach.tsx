import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiCoachTips } from "@/data/marketingData";
import { Lightbulb } from "lucide-react";

const AiMarketingCoach = () => {
  const tip = aiCoachTips[Math.floor(Math.random() * aiCoachTips.length)];
  const Icon = tip.icon;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          AI Marketing Coach
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-full mt-1">
            <Icon className="h-5 w-5 text-blue-700" />
          </div>
          <p className="text-blue-900">{tip.text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiMarketingCoach;