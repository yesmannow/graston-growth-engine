import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface LocationMapCardProps {
  provider: ProviderProfile;
}

const LocationMapCard = ({ provider }: LocationMapCardProps) => {
  if (!provider.location_map) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Interactive Map</p>
            <p className="text-xs text-gray-400">
              ({provider.location_map.lat}, {provider.location_map.lng})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMapCard;