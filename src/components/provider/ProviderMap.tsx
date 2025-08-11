"use client";

import React from 'react';
import { Map, APIProvider, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Coordinates } from '@/types';

interface ProviderMapProps {
  coordinates: Coordinates;
  name: string; // Keep name in interface if it's part of the contract
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const ProviderMap: React.FC<ProviderMapProps> = ({ coordinates }) => {
  if (!GOOGLE_MAPS_API_KEY) {
    return <div className="flex items-center justify-center h-full bg-gray-200"><p>Google Maps API Key is missing.</p></div>;
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        mapId="provider-profile-map"
        style={{ width: '100%', height: '100%' }}
        defaultCenter={coordinates}
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <AdvancedMarker position={coordinates}>
          <Pin
            background={'#FC7831'} // Orange for single provider map
            borderColor={'#157A83'}
            glyphColor={'#FFFFFF'}
          />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
};

export default ProviderMap;