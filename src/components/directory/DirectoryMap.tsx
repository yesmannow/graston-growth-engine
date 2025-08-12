"use client";

import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { FullProviderProfile } from '@/types';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

interface DirectoryMapProps {
  providers: FullProviderProfile[];
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  onBoundsChanged: (bounds: google.maps.LatLngBounds) => void;
  hoveredProviderId?: string | null; // New prop
}

const DirectoryMap: React.FC<DirectoryMapProps> = ({
  providers,
  apiKey,
  center,
  zoom,
  onBoundsChanged,
  hoveredProviderId,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = null;
    setMapLoaded(false);
  }, []);

  const onIdle = () => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        onBoundsChanged(bounds);
      }
    }
  };

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom, mapLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onIdle={onIdle}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {providers.map((provider) => {
        if (!provider.coordinates) return null;
        const isHovered = hoveredProviderId === provider.id;
        return (
          <MarkerF
            key={provider.id}
            position={provider.coordinates}
            options={{
              icon: {
                url: isHovered ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(32, 32),
              },
            }}
            title={provider.name}
          />
        );
      })}
    </GoogleMap>
  );
};

export default DirectoryMap;