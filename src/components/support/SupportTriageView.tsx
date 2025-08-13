import React, { useState } from 'react';
import TicketQueue from './triage/TicketQueue';
import TicketHeader from './triage/TicketHeader';
import AiAnalysisCard from './triage/AiAnalysisCard';
import ReplyInterface from './triage/ReplyInterface';
import EmptyTicketState from './triage/EmptyTicketState';
import { useTicketData } from '@/hooks/useTicketData';
import { useTicketActions } from '@/hooks/useTicketActions';
import { SupportTicket } from '@/types/support';

const SupportTriageView = () => {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  
  const {
    tickets,
    loading: ticketsLoading,
    updateTicketPriority,
    updateTicketStatus,
    refreshTickets
  } = useTicketData();

  const {
    replyText,
    setReplyText,
    loading: actionsLoading,
    handleAcceptSuggestion,
    handleRejectSuggestion,
    handleSendReply
  } = useTicketActions();

  const handleTicketSelect = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
  };

  const handlePriorityChange = (ticketId: string, newPriority: string) => {
    updateTicketPriority(ticketId, newPriority);
    // Update selected ticket if it's the one being changed
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev: SupportTicket | null) => 
        prev ? { ...prev, priority: newPriority as SupportTicket['priority'] } : null
      );
    }
  };

  const handleSendReplyWrapper = () => {
    handleSendReply(selectedTicket, updateTicketStatus);
  };

  if (ticketsLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <div className="lg:col-span-1">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Ticket Queue */}
      <div className="lg:col-span-1 space-y-4">
        <TicketQueue
          tickets={tickets}
          selectedTicket={selectedTicket}
          onTicketSelect={handleTicketSelect}
          onRefresh={refreshTickets}
        />
      </div>

      {/* Ticket Detail */}
      <div className="lg:col-span-2">
        {selectedTicket ? (
          <div className="space-y-4">
            <TicketHeader
              ticket={selectedTicket}
              onPriorityChange={handlePriorityChange}
            />

            <AiAnalysisCard
              ticket={selectedTicket}
              onAcceptSuggestion={handleAcceptSuggestion}
              onRejectSuggestion={handleRejectSuggestion}
            />

            <ReplyInterface
              replyText={replyText}
              onReplyTextChange={setReplyText}
              onSendReply={handleSendReplyWrapper}
              loading={actionsLoading}
            />
          </div>
        ) : (
          <EmptyTicketState />
        )}
      </div>
    </div>
  );
};

export default SupportTriageView;