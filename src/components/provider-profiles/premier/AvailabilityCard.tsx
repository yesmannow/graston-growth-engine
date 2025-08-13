import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface AvailabilityCardProps {
  provider: ProviderProfile;
}

const AvailabilityCard = ({ provider }: AvailabilityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          {provider.accepting_new_patients ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          <span className="text-sm text-gray-700">
            {provider.accepting_new_patients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {provider.telehealth_available ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-gray-400" />
          )}
          <span className="text-sm text-gray-700">
            {provider.telehealth_available ? 'Telehealth Available' : 'In-Person Only'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCard;