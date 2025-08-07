"use client";

import React, { useState, useMemo } from 'react';
import { Map, APIProvider, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { FullProviderProfile } from '@/types';
import MiniProfileCard from './MiniProfileCard';

interface DirectoryMapProps {
  providers: FullProviderProfile[];
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  onCameraChanged: (ev: any) => void;
  hoveredProviderId?: string | null;
  onMarkerClick: (providerId: string) => void;
}

const DirectoryMap: React.FC<DirectoryMapProps> = ({
  providers,
  apiKey,
  center,
  zoom,
  onCameraChanged,
  hoveredProviderId,
  onMarkerClick,
}) => {
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  const selectedProvider = useMemo(() => {
    if (!selectedProviderId) return null;
    return providers.find(p => p.id === selectedProviderId);
  }, [selectedProviderId, providers]);

  if (!apiKey) {
    return <div className="flex items-center justify-center h-full bg-gray-200"><p>Google Maps API Key is missing.</p></div>;
  }

  const handleLocalMarkerClick = (providerId: string) => {
    setSelectedProviderId(providerId);
    onMarkerClick(providerId); // Propagate click for list scrolling
  };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId="graston-directory-map"
        style={{ width: '100%', height: '100%' }}
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onCameraChanged={onCameraChanged}
        onClick={() => setSelectedProviderId(null)} // Close info window on map click
      >
        {providers.map((provider) => {
          if (!provider.coordinates) return null;
          const isHovered = hoveredProviderId === provider.id;
          const isPremier = provider.tier === 'Premier';

          return (
            <AdvancedMarker
              key={provider.id}
              position={provider.coordinates}
              onClick={(e) => {
                e.domEvent.stopPropagation(); // prevent map click from firing
                handleLocalMarkerClick(provider.id);
              }}
            >
              <Pin
                background={isPremier ? '#157A83' : '#FC7831'} // Teal for Premier, Orange for others
                borderColor={isPremier ? '#FC7831' : '#157A83'}
                glyphColor={'#FFFFFF'}
                scale={isHovered ? 1.2 : 1}
              />
            </AdvancedMarker>
          );
        })}

        {selectedProvider && selectedProvider.coordinates && (
          <InfoWindow
            position={selectedProvider.coordinates}
            onCloseClick={() => setSelectedProviderId(null)}
            pixelOffset={[0, -40]}
          >
            <MiniProfileCard provider={selectedProvider} />
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default DirectoryMap;