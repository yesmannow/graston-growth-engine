export type TicketStatus = 'New' | 'Open' | 'Pending' | 'On-Hold' | 'Solved' | 'Closed';
export type TicketPriority = 'Low' | 'Normal' | 'High' | 'Urgent';
export type TicketChannel = 'Email' | 'Form' | 'Social' | 'Chat' | 'Phone';
export type ChatStatus = 'Online' | 'Away' | 'Busy' | 'Offline';

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  totalTickets: number;
  lastActivity: string;
  tags: string[];
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: ChatStatus;
  department: string;
  activeChats: number;
  maxChats: number;
  skills: string[];
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  customer: Customer;
  assignedAgent?: Agent;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  slaBreachTime?: string;
  isBeingViewed?: boolean;
  viewedBy?: Agent;
  messages: TicketMessage[];
  internalNotes: InternalNote[];
}

export interface TicketMessage {
  id: string;
  content: string;
  author: Customer | Agent;
  timestamp: string;
  isInternal: boolean;
  attachments?: Attachment[];
}

export interface InternalNote {
  id: string;
  content: string;
  author: Agent;
  timestamp: string;
  isPrivate: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: Agent;
  createdAt: string;
  updatedAt: string;
  version: number;
  isPublished: boolean;
  views: number;
  helpfulVotes: number;
  unhelpfulVotes: number;
  relatedArticles: string[];
}

export interface ChatSession {
  id: string;
  customer: Customer;
  agent?: Agent;
  status: 'Waiting' | 'Active' | 'Ended';
  messages: ChatMessage[];
  startedAt: string;
  endedAt?: string;
  rating?: number;
  feedback?: string;
  transcript?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'customer' | 'agent';
  timestamp: string;
  isSystemMessage?: boolean;
}

export interface CannedResponse {
  id: string;
  title: string;
  content: string;
  shortcut: string;
  category: string;
  author: Agent;
  usageCount: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  createdBy: Agent;
  createdAt: string;
  executionCount: number;
}

export interface AutomationTrigger {
  type: 'ticket_created' | 'ticket_updated' | 'customer_replied' | 'time_based';
  config: Record<string, any>;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
}

export interface AutomationAction {
  type: 'assign_agent' | 'add_tag' | 'change_priority' | 'send_email' | 'create_task';
  config: Record<string, any>;
}

export interface SupportMetrics {
  totalTickets: number;
  openTickets: number;
  avgFirstResponseTime: number;
  avgResolutionTime: number;
  customerSatisfaction: number;
  slaBreaches: number;
  agentUtilization: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
    tier: string;
  };
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  category: string;
  channel: 'Email' | 'Form' | 'Chat' | 'Phone';
  createdAt: string;
  aiAnalysis: {
    suggestedPriority: 'Low' | 'Normal' | 'High' | 'Urgent';
    suggestedTags: string[];
    suggestedReply: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    confidence: number;
    category: string;
  };
  status: 'New' | 'In Progress' | 'Resolved';
}