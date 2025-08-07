"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FullProviderProfile } from '@/types';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { Button } from '../ui/button';

const createCustomIcon = (tier: 'Premier' | 'Preferred' | 'Free', isHovered: boolean) => {
  const color = tier === 'Premier' ? '#157A83' : '#435769'; // brand-primary or brand-dark-blue
  const scale = isHovered ? 'scale(1.2)' : 'scale(1)';
  const zIndex = isHovered ? 1000 : 'auto';
  
  return L.divIcon({
    html: `
      <div style="
        transform: ${scale}; 
        transition: transform 0.2s ease-in-out;
        z-index: ${zIndex};
        position: relative;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
          <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          ${tier === 'Premier' ? '<circle cx="12" cy="9" r="2" fill="white" />' : ''}
        </svg>
      </div>
    `,
    className: 'bg-transparent border-none',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

interface MapUpdaterProps {
  center: { lat: number; lng: number };
  zoom: number;
  onBoundsChanged: (bounds: L.LatLngBounds) => void;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center, zoom, onBoundsChanged }) => {
  const map = useMap();

  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  map.off('moveend'); // Clear previous listeners
  map.on('moveend', () => {
    onBoundsChanged(map.getBounds());
  });

  return null;
};

interface LeafletDirectoryMapProps {
  providers: FullProviderProfile[];
  center: { lat: number; lng: number };
  zoom: number;
  onBoundsChanged: (bounds: L.LatLngBounds) => void;
  hoveredProviderId?: string | null;
  onPinClick: (providerId: string) => void;
}

const LeafletDirectoryMap: React.FC<LeafletDirectoryMapProps> = ({
  providers,
  center,
  zoom,
  onBoundsChanged,
  hoveredProviderId,
  onPinClick,
}) => {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater center={center} zoom={zoom} onBoundsChanged={onBoundsChanged} />
      <MarkerClusterGroup>
        {providers.map(provider =>
          provider.coordinates ? (
            <Marker
              key={provider.id}
              position={[provider.coordinates.lat, provider.coordinates.lng]}
              icon={createCustomIcon(provider.tier, hoveredProviderId === provider.id)}
              eventHandlers={{
                click: () => onPinClick(provider.id),
              }}
            >
              <Popup>
                <div className="font-heading font-bold">{provider.name}</div>
                <div className="text-sm text-muted-foreground">{provider.specialty}</div>
                <Button size="sm" className="w-full mt-2" onClick={() => window.open(`/directory/provider/${provider.id}`, '_self')}>
                  View Profile
                </Button>
              </Popup>
            </Marker>
          ) : null
        )}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default LeafletDirectoryMap;