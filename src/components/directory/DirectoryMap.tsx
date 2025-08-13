import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useMemo } from "react";
import { FullProviderProfile } from "@/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface DirectoryMapProps {
  providers: FullProviderProfile[];
  hoveredProviderId: string | null;
  onMarkerHover: (id: string | null) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 39.8283, // Center of the US
  lng: -98.5795
};

const DirectoryMap = ({ providers, hoveredProviderId, onMarkerHover }: DirectoryMapProps) => {
  const [selectedProvider, setSelectedProvider] = useState<FullProviderProfile | null>(null);

  const providerLocations = useMemo(() => {
    // In a real app, you'd have lat/lng for each provider.
    // Here, we'll generate random-ish locations for demonstration.
    return providers.map((p, i) => ({
      ...p,
      position: {
        lat: 34.0522 + (Math.random() - 0.5) * 5, // Around LA
        lng: -118.2437 + (Math.random() - 0.5) * 5,
      }
    }));
  }, [providers]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
    >
      {providerLocations.map(provider => (
        <Marker
          key={provider.id}
          position={provider.position}
          onClick={() => setSelectedProvider(provider)}
          onMouseOver={() => onMarkerHover(provider.id)}
          onMouseOut={() => onMarkerHover(null)}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: hoveredProviderId === provider.id ? 10 : 7,
            fillColor: provider.tier === 'Premier' ? '#8B5CF6' : provider.tier === 'Preferred' ? '#3B82F6' : '#6B7280',
            fillOpacity: 0.9,
            strokeWeight: 1,
            strokeColor: '#ffffff'
          }}
        />
      ))}

      {selectedProvider && (
        <InfoWindow
          position={selectedProvider.position}
          onCloseClick={() => setSelectedProvider(null)}
        >
          <div className="p-1 max-w-xs">
            <h3 className="font-bold text-md mb-1">{selectedProvider.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedProvider.specialty}</p>
            <div className="flex gap-1 mb-2">
              <Badge variant={selectedProvider.tier === 'Premier' ? 'default' : 'secondary'}>{selectedProvider.tier}</Badge>
            </div>
            <Button size="sm" className="w-full">View Profile</Button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default DirectoryMap;