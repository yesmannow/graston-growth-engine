import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProviderTierChartProps {
  data: {
    premier: number;
    preferred: number;
    free: number;
  };
}

const ProviderTierChart = ({ data }: ProviderTierChartProps) => {
  const chartData = [
    { name: 'Premier', count: data.premier, fill: '#8884d8' },
    { name: 'Preferred', count: data.preferred, fill: '#82ca9d' },
    { name: 'Free', count: data.free, fill: '#ffc658' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider Distribution by Tier</CardTitle>
        <CardDescription>A breakdown of active providers across membership tiers.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Providers" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProviderTierChart;