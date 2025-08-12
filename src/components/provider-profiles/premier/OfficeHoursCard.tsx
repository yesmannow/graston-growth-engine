import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface OfficeHoursCardProps {
  provider: ProviderProfile;
}

const OfficeHoursCard = ({ provider }: OfficeHoursCardProps) => {
  if (!provider.office_hours) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Office Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {provider.office_hours.map((hours, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="font-medium text-gray-700 text-sm">{hours.day}</span>
              <span className="text-gray-600 text-sm">
                {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OfficeHoursCard;