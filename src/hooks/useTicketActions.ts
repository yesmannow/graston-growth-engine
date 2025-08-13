import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SupportTicket } from '@/types/support';

export const useTicketActions = () => {
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAcceptSuggestion = (ticket: SupportTicket) => {
    setReplyText(ticket.aiAnalysis.suggestedReply);
    toast({
      title: "Suggestion Accepted",
      description: "AI-suggested reply has been copied to the editor",
    });
  };

  const handleRejectSuggestion = () => {
    toast({
      title: "Suggestion Rejected",
      description: "Thank you for your feedback. We'll use it to improve our AI.",
    });
  };

  const handleSendReply = async (
    ticket: SupportTicket | null,
    updateTicketStatus: (ticketId: string, newStatus: SupportTicket['status']) => void
  ) => {
    if (!ticket || !replyText.trim()) return;

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateTicketStatus(ticket.id, 'Resolved');
    setReplyText('');
    setLoading(false);
    
    toast({
      title: "Reply Sent",
      description: `Your reply to ticket ${ticket.id} has been sent successfully.`,
    });
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