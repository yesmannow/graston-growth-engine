import { useState } from 'react';
import { AutomationRule, AutomationTrigger } from '@/types/support';

interface RuleForm {
  name: string;
  description: string;
  trigger: AutomationTrigger;
  conditions: any[];
  actions: any[];
}

export const useRuleBuilder = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);
  const [ruleForm, setRuleForm] = useState<RuleForm>({
    name: '',
    description: '',
    trigger: { type: 'ticket_created', config: {} },
    conditions: [],
    actions: []
  });

  const startCreating = () => {
    setRuleForm({
      name: '',
      description: '',
      trigger: { type: 'ticket_created', config: {} },
      conditions: [],
      actions: []
    });
    setEditingRule(null);
    setIsCreating(true);
    setIsEditing(false);
  };

  const startEditing = (rule: AutomationRule) => {
    setRuleForm({
      name: rule.name,
      description: rule.description,
      trigger: rule.trigger,
      conditions: rule.conditions,
      actions: rule.actions
    });
    setEditingRule(rule);
    setIsEditing(true);
    setIsCreating(false);
  };

  const cancelBuilder = () => {
    setIsCreating(false);
    setIsEditing(false);
    setEditingRule(null);
    setRuleForm({
      name: '',
      description: '',
      trigger: { type: 'ticket_created', config: {} },
      conditions: [],
      actions: []
    });
  };

  const updateRuleForm = (updates: Partial<RuleForm>) => {
    setRuleForm(prev => ({ ...prev, ...updates }));
  };

  const validateForm = (): boolean => {
    return !!(ruleForm.name.trim() && ruleForm.description.trim() && ruleForm.trigger.type);
  };

  return {
    isCreating,
    isEditing,
    editingRule,
    ruleForm,
    startCreating,
    startEditing,
    cancelBuilder,
    updateRuleForm,
    validateForm
  };
};

export type { RuleForm };