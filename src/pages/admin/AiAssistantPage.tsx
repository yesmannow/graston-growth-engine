import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Settings, Workflow, MessageSquare, Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge"; // Added import for Badge

const AiAssistantPage = () => {
  const alerts = [
    {
        icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
        title: "Churn Risk Anomaly",
        description: "Sudden drop in engagement from Premier providers in California.",
        action: "View Cohort"
    },
    {
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        title: "Upgrade Opportunity",
        description: "12 Free-tier providers have high profile views but low conversion. Suggest upgrade.",
        action: "Launch Campaign"
    },
  ];

  const supportTickets = [
    {
      id: "12345",
      subject: "Billing inquiry for Dr. Smith",
      summary: "Provider is questioning the latest Premier tier charge.",
      priority: "High",
      suggestedReply: "Drafted a reply explaining the Premier tier benefits and billing cycle.",
    },
    {
      id: "12346",
      subject: "Profile update request",
      summary: "Provider wants to add new services and update contact info.",
      priority: "Medium",
      suggestedReply: "Suggested steps to guide provider through profile update process.",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Bot className="h-8 w-8 text-primary" />
        AI Assistant Console
      </h1>
      <p className="text-muted-foreground">
        Leverage AI to automate tasks, gain insights, and streamline operations.
      </p>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Automation Builder */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-blue-500" />
              Automation Builder
            </CardTitle>
            <CardDescription>
              Visually design and manage automated workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create powerful automations based on triggers, actions, and conditional logic.
              The AI will guide you with suggestions.
            </p>
            <Button className="w-full">
              <Workflow className="mr-2 h-4 w-4" />
              Build New Automation
            </Button>
          </CardContent>
        </Card>

        {/* Insight & Alert Center */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Insight & Alert Center
            </CardTitle>
            <CardDescription>
              Proactive insights and actionable alerts from your AI copilot.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1">{alert.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                  <Button variant="outline" size="sm">{alert.action}</Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No new alerts or insights at this time.</p>
            )}
          </CardContent>
        </Card>

        {/* Support Triage View */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              Support Triage View
            </CardTitle>
            <CardDescription>
              AI-powered categorization and suggested replies for support tickets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportTickets.length > 0 ? (
              supportTickets.map((ticket, index) => (
                <div key={index} className="flex flex-col gap-2 border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Ticket #{ticket.id}: {ticket.subject}</p>
                    <Badge variant={ticket.priority === 'High' ? 'destructive' : 'secondary'}>{ticket.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{ticket.summary}</p>
                  <p className="text-xs text-primary-foreground bg-primary/10 p-2 rounded-md">
                    <span className="font-medium">AI Suggestion:</span> {ticket.suggestedReply}
                  </p>
                  <Button variant="outline" size="sm" className="self-end">View Ticket</Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No new support tickets.</p>
            )}
          </CardContent>
        </Card>

        {/* Provider-Facing AI Configuration */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-500" />
              Provider-Facing AI Configuration
            </CardTitle>
            <CardDescription>
              Manage AI tools available to providers on a per-tier basis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Optimization Assistant */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="profile-optimization-ai" className="text-base">
                    Profile Optimization Assistant
                  </Label>
                  <CardDescription>
                    AI suggestions for improving provider profile completeness and appeal.
                  </CardDescription>
                </div>
                <Switch id="profile-optimization-ai" defaultChecked />
              </div>

              {/* Marketing Content Generator */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-content-ai" className="text-base">
                    Marketing Content Generator
                  </Label>
                  <CardDescription>
                    AI-powered tool for generating marketing copy and social media posts.
                  </CardDescription>
                </div>
                <Switch id="marketing-content-ai" />
              </div>

              {/* ROI Calculator AI Insights */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="roi-calculator-ai" className="text-base">
                    ROI Calculator AI Insights
                  </Label>
                  <CardDescription>
                    AI-driven insights within the provider's ROI calculator.
                  </CardDescription>
                </div>
                <Switch id="roi-calculator-ai" defaultChecked />
              </div>

              {/* Lead Qualification AI */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="lead-qualification-ai" className="text-base">
                    Lead Qualification AI
                  </Label>
                  <CardDescription>
                    AI assists providers in qualifying leads from their directory profile.
                  </CardDescription>
                </div>
                <Switch id="lead-qualification-ai" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-ai-tier" className="text-base">
                Default AI Feature Tier
              </Label>
              <Input id="default-ai-tier" placeholder="e.g., Premier" defaultValue="Premier" />
              <CardDescription>
                Set the default minimum tier required for providers to access AI features.
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AiAssistantPage;