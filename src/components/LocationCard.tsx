import React from "react";
import { Provider } from "@/types/provider";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface LocationCardProps {
  provider: Provider;
}

const LocationCard: React.FC<LocationCardProps> = ({ provider }) => {
  const { location_map } = provider.location;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(location_map.address)}&output=embed&z=${location_map.zoom}&ll=${location_map.lat},${location_map.lng}`;
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-medium">Location</h2>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{location_map.address}</p>
        <div className="w-full h-48">
          <iframe
            title="clinic-location"
            src={src}
            width="100%"
            height="100%"
            className="rounded"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;