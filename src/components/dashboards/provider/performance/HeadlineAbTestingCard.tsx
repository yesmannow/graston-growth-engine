import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Play, Check, Trophy } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const HeadlineAbTestingCard = () => {
  const [headlineA, setHeadlineA] = useState("Your Trusted Local Physical Therapist");
  const [headlineB, setHeadlineB] = useState("Pain Relief and Recovery Experts");
  const [testState, setTestState] = useState<'idle' | 'running' | 'finished'>('idle');

  const handleStartTest = () => {
    setTestState('running');
    showSuccess("A/B test started! Results will be available in 30 days.");
  };

  const resultsData = [
    { name: 'Headline A', engagement: 4.7 },
    { name: 'Headline B', engagement: 6.2 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          A/B Test Your Headline
        </CardTitle>
        <CardDescription>Find out which tagline converts more visitors.</CardDescription>
      </CardHeader>
      <CardContent>
        {testState === 'idle' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="headlineA">Headline A</Label>
              <Input id="headlineA" value={headlineA} onChange={(e) => setHeadlineA(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="headlineB">Headline B</Label>
              <Input id="headlineB" value={headlineB} onChange={(e) => setHeadlineB(e.target.value)} />
            </div>
            <Button className="w-full" onClick={handleStartTest}>
              <Play className="h-4 w-4 mr-2" />
              Start Test
            </Button>
          </div>
        )}
        {testState === 'running' && (
          <div className="text-center py-8">
            <p className="font-semibold">Test is running...</p>
            <p className="text-sm text-muted-foreground">Check back in 30 days for results.</p>
            <Button variant="outline" className="mt-4" onClick={() => setTestState('finished')}>
              (Simulate Test Finish)
            </Button>
          </div>
        )}
        {testState === 'finished' && (
          <div className="space-y-4">
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <Trophy className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <h3 className="font-semibold">Headline B is the winner!</h3>
              <p className="text-sm text-muted-foreground">It performed 32% better than Headline A.</p>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resultsData} layout="vertical">
                  <XAxis type="number" domain={[0, 10]} hide />
                  <YAxis type="category" dataKey="name" width={80} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="engagement" fill="#3b82f6" background={{ fill: '#e5e7eb' }} unit="%" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => showSuccess("Winning headline applied!")}>
                <Check className="h-4 w-4 mr-2" />
                Apply Winning Headline
              </Button>
              <Button variant="outline" onClick={() => setTestState('idle')}>
                Start New Test
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeadlineAbTestingCard;