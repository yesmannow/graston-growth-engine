"use client";

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FullProviderProfile } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface EngagementByTypeChartProps {
  providers: FullProviderProfile[];
}

const EngagementByTypeChart = ({ providers }: EngagementByTypeChartProps) => {
  const engagementData = useMemo(() => {
    const engagementByTpe: Record<string, { totalViews: number, count: number }> = {};

    providers.forEach(provider => {
      const type = provider.clinicianType || 'Other';
      if (!engagementByTpe[type]) {
        engagementByTpe[type] = { totalViews: 0, count: 0 };
      }
      engagementByTpe[type].totalViews += provider.views || 0;
      engagementByTpe[type].count += 1;
    });

    return Object.entries(engagementByTpe).map(([type, data]) => ({
      name: type,
      'Avg. Views': data.count > 0 ? Math.round(data.totalViews / data.count) : 0,
    }));
  }, [providers]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement by Clinician Type</CardTitle>
        <CardDescription>Average profile views per clinician type.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={engagementData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Avg. Views" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementByTypeChart;