import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface AgentPerformance {
  id: string;
  name: string;
  avatar: string;
  ticketsSolved: number;
  avgResponseTime: number;
  customerRating: number;
  status: string;
}

interface AgentPerformanceTabProps {
  agentPerformance: AgentPerformance[];
}

const AgentPerformanceTab = ({ agentPerformance }: AgentPerformanceTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agentPerformance.map((agent, index) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <Avatar>
                      <AvatarImage src={agent.avatar} />
                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="font-medium">{agent.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={agent.status === 'Online' ? 'default' : 'secondary'}>
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-lg font-bold">{agent.ticketsSolved}</p>
                    <p className="text-xs text-gray-600">Tickets Solved</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{agent.avgResponseTime}h</p>
                    <p className="text-xs text-gray-600">Avg Response</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-lg font-bold">{agent.customerRating}</span>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentPerformanceTab;