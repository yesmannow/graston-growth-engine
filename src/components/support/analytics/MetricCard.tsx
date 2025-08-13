import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricChange {
  value: string;
  isPositive: boolean;
  isNegative: boolean;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: MetricChange;
  icon: LucideIcon;
  color: string;
}

const MetricCard = ({ title, value, unit, change, icon: Icon, color }: MetricCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline space-x-1">
            <p className="text-2xl font-bold">{value}</p>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {change && (
            <div className={`flex items-center space-x-1 mt-1 ${
              change.isPositive ? 'text-green-600' : change.isNegative ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : change.isNegative ? (
                <TrendingDown className="h-3 w-3" />
              ) : null}
              <span className="text-xs">{change.value}% vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MetricCard;