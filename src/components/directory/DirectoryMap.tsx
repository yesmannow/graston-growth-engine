"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, useLoadScript, MarkerClustererF } from '@react-google-maps/api';
import { FullProviderProfile } from '@/types';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

interface DirectoryMapProps {
  providers: FullProviderProfile[];
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  onBoundsChanged: (bounds: google.maps.LatLngBounds | null) => void;
  hoveredProviderId?: string | null;
  selectedProvider: FullProviderProfile | null;
  onMarkerClick: (provider: FullProviderProfile | null) => void;
}

const DirectoryMap: React.FC<DirectoryMapProps> = ({
  providers,
  apiKey,
  center,
  zoom,
  onBoundsChanged,
  hoveredProviderId,
  selectedProvider,
  onMarkerClick,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const navigate = useNavigate();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
    onBoundsChanged(null);
  }, [onBoundsChanged]);

  const onIdle = useCallback(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        onBoundsChanged(bounds);
      }
    }
  }, [onBoundsChanged]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom, isLoaded]);

  const getMarkerIcon = (provider: FullProviderProfile, isHovered: boolean) => {
    let color = '#dc2626'; // red for Free tier
    let scale = 8;
    
    if (provider.tier === 'Premier') {
      color = '#7c3aed'; // purple for Premier
      scale = 12;
    } else if (provider.tier === 'Preferred') {
      color = '#2563eb'; // blue for Preferred
      scale = 10;
    }
    
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.9,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: isHovered ? scale * 1.5 : scale,
    };
  };

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
      options={mapOptions}
    >
      <MarkerClustererF>
        {(clusterer) => (
          <React.Fragment>
            {providers
              .filter(provider => provider.coordinates) // Pre-filter providers without coordinates
              .map((provider) => {
                const isHovered = hoveredProviderId === provider.id || selectedProvider?.id === provider.id;
                
                return (
                  <MarkerF
                    key={provider.id}
                    position={provider.coordinates!} // Use non-null assertion as it's filtered
                    icon={getMarkerIcon(provider, isHovered)}
                    title={provider.name}
                    onClick={() => onMarkerClick(provider)}
                    animation={isHovered ? google.maps.Animation.BOUNCE : undefined}
                    zIndex={isHovered ? 100 : 1}
                    clusterer={clusterer} // Pass the clusterer prop
                  />
                );
              })}
          </React.Fragment>
        )}
      </MarkerClustererF>

      {selectedProvider && selectedProvider.coordinates && (
        <InfoWindowF
          position={selectedProvider.coordinates}
          onCloseClick={() => onMarkerClick(null)}
          options={{ pixelOffset: new google.maps.Size(0, -30) }}
        >
          <div className="p-2 max-w-xs">
            <div className="flex items-start gap-3 mb-3">
              <img
                src={selectedProvider.profileImage}
                alt={selectedProvider.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-base">{selectedProvider.name}</h3>
                <p className="text-xs text-gray-600">{selectedProvider.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">{selectedProvider.rating?.toFixed(1)}</span>
                </div>
              </div>
            </div>
            
            <Button
              size="sm"
              onClick={() => navigate(`/directory/provider/${selectedProvider.id}`)}
              className="w-full"
            >
              View Profile
            </Button>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
};

export default DirectoryMap;