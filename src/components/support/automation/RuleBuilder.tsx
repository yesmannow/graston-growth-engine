import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Zap, Plus, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { AutomationTrigger } from '@/types/support';

interface RuleForm {
  name: string;
  description: string;
  trigger: AutomationTrigger;
  conditions: any[];
  actions: any[];
}

interface RuleBuilderProps {
  ruleForm: RuleForm;
  onRuleFormChange: (form: RuleForm) => void;
  onSave: () => void;
  onCancel: () => void;
}

const RuleBuilder = ({ ruleForm, onRuleFormChange, onSave, onCancel }: RuleBuilderProps) => {
  const triggerTypes = [
    { value: 'ticket_created', label: 'New Ticket Created' },
    { value: 'ticket_updated', label: 'Ticket Updated' },
    { value: 'customer_replied', label: 'Customer Replied' },
    { value: 'time_based', label: 'Time-based (Schedule)' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Create Automation Rule</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSave}>
              <Zap className="h-4 w-4 mr-2" />
              Save Rule
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Rule Name</label>
            <Input
              value={ruleForm.name}
              onChange={(e) => onRuleFormChange({ ...ruleForm, name: e.target.value })}
              placeholder="Enter rule name..."
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Input
              value={ruleForm.description}
              onChange={(e) => onRuleFormChange({ ...ruleForm, description: e.target.value })}
              placeholder="Describe what this rule does..."
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h4 className="font-medium">WHEN (Trigger)</h4>
            </div>
            <Select 
              value={ruleForm.trigger.type}
              onValueChange={(value) => onRuleFormChange({ 
                ...ruleForm, 
                trigger: { ...ruleForm.trigger, type: value as AutomationTrigger['type'] }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a trigger..." />
              </SelectTrigger>
              <SelectContent>
                {triggerTypes.map((triggerType) => (
                  <SelectItem key={triggerType.value} value={triggerType.value}>
                    {triggerType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-gray-400" />
          </div>

          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-medium">IF (Conditions)</h4>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Condition
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              No conditions added yet. Click "Add Condition" to set criteria.
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-6 w-6 text-gray-400" />
          </div>

          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-medium">THEN (Actions)</h4>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Action
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              No actions added yet. Click "Add Action" to define what happens.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleBuilder;