import { useState, useEffect } from 'react';
import { AutomationRule } from '@/types/support';

export const useAutomationRules = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRules = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockRules: AutomationRule[] = [
        {
          id: 'rule-1',
          name: 'Auto-assign Billing Questions',
          description: 'Automatically assign tickets with billing-related keywords to the Finance team',
          isActive: true,
          trigger: {
            type: 'ticket_created',
            config: {}
          },
          conditions: [
            {
              field: 'subject',
              operator: 'contains',
              value: 'billing'
            },
            {
              field: 'subject',
              operator: 'contains',
              value: 'payment'
            }
          ],
          actions: [
            {
              type: 'assign_agent',
              config: { teamId: 'finance-team' }
            },
            {
              type: 'add_tag',
              config: { tag: 'billing' }
            },
            {
              type: 'change_priority',
              config: { priority: 'High' }
            }
          ],
          createdBy: {
            id: 'agent-1',
            name: 'Sarah Wilson',
            email: 'sarah@company.com',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
            status: 'Online',
            department: 'Support',
            activeChats: 0,
            maxChats: 5,
            skills: ['Automation']
          },
          createdAt: '2024-01-10T09:00:00Z',
          executionCount: 47
        },
        {
          id: 'rule-2',
          name: 'VIP Customer Priority',
          description: 'Set high priority for tickets from VIP customers',
          isActive: true,
          trigger: {
            type: 'ticket_created',
            config: {}
          },
          conditions: [
            {
              field: 'customer.tier',
              operator: 'equals',
              value: 'Enterprise'
            }
          ],
          actions: [
            {
              type: 'change_priority',
              config: { priority: 'Urgent' }
            },
            {
              type: 'add_tag',
              config: { tag: 'vip' }
            }
          ],
          createdBy: {
            id: 'agent-1',
            name: 'Sarah Wilson',
            email: 'sarah@company.com',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
            status: 'Online',
            department: 'Support',
            activeChats: 0,
            maxChats: 5,
            skills: ['Automation']
          },
          createdAt: '2024-01-12T14:30:00Z',
          executionCount: 23
        }
      ];

      setRules(mockRules);
      setLoading(false);
    };

    fetchRules();
  }, []);

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const createRule = (newRule: Omit<AutomationRule, 'id' | 'createdAt' | 'executionCount'>) => {
    const rule: AutomationRule = {
      ...newRule,
      id: `rule-${Date.now()}`,
      createdAt: new Date().toISOString(),
      executionCount: 0
    };
    
    setRules(prev => [...prev, rule]);
    return rule;
  };

  const updateRule = (ruleId: string, updates: Partial<AutomationRule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
  };

  const deleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const refreshRules = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return {
    rules,
    loading,
    toggleRule,
    createRule,
    updateRule,
    deleteRule,
    refreshRules
  };
};