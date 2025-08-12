"use client";

import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FullProviderProfile, Tier } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProviderTierChartProps {
  providers: FullProviderProfile[];
}

const COLORS: Record<Tier, string> = {
  Premier: '#8B5CF6', // purple-500
  Preferred: '#3B82F6', // blue-500
  Free: '#6B7280',    // gray-500
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
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {tierData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as Tier]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} providers`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderTierChart;