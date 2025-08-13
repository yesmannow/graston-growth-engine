import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FullProviderProfile } from "@/types";

interface EngagementByTypeChartProps {
  providers: FullProviderProfile[];
}

const EngagementByTypeChart = ({ providers }: EngagementByTypeChartProps) => {
  const data = [
    { name: 'Profile Updates', value: 400 },
    { name: 'Logins', value: 300 },
    { name: 'Content Added', value: 300 },
    { name: 'Searches', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement by Type</CardTitle>
        <CardDescription>Breakdown of key provider activities on the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EngagementByTypeChart;