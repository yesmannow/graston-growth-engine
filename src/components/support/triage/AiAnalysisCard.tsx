import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, CheckCircle, XCircle } from 'lucide-react';
import { SupportTicket } from '@/types/support';

interface AiAnalysisCardProps {
  ticket: SupportTicket;
  onAcceptSuggestion: (ticket: SupportTicket) => void;
  onRejectSuggestion: (ticket: SupportTicket) => void;
}

const AiAnalysisCard = ({ ticket, onAcceptSuggestion, onRejectSuggestion }: AiAnalysisCardProps) => {
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
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Analysis & Suggested Response
          <Badge variant="outline">{ticket.aiAnalysis.confidence}% confidence</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Suggested Priority</label>
            <Badge className={getPriorityColor(ticket.aiAnalysis.suggestedPriority)}>
              {ticket.aiAnalysis.suggestedPriority}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <p className="text-sm">{ticket.aiAnalysis.category}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Suggested Tags</label>
          <div className="flex flex-wrap gap-1 mt-1">
            {ticket.aiAnalysis.suggestedTags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">AI Suggested Reply</label>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onAcceptSuggestion(ticket)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Accept
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onRejectSuggestion(ticket)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg text-sm whitespace-pre-wrap">
            {ticket.aiAnalysis.suggestedReply}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiAnalysisCard;