"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from '@react-google-maps/api';
import { FullProviderProfile } from '@/types';
import { Star, MapPin, Phone, Globe, Navigation, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  fullscreenControl: false,
  gestureHandling: 'greedy',
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

interface EnhancedDirectoryMapProps {
  providers: FullProviderProfile[];
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  onBoundsChanged: (bounds: google.maps.LatLngBounds) => void;
  hoveredProviderId?: string | null;
  onProviderHover?: (providerId: string | null) => void;
}

const EnhancedDirectoryMap: React.FC<EnhancedDirectoryMapProps> = ({
  providers,
  apiKey,
  center,
  zoom,
  onBoundsChanged,
  hoveredProviderId,
  onProviderHover,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<FullProviderProfile | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          if (mapRef.current) {
            mapRef.current.setCenter(location);
            mapRef.current.setZoom(12);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom, mapLoaded]);

  const getMarkerIcon = (provider: FullProviderProfile, isHovered: boolean) => {
    let color = '#dc2626';
    let size = 8;
    
    if (provider.tier === 'Premier') {
      color = '#7c3aed';
      size = 12;
    } else if (provider.tier === 'Preferred') {
      color = '#2563eb';
      size = 10;
    }
    
    if (isHovered) {
      size += 4;
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.9,
      strokeColor: '#ffffff',
      strokeWeight: 3,
      scale: size,
      anchor: new google.maps.Point(0, 0),
    };
  };

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center">
          <p className="text-destructive font-medium">Error loading maps</p>
          <p className="text-sm text-muted-foreground mt-1">Please check your internet connection</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-sm text-muted-foreground">Loading interactive map...</div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={getCurrentLocation}
          className="shadow-lg bg-white/90 backdrop-blur-sm"
          title="Find my location"
        >
          <Navigation className="h-4 w-4" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="shadow-lg bg-white/90 backdrop-blur-sm"
          title="Toggle fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onIdle={onIdle}
        options={mapOptions}
      >
        {userLocation && (
          <MarkerF
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#4285f4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 8,
            }}
            title="Your location"
          />
        )}

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
              onMouseOver={() => onProviderHover?.(provider.id)}
              onMouseOut={() => onProviderHover?.(null)}
              animation={isHovered ? google.maps.Animation.BOUNCE : undefined}
            />
          );
        })}

        {selectedProvider && selectedProvider.coordinates && (
          <InfoWindowF
            position={selectedProvider.coordinates}
            onCloseClick={() => setSelectedProvider(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -10),
              maxWidth: 320,
            }}
          >
            <div className="p-4 max-w-sm">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage
                    src={selectedProvider.profileImage}
                    alt={selectedProvider.name}
                  />
                  <AvatarFallback>
                    {selectedProvider.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg leading-tight">{selectedProvider.name}</h3>
                    <Badge variant={selectedProvider.tier === 'Premier' ? 'default' : 'secondary'}>
                      {selectedProvider.tier}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{selectedProvider.specialty}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{selectedProvider.rating?.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({selectedProvider.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{selectedProvider.location}</span>
              </div>
              
              {selectedProvider.bio && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
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
                <div className="flex gap-1">
                  {selectedProvider.phone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedProvider.phone}`)}
                      title="Call now"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  )}
                  {selectedProvider.website && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(selectedProvider.website, '_blank')}
                      title="Visit website"
                    >
                      <Globe className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

export default EnhancedDirectoryMap;