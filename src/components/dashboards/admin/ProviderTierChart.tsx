"use client";

import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FullProviderProfile, Tier } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import chartColors from '@/theme/chartColors';

interface ProviderTierChartProps {
  providers: FullProviderProfile[];
}

const COLORS: Record<Tier, string> = {
  Premier: chartColors.secondary,
  Preferred: chartColors.primary,
  Free: chartColors.gray,
};

const ProviderTierChart = ({ providers }: ProviderTierChartProps) => {
  const tierData = useMemo(() => {
    const counts = providers.reduce((acc, provider) => {
      acc[provider.tier] = (acc[provider.tier] || 0) + 1;
      return acc;
    }, {} as Record<Tier, number>);

    return (Object.keys(counts) as Tier[]).map(tier => ({
      name: tier,
      value: counts[tier],
    }));
  }, [providers]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider Tier Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={tierData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill={chartColors.primary}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {tierData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as Tier]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb" }}
                formatter={(value: any, name: any) => [`${value} providers`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderTierChart;