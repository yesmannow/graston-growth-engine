import React, { useState } from 'react';
import AutomationRulesList from './automation/AutomationRulesList';
import RuleBuilder from './automation/RuleBuilder';
import RuleDetail from './automation/RuleDetail';
import EmptyRuleState from './automation/EmptyRuleState';
import { useAutomationRules } from '@/hooks/useAutomationRules';
import { useRuleBuilder, RuleForm } from '@/hooks/useRuleBuilder';
import { AutomationRule } from '@/types/support';
import { useToast } from '@/hooks/use-toast';

const AutomationBuilder = () => {
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  
  const {
    rules,
    loading: rulesLoading,
    toggleRule,
    createRule,
    updateRule,
    deleteRule,
    refreshRules
  } = useAutomationRules();

  const {
    isCreating,
    isEditing,
    editingRule,
    ruleForm,
    startCreating,
    startEditing,
    cancelBuilder,
    updateRuleForm,
    validateForm
  } = useRuleBuilder();

  const { toast } = useToast();

  const handleRuleSelect = (rule: AutomationRule) => {
    if (!isCreating && !isEditing) {
      setSelectedRule(rule);
    }
  };

  const handleToggleRule = (ruleId: string) => {
    toggleRule(ruleId);
    // Update selected rule if it's the one being toggled
    if (selectedRule?.id === ruleId) {
      setSelectedRule(prev => prev ? { ...prev, isActive: !prev.isActive } : null);
    }
    
    toast({
      title: "Rule Updated",
      description: "Automation rule status has been updated successfully",
    });
  };

  const handleCreateRule = () => {
    startCreating();
    setSelectedRule(null);
  };

  const handleEditRule = (rule: AutomationRule) => {
    startEditing(rule);
    setSelectedRule(null);
  };

  const handleDeleteRule = (ruleId: string) => {
    deleteRule(ruleId);
    if (selectedRule?.id === ruleId) {
      setSelectedRule(null);
    }
    
    toast({
      title: "Rule Deleted",
      description: "Automation rule has been deleted successfully",
    });
  };

  const handleSaveRule = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && editingRule) {
      // Type assertion to ensure compatibility
      updateRule(editingRule.id, ruleForm as Partial<AutomationRule>);
      toast({
        title: "Rule Updated",
        description: "Automation rule has been updated successfully",
      });
    } else {
      const newRule = createRule({
        ...ruleForm,
        isActive: true,
        createdBy: {
          id: 'current-user',
          name: 'Current User',
          email: 'user@company.com',
          avatar: '',
          status: 'Online',
          department: 'Support',
          activeChats: 0,
          maxChats: 5,
          skills: []
        }
      } as Omit<AutomationRule, 'id' | 'createdAt' | 'executionCount'>);
      
      setSelectedRule(newRule);
      
      toast({
        title: "Rule Created",
        description: "New automation rule has been created and activated",
      });
    }

    cancelBuilder();
  };

  const handleCancelBuilder = () => {
    cancelBuilder();
    // If we were editing, restore the selected rule
    if (isEditing && editingRule) {
      setSelectedRule(editingRule);
    }
  };

  if (rulesLoading) {
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
      {/* Rules List */}
      <div className="lg:col-span-1 space-y-4">
        <AutomationRulesList
          rules={rules}
          selectedRule={selectedRule}
          onRuleSelect={handleRuleSelect}
          onToggleRule={handleToggleRule}
          onCreateRule={handleCreateRule}
        />
      </div>

      {/* Rule Detail/Builder */}
      <div className="lg:col-span-2">
        {isCreating || isEditing ? (
          <RuleBuilder
            ruleForm={ruleForm}
            onRuleFormChange={updateRuleForm}
            onSave={handleSaveRule}
            onCancel={handleCancelBuilder}
          />
        ) : selectedRule ? (
          <RuleDetail
            rule={selectedRule}
            onToggleRule={handleToggleRule}
            onEditRule={handleEditRule}
            onDeleteRule={handleDeleteRule}
          />
        ) : (
          <EmptyRuleState />
        )}
      </div>
    </div>
  );
};

export default AutomationBuilder;