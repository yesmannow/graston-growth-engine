"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from '@react-google-maps/api';
import { FullProviderProfile } from '@/types';
import { Star, MapPin, Phone, Globe } from 'lucide-react';
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
  onBoundsChanged: (bounds: google.maps.LatLngBounds) => void;
  hoveredProviderId?: string | null;
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
  const [selectedProvider, setSelectedProvider] = useState<FullProviderProfile | null>(null);
  const navigate = useNavigate();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
    setMapLoaded(false);
  }, []);

  const onIdle = useCallback(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        onBoundsChanged(bounds);
      }
    }
  }, [onBoundsChanged]);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom, mapLoaded]);

  const getMarkerIcon = (provider: FullProviderProfile, isHovered: boolean) => {
    let color = '#dc2626'; // red for Free tier
    let size = 32;
    
    if (provider.tier === 'Premier') {
      color = '#7c3aed'; // purple for Premier
      size = 40;
    } else if (provider.tier === 'Preferred') {
      color = '#2563eb'; // blue for Preferred
      size = 36;
    }
    
    if (isHovered) {
      size += 8;
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.8,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: size / 4,
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
      {providers.map((provider) => {
        if (!provider.coordinates) return null;
        const isHovered = hoveredProviderId === provider.id;
        
        return (
          <MarkerF
            key={provider.id}
            position={provider.coordinates}
            icon={getMarkerIcon(provider, isHovered)}
            title={provider.name}
            onClick={() => setSelectedProvider(provider)}
            animation={isHovered ? google.maps.Animation.BOUNCE : undefined}
          />
        );
      })}

      {selectedProvider && selectedProvider.coordinates && (
        <InfoWindowF
          position={selectedProvider.coordinates}
          onCloseClick={() => setSelectedProvider(null)}
        >
          <div className="p-3 max-w-sm">
            <div className="flex items-start gap-3 mb-3">
              <img
                src={selectedProvider.profileImage}
                alt={selectedProvider.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{selectedProvider.name}</h3>
                <p className="text-sm text-gray-600">{selectedProvider.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">{selectedProvider.rating?.toFixed(1)}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({selectedProvider.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {selectedProvider.location}
            </div>
            
            {selectedProvider.bio && (
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {selectedProvider.bio}
              </p>
            )}
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => navigate(`/directory/provider/${selectedProvider.id}`)}
                className="flex-1"
              >
                View Profile
              </Button>
              {selectedProvider.phone && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`tel:${selectedProvider.phone}`)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              )}
              {selectedProvider.website && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(selectedProvider.website, '_blank')}
                >
                  <Globe className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
};

export default DirectoryMap;