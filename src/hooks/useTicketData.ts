import { useState, useEffect } from 'react';
import { SupportTicket } from '@/types/support';

export const useTicketData = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockTickets: SupportTicket[] = [
        {
          id: 'TKT-001',
          subject: 'Unable to upgrade to Premier tier',
          description: 'I\'ve been trying to upgrade my account to Premier tier but the payment keeps failing. I\'ve tried multiple credit cards and the issue persists.',
          customer: {
            name: 'Dr. Sarah Johnson',
            email: 'sarah@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
            tier: 'Preferred'
          },
          priority: 'Normal',
          category: 'Billing',
          channel: 'Email',
          createdAt: new Date().toISOString(),
          aiAnalysis: {
            suggestedPriority: 'High',
            suggestedTags: ['billing', 'payment-failure', 'upgrade'],
            suggestedReply: 'Hi Dr. Johnson,\n\nI understand how frustrating payment issues can be. Let me help you resolve this immediately.\n\nI\'ve checked your account and see the payment attempts. This is typically caused by:\n1. Bank security measures for online transactions\n2. Billing address mismatch\n3. Card limits for subscription services\n\nI\'ve temporarily enabled manual processing for your account. Please try the upgrade again, and if it still fails, I can process it manually with a quick phone call.\n\nBest regards,\nSupport Team',
            sentiment: 'negative',
            confidence: 92,
            category: 'Billing Issue'
          },
          status: 'New'
        },
        {
          id: 'TKT-002',
          subject: 'Profile verification request',
          description: 'Hello, I would like to get my provider profile verified. I have all the necessary documentation ready.',
          customer: {
            name: 'Dr. Michael Chen',
            email: 'michael@example.com',
            tier: 'Free'
          },
          priority: 'Normal',
          category: 'Verification',
          channel: 'Form',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          aiAnalysis: {
            suggestedPriority: 'Normal',
            suggestedTags: ['verification', 'documentation', 'profile'],
            suggestedReply: 'Hello Dr. Chen,\n\nThank you for your verification request! I\'d be happy to help you get your profile verified.\n\nTo complete the verification process, please upload the following documents through your provider dashboard:\n\n1. Professional license (current and valid)\n2. Graston Technique certification\n3. Professional headshot photo\n4. Business registration (if applicable)\n\nOnce uploaded, our verification team will review within 2-3 business days. You\'ll receive an email confirmation once approved.\n\nIf you need any assistance with the upload process, please let me know!\n\nBest regards,\nVerification Team',
            sentiment: 'positive',
            confidence: 88,
            category: 'Account Verification'
          },
          status: 'New'
        }
      ];

      setTickets(mockTickets);
      setLoading(false);
    };

    fetchTickets();
  }, []);

  const updateTicketPriority = (ticketId: string, newPriority: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, priority: newPriority as SupportTicket['priority'] }
        : ticket
    ));
  };

  const updateTicketStatus = (ticketId: string, newStatus: SupportTicket['status']) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus }
        : ticket
    ));
  };

  const refreshTickets = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return {
    tickets,
    loading,
    updateTicketPriority,
    updateTicketStatus,
    refreshTickets
  };
};