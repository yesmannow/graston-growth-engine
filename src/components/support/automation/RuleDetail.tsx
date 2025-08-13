import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, Zap, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { AutomationRule, AutomationCondition, AutomationAction } from '@/types/support';

interface RuleDetailProps {
  rule: AutomationRule;
  onToggleRule: (ruleId: string) => void;
  onEditRule: (rule: AutomationRule) => void;
  onDeleteRule: (ruleId: string) => void;
}

const RuleDetail = ({ rule, onToggleRule, onEditRule, onDeleteRule }: RuleDetailProps) => {
  const triggerTypes = [
    { value: 'ticket_created', label: 'New Ticket Created' },
    { value: 'ticket_updated', label: 'Ticket Updated' },
    { value: 'customer_replied', label: 'Customer Replied' },
    { value: 'time_based', label: 'Time-based (Schedule)' }
  ];

  const actionTypes = [
    { value: 'assign_agent', label: 'Assign to Agent/Team' },
    { value: 'add_tag', label: 'Add Tag' },
    { value: 'change_priority', label: 'Change Priority' },
    { value: 'send_email', label: 'Send Email' },
    { value: 'create_task', label: 'Create Task' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{rule.name}</CardTitle>
            <p className="text-gray-600">{rule.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={rule.isActive}
              onCheckedChange={() => onToggleRule(rule.id)}
            />
            <Button variant="outline" onClick={() => onEditRule(rule)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={() => onDeleteRule(rule.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{rule.executionCount}</p>
            <p className="text-xs text-gray-600">Times Executed</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {rule.isActive ? 'Active' : 'Inactive'}
            </p>
            <p className="text-xs text-gray-600">Status</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {new Date(rule.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-600">Created</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h4 className="font-medium">WHEN</h4>
            </div>
            <p className="text-sm">
              {triggerTypes.find(t => t.value === rule.trigger.type)?.label}
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-gray-400" />
          </div>

          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              <h4 className="font-medium">IF</h4>
            </div>
            <div className="space-y-2">
              {rule.conditions.map((condition: AutomationCondition, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Badge variant="outline">{condition.field}</Badge>
                  <span>{condition.operator}</span>
                  <Badge variant="secondary">"{condition.value}"</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-gray-400" />
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <h4 className="font-medium">THEN</h4>
            </div>
            <div className="space-y-2">
              {rule.actions.map((action: AutomationAction, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{actionTypes.find(a => a.value === action.type)?.label}</span>
                  {action.config && Object.keys(action.config).length > 0 && (
                    <Badge variant="outline">
                      {Object.values(action.config)[0] as string}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleDetail;