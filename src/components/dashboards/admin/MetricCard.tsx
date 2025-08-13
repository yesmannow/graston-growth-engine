import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: "up" | "down";
  trendValue?: number;
}

const MetricCard = ({ title, value, icon, description, trend, trendValue }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold flex items-center gap-2">
        {typeof value === "number" ? value.toLocaleString() : value}
        {trend && (
          <span className={`ml-2 flex items-center text-xs font-semibold ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {trendValue !== undefined ? `${Math.abs(trendValue)}%` : ""}
          </span>
        )}
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

export default MetricCard;