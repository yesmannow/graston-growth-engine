import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Inbox, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  BarChart3,
  Zap,
  Bell,
  Search,
  Bot
} from 'lucide-react';
import SmartInbox from '@/components/support/SmartInbox';
import ChatDashboard from '@/components/support/ChatDashboard';
import KnowledgeBase from '@/components/support/KnowledgeBase';
import AutomationBuilder from '@/components/support/AutomationBuilder';
import AnalyticsDashboard from '@/components/support/AnalyticsDashboard';
import SupportTriageView from '@/components/support/SupportTriageView';
import { Input } from '@/components/ui/input';

const SupportDashboard = () => {
  const [activeTab, setActiveTab] = useState('triage');
  const [globalSearch, setGlobalSearch] = useState('');

  const quickStats = {
    openTickets: 47,
    pendingChats: 3,
    slaBreaches: 2,
    avgResponseTime: '2.3h'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Support Command Center</h1>
            <div className="flex items-center space-x-2">
              <Badge variant="destructive" className="animate-pulse">
                {quickStats.slaBreaches} SLA Breaches
              </Badge>
              <Badge variant="secondary">
                {quickStats.openTickets} Open Tickets
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Global search..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="grid grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Inbox className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Open Tickets</p>
              <p className="text-xl font-semibold">{quickStats.openTickets}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Chats</p>
              <p className="text-xl font-semibold">{quickStats.pendingChats}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Bell className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">SLA Breaches</p>
              <p className="text-xl font-semibold text-red-600">{quickStats.slaBreaches}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Response</p>
              <p className="text-xl font-semibold">{quickStats.avgResponseTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="triage" className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span>AI Triage</span>
            </TabsTrigger>
            <TabsTrigger value="inbox" className="flex items-center space-x-2">
              <Inbox className="h-4 w-4" />
              <span>Smart Inbox</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Live Chat</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Knowledge Base</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Automation</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="triage" className="space-y-6">
            <SupportTriageView />
          </TabsContent>

          <TabsContent value="inbox" className="space-y-6">
            <SmartInbox />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <ChatDashboard />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <KnowledgeBase />
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <AutomationBuilder />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupportDashboard;