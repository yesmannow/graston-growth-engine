import { useState } from 'react';
import { SupportTicket } from '@/types/support';
import { useToast } from '@/hooks/use-toast';

export const useTicketActions = () => {
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAcceptSuggestion = (ticket: SupportTicket) => {
    setReplyText(ticket.aiAnalysis.suggestedReply);
    toast({
      title: "AI Suggestion Accepted",
      description: "The suggested reply has been loaded into the editor",
    });
  };

  const handleRejectSuggestion = (ticket: SupportTicket) => {
    toast({
      title: "AI Suggestion Rejected",
      description: "You can write a custom reply",
    });
  };

  const handleSendReply = async (
    selectedTicket: SupportTicket | null,
    onTicketUpdate: (ticketId: string, status: SupportTicket['status']) => void
  ) => {
    if (!selectedTicket || !replyText.trim()) return;

    setLoading(true);
    
    // Simulate sending reply
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update ticket status
    onTicketUpdate(selectedTicket.id, 'In Progress');

    toast({
      title: "Reply Sent",
      description: "Your response has been sent to the customer",
    });

    setReplyText('');
    setLoading(false);
  };

  return {
    replyText,
    setReplyText,
    loading,
    handleAcceptSuggestion,
    handleRejectSuggestion,
    handleSendReply
  };
};