import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const EmptyTicketState = () => {
  return (
    <Card className="h-full flex items-center justify-center">
      <CardContent className="text-center">
        <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Select a Ticket</h3>
        <p className="text-muted-foreground">Choose a ticket from the queue to view AI analysis and respond</p>
      </CardContent>
    </Card>
  );
};

export default EmptyTicketState;