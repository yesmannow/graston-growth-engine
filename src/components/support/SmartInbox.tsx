import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Filter, 
  Search, 
  Clock, 
  AlertTriangle, 
  Eye, 
  MessageSquare,
  Tag,
  User,
  Calendar,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { Ticket, TicketStatus, TicketPriority, TicketChannel } from '@/types/support';
import TicketDetail from '@/components/support/TicketDetail';

const SmartInbox = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    channel: 'all',
    assignee: 'all',
    search: ''
  });
  const [sortBy, setSortBy] = useState('updated');

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockTickets: Ticket[] = [
      {
        id: 'TKT-001',
        subject: 'Unable to access premium features after upgrade',
        description: 'Customer upgraded to Premier tier but still seeing Free tier limitations.',
        status: 'Open',
        priority: 'High',
        channel: 'Email',
        customer: {
          id: 'cust-1',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          tier: 'Pro',
          totalTickets: 3,
          lastActivity: '2024-01-15T10:30:00Z',
          tags: ['VIP', 'Technical']
        },
        assignedAgent: {
          id: 'agent-1',
          name: 'Mike Chen',
          email: 'mike@company.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          status: 'Online',
          department: 'Technical',
          activeChats: 2,
          maxChats: 5,
          skills: ['Technical', 'Billing']
        },
        tags: ['billing', 'urgent', 'tier-upgrade'],
        createdAt: '2024-01-15T09:15:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        slaBreachTime: '2024-01-15T13:15:00Z',
        isBeingViewed: true,
        viewedBy: {
          id: 'agent-2',
          name: 'Lisa Park',
          email: 'lisa@company.com',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
          status: 'Online',
          department: 'Support',
          activeChats: 1,
          maxChats: 4,
          skills: ['General Support']
        },
        messages: [],
        internalNotes: []
      }
    ];
    setTickets(mockTickets);
  }, []);

  const getStatusColor = (status: TicketStatus) => {
    const colors: Record<TicketStatus, string> = {
      'New': 'bg-blue-100 text-blue-800',
      'Open': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'On-Hold': 'bg-gray-100 text-gray-800',
      'Solved': 'bg-purple-100 text-purple-800',
      'Closed': 'bg-gray-100 text-gray-600'
    };
    return colors[status];
  };

  const getPriorityColor = (priority: TicketPriority) => {
    const colors: Record<TicketPriority, string> = {
      'Low': 'text-green-600',
      'Normal': 'text-blue-600',
      'High': 'text-orange-600',
      'Urgent': 'text-red-600'
    };
    return colors[priority];
  };

  const getChannelIcon = (channel: TicketChannel) => {
    const icons: Record<TicketChannel, string> = {
      'Email': '📧',
      'Form': '📝',
      'Social': '📱',
      'Chat': '💬',
      'Phone': '📞'
    };
    return icons[channel];
  };

  const getSlaStatus = (slaBreachTime?: string) => {
    if (!slaBreachTime) return null;
    
    const now = new Date();
    const breach = new Date(slaBreachTime);
    const diff = breach.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 0) {
      return { status: 'breached', text: `${Math.abs(hours)}h overdue`, color: 'text-red-600' };
    } else if (hours < 2) {
      return { status: 'warning', text: `${hours}h remaining`, color: 'text-orange-600' };
    } else {
      return { status: 'safe', text: `${hours}h remaining`, color: 'text-green-600' };
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filters.status !== 'all' && ticket.status !== filters.status) return false;
    if (filters.priority !== 'all' && ticket.priority !== filters.priority) return false;
    if (filters.channel !== 'all' && ticket.channel !== filters.channel) return false;
    if (filters.assignee !== 'all' && ticket.assignedAgent?.id !== filters.assignee) return false;
    if (filters.search && !ticket.subject.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Ticket List */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Smart Inbox</CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-2">
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Solved">Solved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Ticket List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredTickets.map((ticket) => {
                const slaStatus = getSlaStatus(ticket.slaBreachTime);
                
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedTicket?.id === ticket.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                        <span className="text-lg">{getChannelIcon(ticket.channel)}</span>
                        {ticket.isBeingViewed && (
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3 text-orange-500" />
                            <span className="text-xs text-orange-600">Viewing</span>
                          </div>
                        )}
                      </div>
                      <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                        {ticket.priority}
                      </Badge>
                    </div>

                    <h4 className="font-medium text-sm mb-2 line-clamp-2">{ticket.subject}</h4>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.customer.avatar} />
                          <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{ticket.customer.name}</span>
                      </div>
                      <Badge className={getStatusColor(ticket.status)} variant="secondary">
                        {ticket.status}
                      </Badge>
                    </div>

                    {slaStatus && (
                      <div className="flex items-center space-x-1 mb-2">
                        <Clock className="h-3 w-3" />
                        <span className={`text-xs ${slaStatus.color}`}>{slaStatus.text}</span>
                        {slaStatus.status === 'breached' && <AlertTriangle className="h-3 w-3 text-red-500" />}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(ticket.updatedAt).toLocaleDateString()}</span>
                      {ticket.assignedAgent && (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{ticket.assignedAgent.name}</span>
                        </div>
                      )}
                    </div>

                    {ticket.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ticket.tags.slice(0, 2).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {ticket.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{ticket.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Detail */}
      <div className="lg:col-span-2">
        {selectedTicket ? (
          <TicketDetail ticket={selectedTicket} onUpdate={(updatedTicket: Ticket) => {
            setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
            setSelectedTicket(updatedTicket);
          }} />
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a ticket</h3>
              <p className="text-gray-600">Choose a ticket from the inbox to view details and respond</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SmartInbox;