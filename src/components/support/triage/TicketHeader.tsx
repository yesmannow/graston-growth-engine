import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SupportTicket } from '@/types/support';

interface TicketHeaderProps {
  ticket: SupportTicket;
  onPriorityChange: (ticketId: string, newPriority: string) => void;
}

const TicketHeader = ({ ticket, onPriorityChange }: TicketHeaderProps) => {
  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Normal': 'bg-blue-100 text-blue-800',
      'High': 'bg-orange-100 text-orange-800',
      'Urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{ticket.subject}</h2>
              <Badge className={getPriorityColor(ticket.priority)}>
                {ticket.priority}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={ticket.customer.avatar} />
                  <AvatarFallback className="text-xs">{ticket.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{ticket.customer.name}</span>
                <Badge variant="outline">{ticket.customer.tier}</Badge>
              </div>
              <span>•</span>
              <span>{ticket.channel}</span>
              <span>•</span>
              <span>{new Date(ticket.createdAt).toLocaleString()}</span>
            </div>
          </div>
          <Select 
            value={ticket.priority} 
            onValueChange={(value) => onPriorityChange(ticket.id, value)}
          >
            <SelectTrigger className="w-32">
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
      </CardHeader>
      <CardContent>
        <p className="text-sm">{ticket.description}</p>
      </CardContent>
    </Card>
  );
};

export default TicketHeader;