import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ProviderDashboard = () => {
  const [leads, setLeads] = useState(10);
  const [conversionRate, setConversionRate] = useState(5); // in percentage
  const [avgDealValue, setAvgDealValue] = useState(500);

  const estimatedRevenue = (leads * (conversionRate / 100) * avgDealValue).toFixed(2);

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Provider Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile Score</CardTitle>
            <CardDescription>Your profile completion status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">85%</span>
              <Progress value={85} className="w-2/3" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Complete your profile to reach 100%.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Membership Tier</CardTitle>
            <CardDescription>Your current plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Premier</p>
            <p className="text-sm text-muted-foreground">Trial ends in 14 days.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Subscription</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Your profile performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Views</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Leads</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clicks</p>
                <p className="text-2xl font-bold">120</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Lead Inbox</CardTitle>
            <CardDescription>Recent form submissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">A list of leads from your profile form will appear here.</p>
            {/* Placeholder for lead list */}
            <div className="mt-4 border rounded-md p-4">
              <p className="text-sm text-muted-foreground">No new leads.</p>
            </div>
          </CardContent>
        </Card>

        {/* ROI Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>ROI Calculator</CardTitle>
            <CardDescription>Estimate your potential earnings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="leads">Monthly Leads</Label>
              <Input id="leads" type="number" value={leads} onChange={(e) => setLeads(Number(e.target.value))} />
            </div>
            <div>
              <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
              <Input id="conversionRate" type="number" value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))} />
            </div>
            <div>
              <Label htmlFor="avgDealValue">Average Deal Value ($)</Label>
              <Input id="avgDealValue" type="number" value={avgDealValue} onChange={(e) => setAvgDealValue(Number(e.target.value))} />
            </div>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">Estimated Monthly Revenue:</p>
              <p className="text-3xl font-bold text-primary">${estimatedRevenue}</p>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade CTAs */}
        <Card>
          <CardHeader>
            <CardTitle>Upgrade Your Plan</CardTitle>
            <CardDescription>Unlock more features and leads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">Upgrade to Preferred</Button>
            <Button variant="secondary" className="w-full">Upgrade to Premier</Button>
            <Button variant="outline" className="w-full">Compare Plans</Button>
          </CardContent>
        </Card>

        {/* GPT-powered Content Assistant */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Content Assistant</CardTitle>
            <CardDescription>Generate bio, video scripts, and more.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="content-prompt">What content do you need?</Label>
              <Textarea id="content-prompt" placeholder="e.g., 'Write a short bio for my profile' or 'Suggest a video script for patient testimonials'" rows={4} />
            </div>
            <Button className="w-full">Generate Content</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard;