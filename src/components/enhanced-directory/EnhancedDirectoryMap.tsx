import { GoogleMap, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import { useState, useMemo, useCallback } from "react";
import { FullProviderProfile } from "@/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";

interface EnhancedDirectoryMapProps {
  providers: FullProviderProfile[];
  hoveredProviderId: string | null;
  onMarkerHover: (id: string | null) => void;
  center: { lat: number; lng: number };
  zoom: number;
  userLocation: { lat: number; lng: number } | null;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [ // Example styles from Snazzy Maps
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    // ... more styles
  ]
};

const EnhancedDirectoryMap = ({ providers, hoveredProviderId, onMarkerHover, center, zoom, userLocation }: EnhancedDirectoryMapProps) => {
  const [selectedProvider, setSelectedProvider] = useState<FullProviderProfile | null>(null);

  const providerLocations = useMemo(() => {
    return providers.map((p, i) => ({
      ...p,
      position: {
        lat: 34.0522 + (Math.random() - 0.5) * (i * 0.1),
        lng: -118.2437 + (Math.random() - 0.5) * (i * 0.1),
      }
    }));
  }, [providers]);

  const handleMarkerClick = useCallback((provider: any) => {
    setSelectedProvider(provider);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={mapOptions}
    >
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
          }}
        />
      )}
      {providerLocations.map(provider => (
        <Marker
          key={provider.id}
          position={provider.position}
          onClick={() => handleMarkerClick(provider)}
          onMouseOver={() => onMarkerHover(provider.id)}
          onMouseOut={() => onMarkerHover(null)}
          zIndex={hoveredProviderId === provider.id || selectedProvider?.id === provider.id ? 10 : 1}
          icon={{
            url: provider.profileImage,
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20),
            origin: new window.google.maps.Point(0, 0),
          }}
        />
      ))}

      {selectedProvider && (
        <InfoWindow
          position={selectedProvider.position}
          onCloseClick={() => setSelectedProvider(null)}
          options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
        >
          <div className="p-1 max-w-xs text-left">
            <div className="flex items-center gap-3 mb-2">
              <Avatar>
                <AvatarImage src={selectedProvider.profileImage} />
                <AvatarFallback>{selectedProvider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-md">{selectedProvider.name}</h3>
                <p className="text-sm text-gray-600">{selectedProvider.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm mb-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{selectedProvider.rating}</span>
              <span className="text-gray-500">({selectedProvider.reviews} reviews)</span>
            </div>
            <Button size="sm" className="w-full">View Full Profile</Button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default EnhancedDirectoryMap;