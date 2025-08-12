"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProviderCard from "@/components/directory/ProviderCard";
import { FullProviderProfile, Condition, Language } from "@/types";
import DirectoryMap from "@/components/directory/DirectoryMap";
import FilterPanel from "@/components/directory/FilterPanel";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useDebounce } from '@/hooks/useDebounce';
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "@/hooks/useFilterStore";
import { motion, AnimatePresence } from "framer-motion";
import { useProviders } from "@/hooks/useProviders";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const Directory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  // Global filter state from Zustand
  const { searchTerm, clinicianType, condition, language, tiers, acceptingNewPatients, setSearchTerm, setClinicianType, setCondition, setLanguage, setTiers } = useFilterStore();

  // Local UI state
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  
  // Map state
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  
  // Debounce inputs for API efficiency
  const debouncedBounds = useDebounce(mapBounds, 500);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedClinicianType = useDebounce(clinicianType, 500);
  const debouncedCondition = useDebounce(condition, 500);
  const debouncedLanguage = useDebounce(language, 500);
  const debouncedTiers = useDebounce(tiers, 500);
  const debouncedAcceptingNewPatients = useDebounce(acceptingNewPatients, 500);

  const providerCardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  // Read filters from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
    setClinicianType(params.get('clinicianType') || null);
    setCondition(params.get('condition') as Condition || null);
    setLanguage(params.get('language') as Language || null);
    setTiers(params.get('tiers')?.split(',') || ['Premier', 'Preferred', 'Free']);
  }, []); // Removed dependencies to run only once on mount

  // Write filters to URL when they change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (clinicianType) params.set('clinicianType', clinicianType);
    if (condition) params.set('condition', condition);
    if (language) params.set('language', language);
    if (tiers.length < 3) params.set('tiers', tiers.join(','));
    
    // Using `location.pathname` to avoid re-triggering on search change
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [searchTerm, clinicianType, condition, language, tiers, navigate, location.pathname]);

  // Fetch data from Supabase using our custom hook
  const { data: allProviders, isLoading } = useProviders({
    searchTerm: debouncedSearchTerm,
    clinicianType: debouncedClinicianType,
    condition: debouncedCondition,
    language: debouncedLanguage,
    tiers: debouncedTiers,
    acceptingNewPatients: debouncedAcceptingNewPatients,
  });

  // Filter providers based on the current map view (client-side)
  const providers = useMemo(() => {
    if (!allProviders) return [];
    if (debouncedBounds) {
      return allProviders.filter(p =>
        p.coordinates && debouncedBounds.contains(new google.maps.LatLng(p.coordinates.lat, p.coordinates.lng))
      );
    }
    return allProviders;
  }, [allProviders, debouncedBounds]);

  const handleMapCameraChanged = useCallback((ev: any) => {
    const newBounds = ev.map.getBounds();
    if (newBounds) {
      setMapBounds(newBounds);
    }
  }, []);

  const handleMarkerClick = useCallback((providerId: string) => {
    const cardElement = providerCardRefs.current.get(providerId);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const ResultsList = () => (
    <div className="flex flex-col h-full bg-brand-background">
      <FilterPanel />
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-lg" />)
        ) : (
          <>
            <p className="text-sm text-brand-text/80 px-2">
              Showing {providers.length} providers in this map area.
            </p>
            <AnimatePresence mode="wait">
              {providers.map(provider => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  ref={el => providerCardRefs.current.set(provider.id, el)}
                >
                  <ProviderCard
                    provider={provider}
                    onMouseEnter={() => setHoveredProviderId(provider.id)}
                    onMouseLeave={() => setHoveredProviderId(null)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {!isLoading && providers.length === 0 && (
              <div className="text-center text-brand-text/70 p-4">
                No providers found matching your criteria in this area. Try adjusting your filters or moving the map.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const mainContent = (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
      <div className="lg:col-span-5 xl:col-span-4 h-full">
        <ResultsList />
      </div>
      <div className="lg:col-span-7 xl:col-span-8 h-full">
        <DirectoryMap
          providers={providers}
          apiKey={GOOGLE_MAPS_API_KEY}
          center={mapCenter}
          zoom={mapZoom}
          onCameraChanged={handleMapCameraChanged}
          hoveredProviderId={hoveredProviderId}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-80px)]"> {/* Adjust height based on header */}
      {isMobile ? (
        <div className="flex flex-col h-full">
          <div className="h-1/2">
            <DirectoryMap
              providers={providers}
              apiKey={GOOGLE_MAPS_API_KEY}
              center={mapCenter}
              zoom={mapZoom}
              onCameraChanged={handleMapCameraChanged}
              hoveredProviderId={hoveredProviderId}
              onMarkerClick={handleMarkerClick}
            />
          </div>
          <div className="h-1/2">
            <ResultsList />
          </div>
        </div>
      ) : mainContent}
    </div>
  );
};

export default Directory;