"use client";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import { FullProviderProfile, Tier } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useCallback } from 'react';
import MiniProfileCard from './MiniProfileCard';

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface DirectoryMapProps {
  providers: FullProviderProfile[];
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  onBoundsChanged?: (bounds: google.maps.LatLngBounds) => void;
}

const getMarkerIcon = (tier: Tier, isHovered: boolean) => {
  const baseIcons: Record<Tier, google.maps.Symbol> = {
    Premier: {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: "#8B5CF6", // purple-500
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: "white",
    },
    Preferred: {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: "#3B82F6", // blue-500
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "white",
    },
    Free: {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 6,
      fillColor: "#6B7280", // gray-500
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "white",
    },
  };
  
  const icon = baseIcons[tier];
  if (isHovered) {
    return { ...icon, scale: icon.scale * 1.2, strokeColor: '#FBBF24' }; // Enlarge and add yellow border on hover
  }
  return icon;
};

const DirectoryMap = ({ providers, apiKey, center, zoom, onBoundsChanged }: DirectoryMapProps) => {
  const [selectedProvider, setSelectedProvider] = useState<FullProviderProfile | null>(null);
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <Skeleton className="w-full h-full rounded-lg" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onIdle={() => {
        if (map) {
          const bounds = map.getBounds();
          if (bounds && onBoundsChanged) {
            onBoundsChanged(bounds);
          }
        }
      }}
    >
      <MarkerClusterer>
        {(clusterer) =>
          providers.map(provider => (
            provider.coordinates && (
              <Marker 
                key={provider.id} 
                position={provider.coordinates} 
                title={provider.name}
                clusterer={clusterer}
                onClick={() => setSelectedProvider(provider)}
                onMouseOver={() => setHoveredProviderId(provider.id)}
                onMouseOut={() => setHoveredProviderId(null)}
                icon={getMarkerIcon(provider.tier, provider.id === hoveredProviderId || provider.id === selectedProvider?.id)}
                zIndex={provider.id === hoveredProviderId || provider.id === selectedProvider?.id ? 1000 : 1}
              />
            )
          ))
        }
      </MarkerClusterer>

      {selectedProvider && selectedProvider.coordinates && (
        <InfoWindow
          position={selectedProvider.coordinates}
          onCloseClick={() => setSelectedProvider(null)}
          options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
        >
          <MiniProfileCard provider={selectedProvider} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default DirectoryMap;