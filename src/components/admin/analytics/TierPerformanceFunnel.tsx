import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: 'Free Tier Signups', value: 1200, fill: '#a1a1aa' },
  { name: 'Viewed Upgrade Page', value: 998, fill: '#71717a' },
  { name: 'Initiated Preferred Checkout', value: 798, fill: '#2563eb' },
  { name: 'Became Preferred', value: 520, fill: '#1d4ed8' },
  { name: 'Initiated Premier Checkout', value: 220, fill: '#7c3aed' },
  { name: 'Became Premier', value: 98, fill: '#6d28d9' },
];

const TierPerformanceFunnel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tier Performance Funnel</CardTitle>
        <CardDescription>
          Visualizing the member lifecycle from Free to Premier tiers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={data} isAnimationActive>
                <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TierPerformanceFunnel;