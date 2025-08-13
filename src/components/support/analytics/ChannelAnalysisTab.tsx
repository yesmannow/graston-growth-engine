import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

interface ChannelData {
  channel: string;
  tickets: number;
  percentage: number;
}

interface ChannelAnalysisTabProps {
  channelData: ChannelData[];
}

const ChannelAnalysisTab = ({ channelData }: ChannelAnalysisTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelData.map((channel) => (
                <div key={channel.channel} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="font-medium">{channel.channel}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{channel.tickets} tickets</span>
                    <Badge variant="outline">{channel.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Channel performance chart would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChannelAnalysisTab;