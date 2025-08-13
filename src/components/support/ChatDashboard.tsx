import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Send,
  Smile,
  Paperclip,
  MoreHorizontal,
  Phone,
  Video,
  Archive,
  UserPlus
} from 'lucide-react';
import { ChatSession } from '@/types/support';

const ChatDashboard = () => {
  const [activeSessions, setActiveSessions] = useState<ChatSession[]>([]);
  const [waitingSessions, setWaitingSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [message, setMessage] = useState('');
  const [agentStatus] = useState<'Online' | 'Away' | 'Busy'>('Online');

  // Mock data
  useEffect(() => {
    const mockActiveSessions: ChatSession[] = [
      {
        id: 'chat-1',
        customer: {
          id: 'cust-1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          tier: 'Pro',
          totalTickets: 3,
          lastActivity: '2024-01-15T10:30:00Z',
          tags: ['VIP']
        },
        agent: {
          id: 'agent-1',
          name: 'You',
          email: 'you@company.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          status: 'Online',
          department: 'Support',
          activeChats: 2,
          maxChats: 5,
          skills: ['General Support']
        },
        status: 'Active',
        messages: [
          {
            id: 'msg-1',
            content: 'Hi, I need help with my premium features not working after upgrade.',
            sender: 'customer',
            timestamp: '2024-01-15T10:30:00Z'
          },
          {
            id: 'msg-2',
            content: 'I\'d be happy to help you with that! Let me check your account status.',
            sender: 'agent',
            timestamp: '2024-01-15T10:31:00Z'
          }
        ],
        startedAt: '2024-01-15T10:30:00Z'
      }
    ];

    const mockWaitingSessions: ChatSession[] = [
      {
        id: 'chat-2',
        customer: {
          id: 'cust-2',
          name: 'Mike Chen',
          email: 'mike@example.com',
          tier: 'Free',
          totalTickets: 1,
          lastActivity: '2024-01-15T10:35:00Z',
          tags: []
        },
        status: 'Waiting',
        messages: [
          {
            id: 'msg-3',
            content: 'Hello, I have a question about provider verification.',
            sender: 'customer',
            timestamp: '2024-01-15T10:35:00Z'
          }
        ],
        startedAt: '2024-01-15T10:35:00Z'
      }
    ];

    setActiveSessions(mockActiveSessions);
    setWaitingSessions(mockWaitingSessions);
    setSelectedSession(mockActiveSessions[0]);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedSession) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      content: message,
      sender: 'agent' as const,
      timestamp: new Date().toISOString()
    };

    const updatedSession = {
      ...selectedSession,
      messages: [...selectedSession.messages, newMessage]
    };

    setActiveSessions(prev => 
      prev.map(session => 
        session.id === selectedSession.id ? updatedSession : session
      )
    );
    setSelectedSession(updatedSession);
    setMessage('');
  };

  const handleAcceptChat = (session: ChatSession) => {
    const updatedSession = { ...session, status: 'Active' as const };
    setWaitingSessions(prev => prev.filter(s => s.id !== session.id));
    setActiveSessions(prev => [...prev, updatedSession]);
    setSelectedSession(updatedSession);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Online': 'bg-green-500',
      'Away': 'bg-yellow-500',
      'Busy': 'bg-red-500',
      'Offline': 'bg-gray-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Chat Sessions Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        {/* Agent Status */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Chat Status</CardTitle>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(agentStatus)}`}></div>
                <span className="text-sm font-medium">{agentStatus}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{activeSessions.length}</p>
                <p className="text-xs text-gray-600">Active Chats</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{waitingSessions.length}</p>
                <p className="text-xs text-gray-600">Waiting</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Sessions */}
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Chat Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="active">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active">Active ({activeSessions.length})</TabsTrigger>
                <TabsTrigger value="waiting">Waiting ({waitingSessions.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-2 mt-4">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                      selectedSession?.id === session.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={session.customer.avatar} />
                          <AvatarFallback>{session.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{session.customer.name}</p>
                          <Badge variant="secondary" className="text-xs">{session.customer.tier}</Badge>
                        </div>
                        <p className="text-xs text-gray-600 truncate">
                          {session.messages[session.messages.length - 1]?.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTime(session.messages[session.messages.length - 1]?.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="waiting" className="space-y-2 mt-4">
                {waitingSessions.map((session) => (
                  <div key={session.id} className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.customer.avatar} />
                        <AvatarFallback>{session.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{session.customer.name}</p>
                        <p className="text-xs text-gray-600 truncate">
                          {session.messages[0]?.content}
                        </p>
                        <p className="text-xs text-orange-600">
                          Waiting {Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 60000)}m
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => handleAcceptChat(session)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Accept Chat
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Chat Window */}
      <div className="lg:col-span-3">
        {selectedSession ? (
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedSession.customer.avatar} />
                    <AvatarFallback>{selectedSession.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedSession.customer.name}</h3>
                    <p className="text-sm text-gray-600">{selectedSession.customer.email}</p>
                  </div>
                  <Badge variant="secondary">{selectedSession.customer.tier}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto mb-4 max-h-[400px]">
                {selectedSession.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'agent'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'agent' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t pt-4">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="resize-none"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chat selected</h3>
              <p className="text-gray-600">Select a chat session to start messaging</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;