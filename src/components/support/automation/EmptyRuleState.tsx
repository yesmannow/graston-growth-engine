import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

const EmptyRuleState = () => {
  return (
    <Card className="h-full flex items-center justify-center">
      <CardContent className="text-center">
        <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a rule</h3>
        <p className="text-gray-600">Choose an automation rule to view details or create a new one</p>
      </CardContent>
    </Card>
  );
};

export default EmptyRuleState;