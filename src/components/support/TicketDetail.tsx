import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Paperclip, 
  Clock, 
  User, 
  Tag, 
  AlertTriangle,
  Eye,
  MessageSquare,
  FileText,
  Star,
  MoreHorizontal,
  History
} from 'lucide-react';
import { Ticket, TicketStatus, TicketPriority } from '@/types/support';

interface TicketDetailProps {
  ticket: Ticket;
  onUpdate: (ticket: Ticket) => void;
}

const TicketDetail = ({ ticket, onUpdate }: TicketDetailProps) => {
  const [reply, setReply] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleStatusChange = (newStatus: TicketStatus) => {
    const updatedTicket = { ...ticket, status: newStatus, updatedAt: new Date().toISOString() };
    onUpdate(updatedTicket);
  };

  const handlePriorityChange = (newPriority: TicketPriority) => {
    const updatedTicket = { ...ticket, priority: newPriority, updatedAt: new Date().toISOString() };
    onUpdate(updatedTicket);
  };

  const handleSendReply = () => {
    if (!reply.trim()) return;
    
    // In real app, this would send the reply via API
    setReply('');
    setIsReplying(false);
    
    const updatedTicket = { 
      ...ticket, 
      status: 'Open' as TicketStatus,
      updatedAt: new Date().toISOString() 
    };
    onUpdate(updatedTicket);
  };

  const handleAddInternalNote = () => {
    if (!internalNote.trim()) return;
    
    // In real app, this would save the internal note via API
    setInternalNote('');
  };

  const getSlaStatus = () => {
    if (!ticket.slaBreachTime) return null;
    
    const now = new Date();
    const breach = new Date(ticket.slaBreachTime);
    const diff = breach.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 0) {
      return { status: 'breached', text: `${Math.abs(hours)}h overdue`, color: 'text-red-600 bg-red-50' };
    } else if (hours < 2) {
      return { status: 'warning', text: `${hours}h remaining`, color: 'text-orange-600 bg-orange-50' };
    } else {
      return { status: 'safe', text: `${hours}h remaining`, color: 'text-green-600 bg-green-50' };
    }
  };

  const slaStatus = getSlaStatus();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
              {ticket.isBeingViewed && ticket.viewedBy && (
                <div className="flex items-center space-x-2 px-2 py-1 bg-orange-50 rounded-full">
                  <Eye className="h-3 w-3 text-orange-500" />
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={ticket.viewedBy.avatar} />
                    <AvatarFallback className="text-xs">{ticket.viewedBy.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-orange-600">{ticket.viewedBy.name} is viewing</span>
                </div>
              )}
            </div>
            <CardTitle className="text-xl">{ticket.subject}</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* SLA Warning */}
        {slaStatus && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg ${slaStatus.color}`}>
            <Clock className="h-4 w-4" />
            <span className="font-medium">{slaStatus.text}</span>
            {slaStatus.status === 'breached' && <AlertTriangle className="h-4 w-4" />}
          </div>
        )}

        {/* Ticket Meta */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide">Status</label>
            <Select value={ticket.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="On-Hold">On-Hold</SelectItem>
                <SelectItem value="Solved">Solved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide">Priority</label>
            <Select value={ticket.priority} onValueChange={handlePriorityChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide">Assignee</label>
            <div className="mt-1 flex items-center space-x-2">
              {ticket.assignedAgent ? (
                <>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={ticket.assignedAgent.avatar} />
                    <AvatarFallback className="text-xs">{ticket.assignedAgent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{ticket.assignedAgent.name}</span>
                </>
              ) : (
                <span className="text-sm text-gray-500">Unassigned</span>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide">Channel</label>
            <div className="mt-1">
              <Badge variant="outline">{ticket.channel}</Badge>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={ticket.customer.avatar} />
                <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{ticket.customer.name}</h4>
                <p className="text-sm text-gray-600">{ticket.customer.email}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary">{ticket.customer.tier}</Badge>
              <p className="text-xs text-gray-500 mt-1">{ticket.customer.totalTickets} total tickets</p>
            </div>
          </div>
          
          {ticket.customer.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {ticket.customer.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <Tabs defaultValue="conversation" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="conversation">Conversation</TabsTrigger>
            <TabsTrigger value="notes">Internal Notes</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="conversation" className="flex-1 flex flex-col space-y-4">
            {/* Initial Description */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={ticket.customer.avatar} />
                  <AvatarFallback className="text-xs">{ticket.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{ticket.customer.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm">{ticket.description}</p>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 space-y-4 min-h-[200px]">
              {ticket.messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No messages yet. Be the first to respond!</p>
                </div>
              ) : (
                ticket.messages.map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    {/* Message content would go here */}
                  </div>
                ))
              )}
            </div>

            {/* Reply Box */}
            <div className="border-t pt-4">
              {!isReplying ? (
                <Button onClick={() => setIsReplying(true)} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Reply to Customer
                </Button>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Type your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={4}
                  />
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach File
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => setIsReplying(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSendReply}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 space-y-4 min-h-[200px]">
              {ticket.internalNotes.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No internal notes yet. Add one to collaborate with your team.</p>
                </div>
              ) : (
                ticket.internalNotes.map((note) => (
                  <div key={note.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={note.author.avatar} />
                        <AvatarFallback className="text-xs">{note.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{note.author.name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(note.timestamp).toLocaleString()}
                      </span>
                      {note.isPrivate && (
                        <Badge variant="outline" className="text-xs">Private</Badge>
                      )}
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-4 space-y-3">
              <Textarea
                placeholder="Add an internal note for your team..."
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button onClick={handleAddInternalNote}>
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="flex-1">
            <div className="text-center text-gray-500 py-8">
              <History className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Ticket history and audit trail will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TicketDetail;