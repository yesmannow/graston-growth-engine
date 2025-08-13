import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Zap, Settings, Lightbulb } from 'lucide-react';
import AutomationBuilder from '@/components/support/AutomationBuilder';

const AiAssistantPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI Assistant Console
          </h1>
          <p className="text-muted-foreground">
            Leverage AI to automate tasks, gain insights, and streamline operations.
          </p>
        </div>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Insights & Alerts
          </TabsTrigger>
          <TabsTrigger value="copilot" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Automation Copilot
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Automation Builder
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            AI Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Insights & Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI-powered insights and alerts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="copilot">
          <Card>
            <CardHeader>
              <CardTitle>Automation Copilot</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI automation suggestions will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder">
          <AutomationBuilder />
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>AI Tools Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI tools configuration will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiAssistantPage;