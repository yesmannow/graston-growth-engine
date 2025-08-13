import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  isWarning?: boolean;
  isDanger?: boolean;
}

const MetricCard = ({ title, value, change, isWarning, isDanger }: MetricCardProps) => {
  const changeColor = isWarning ? "text-yellow-600" : isDanger ? "text-red-600" : "text-green-600";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn("text-xs text-muted-foreground", changeColor)}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;