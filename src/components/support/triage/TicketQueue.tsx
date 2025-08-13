import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bot, 
  Clock, 
  Filter, 
  RefreshCw
} from 'lucide-react';
import { SupportTicket } from '@/types/support';

interface TicketQueueProps {
  tickets: SupportTicket[];
  selectedTicket: SupportTicket | null;
  onTicketSelect: (ticket: SupportTicket) => void;
  onRefresh: () => void;
}

const TicketQueue = ({ tickets, selectedTicket, onTicketSelect, onRefresh }: TicketQueueProps) => {
  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Normal': 'bg-blue-100 text-blue-800',
      'High': 'bg-orange-100 text-orange-800',
      'Urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getSentimentColor = (sentiment: string) => {
    const colors = {
      'positive': 'text-green-600',
      'neutral': 'text-blue-600',
      'negative': 'text-red-600'
    };
    return colors[sentiment as keyof typeof colors];
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Support Triage Queue</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tickets.map((ticket) => (
          <TicketQueueItem
            key={ticket.id}
            ticket={ticket}
            isSelected={selectedTicket?.id === ticket.id}
            onSelect={() => onTicketSelect(ticket)}
            getPriorityColor={getPriorityColor}
            getSentimentColor={getSentimentColor}
          />
        ))}
      </CardContent>
    </Card>
  );
};

interface TicketQueueItemProps {
  ticket: SupportTicket;
  isSelected: boolean;
  onSelect: () => void;
  getPriorityColor: (priority: string) => string;
  getSentimentColor: (sentiment: string) => string;
}

const TicketQueueItem = ({ 
  ticket, 
  isSelected, 
  onSelect, 
  getPriorityColor, 
  getSentimentColor 
}: TicketQueueItemProps) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border'
      }`}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
            <Badge className={getPriorityColor(ticket.aiAnalysis.suggestedPriority)}>
              AI: {ticket.aiAnalysis.suggestedPriority}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Bot className="h-3 w-3 text-primary" />
            <span className="text-xs text-primary">{ticket.aiAnalysis.confidence}%</span>
          </div>
        </div>

        {/* Subject */}
        <h4 className="font-medium text-sm line-clamp-2">{ticket.subject}</h4>

        {/* Customer */}
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={ticket.customer.avatar} />
            <AvatarFallback className="text-xs">{ticket.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{ticket.customer.name}</span>
          <Badge variant="outline" className="text-xs">{ticket.customer.tier}</Badge>
        </div>

        {/* AI Analysis */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs ${getSentimentColor(ticket.aiAnalysis.sentiment)}`}>
              {ticket.aiAnalysis.sentiment} sentiment
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{ticket.aiAnalysis.category}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {ticket.aiAnalysis.suggestedTags.slice(0, 2).map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {ticket.aiAnalysis.suggestedTags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{ticket.aiAnalysis.suggestedTags.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {new Date(ticket.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TicketQueue;