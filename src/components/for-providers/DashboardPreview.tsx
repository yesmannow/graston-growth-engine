import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Eye, Link } from 'lucide-react';

const profileViewsData = [
  { name: 'Jan', views: 120 },
  { name: 'Feb', views: 180 },
  { name: 'Mar', views: 250 },
  { name: 'Apr', views: 220 },
  { name: 'May', views: 300 },
  { name: 'Jun', views: 350 },
];

const conversionData = [
  { name: 'Profile Views', value: 350 },
  { name: 'Website Clicks', value: 88 },
  { name: 'Form Submissions', value: 24 },
];

const DashboardPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Data-Driven Decisions</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our Premier Analytics Dashboard gives you the insights you need to measure success and optimize your profile.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Profile Views Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profileViewsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#7C3AED" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;