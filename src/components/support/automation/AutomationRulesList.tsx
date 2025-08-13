import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Plus, Zap, Edit, Mail, Clock } from 'lucide-react';
import { AutomationRule } from '@/types/support';

interface AutomationRulesListProps {
  rules: AutomationRule[];
  selectedRule: AutomationRule | null;
  onRuleSelect: (rule: AutomationRule) => void;
  onToggleRule: (ruleId: string) => void;
  onCreateRule: () => void;
}

const AutomationRulesList = ({ 
  rules, 
  selectedRule, 
  onRuleSelect, 
  onToggleRule, 
  onCreateRule 
}: AutomationRulesListProps) => {
  const getTriggerIcon = (triggerType: string) => {
    const icons = {
      'ticket_created': Plus,
      'ticket_updated': Edit,
      'customer_replied': Mail,
      'time_based': Clock
    };
    return icons[triggerType as keyof typeof icons] || Zap;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Automation Rules</CardTitle>
          <Button onClick={onCreateRule}>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Quick Templates</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              Auto-reply After Hours
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              Escalate Urgent Tickets
            </Button>
          </div>
        </div>
        
        <Separator />

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {rules.map((rule) => {
            const TriggerIcon = getTriggerIcon(rule.trigger.type);
            
            return (
              <div
                key={rule.id}
                onClick={() => onRuleSelect(rule)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                  selectedRule?.id === rule.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <TriggerIcon className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-sm">{rule.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => onToggleRule(rule.id)}
                    />
                    <Badge variant={rule.isActive ? 'default' : 'secondary'} className="text-xs">
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{rule.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Executed {rule.executionCount} times</span>
                  <span>{new Date(rule.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationRulesList;