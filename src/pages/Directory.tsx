"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProviderCard from "@/components/directory/ProviderCard";
import {
  DirectoryFilters,
  FullProviderProfile,
} from "@/types";
import LeafletDirectoryMap from "@/components/directory/LeafletDirectoryMap";
import FilterPanel from "@/components/directory/FilterPanel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { mockProviders, specialties } from "@/lib/mockData";
import { useDebounce } from '@/hooks/useDebounce';
import SearchBar from '@/components/SearchBar';
import smallProvidersRaw from '@/lib/smallProviderData.json';
import ComparisonBar from "@/components/directory/ComparisonBar";
import { Filter, Loader2 } from "lucide-react";
import L from 'leaflet';

type RawProvider = {
  provider_name: string;
  clinic_name: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  specialties: string[];
  languages_spoken: string[];
  clinician_type: string;
  provider_tier: string;
  latitude: number;
  longitude: number;
  bio?: string;
};

const Directory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = !useMediaQuery("(min-width: 1024px)");
  const listRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const [filters, setFilters] = useState<DirectoryFilters>({ sortBy: "premier-first" });
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [localProviders] = useState<FullProviderProfile[]>(() => {
    const external = (smallProvidersRaw as RawProvider[]).map((p: RawProvider, idx: number) => ({
      ...p, id: `ext-${idx}`, name: p.provider_name, specialty: p.specialties.join(', '),
      profileImage: `https://i.pravatar.cc/150?u=ext-${idx}`, location: `${p.city}, ${p.state}`,
      clinicAddress: p.clinic_name, coordinates: { lat: p.latitude, lng: p.longitude },
      tier: (p.provider_tier === 'Basic' ? 'Free' : p.provider_tier) as any,
      clinicianType: p.clinician_type as any, languagesSpoken: p.languages_spoken as any[],
      email: p.email, phone: p.phone, website: p.website, bio: p.bio || '',
      trialStatus: 'N/A', activity: 0, churnRisk: false, rating: 4, reviewCount: 0,
      isFavorite: false, can_compare: p.provider_tier !== 'Basic',
    } as FullProviderProfile));
    const base = [...mockProviders, ...external];
    const list: FullProviderProfile[] = [];
    for (let i = 0; i < 200; i++) {
      const p = base[i % base.length];
      list.push({ ...p, id: `${p.id}-${i}`, can_compare: p.tier !== 'Free' });
    }
    return list;
  });

  const [mapState, setMapState] = useState({
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 4,
    bounds: null as L.LatLngBounds | null,
  });
  
  const [displayCount, setDisplayCount] = useState(15);

  const lastProviderElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setDisplayCount(prev => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters: DirectoryFilters = { sortBy: "premier-first" };
    // ... (filter parsing logic remains the same)
    setFilters(prev => ({ ...prev, ...newFilters }));

    const lat = params.get('lat');
    const lng = params.get('lng');
    const zoom = params.get('zoom');
    if (lat && lng && zoom) {
      setMapState(prev => ({
        ...prev,
        center: { lat: parseFloat(lat), lng: parseFloat(lng) },
        zoom: parseInt(zoom),
      }));
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    // ... (filter serialization logic remains the same)
    if (mapState.center.lat && mapState.zoom) {
      params.set('lat', mapState.center.lat.toString());
      params.set('lng', mapState.center.lng.toString());
      params.set('zoom', mapState.zoom.toString());
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, mapState.center, mapState.zoom, navigate]);

  const handleFilterChange = (newFilters: DirectoryFilters) => {
    setFilters(newFilters);
    setDisplayCount(15); // Reset display count on filter change
  };

  const handleBoundsChanged = (bounds: L.LatLngBounds) => {
    setMapState(prev => ({ ...prev, bounds }));
    setDisplayCount(15); // Reset display count on map move
  };

  const handlePinClick = (providerId: string) => {
    const cardElement = document.getElementById(`provider-card-${providerId}`);
    if (cardElement && listRef.current) {
      listRef.current.scrollTo({
        top: cardElement.offsetTop - listRef.current.offsetTop,
        behavior: 'smooth',
      });
      setHoveredProviderId(providerId);
      setTimeout(() => setHoveredProviderId(null), 2000); // Highlight for 2s
    }
  };

  const filteredAndSortedProviders = useMemo(() => {
    let filtered = localProviders;

    if (mapState.bounds) {
      filtered = filtered.filter(p =>
        p.coordinates && mapState.bounds!.contains(p.coordinates)
      );
    }
    
    // ... (all other filtering logic remains the same)

    filtered.sort((a, b) => {
      if (filters.sortBy === 'premier-first') {
        const tierOrder = { Premier: 3, Preferred: 2, Free: 1 };
        return tierOrder[b.tier as keyof typeof tierOrder] - tierOrder[a.tier as keyof typeof tierOrder];
      }
      // ... (other sorting logic)
      return 0;
    });

    return filtered;
  }, [localProviders, filters, mapState.bounds]);

  const displayedProviders = filteredAndSortedProviders.slice(0, displayCount);
  const providersInCompareList = useMemo(() => 
    localProviders.filter(p => compareList.includes(p.id)),
    [localProviders, compareList]
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-gray-50">
      {/* Left Panel: Filters & List */}
      <div className="w-full lg:w-2/5 xl:w-1/3 p-4 flex flex-col">
        <div className="mb-4">
          <SearchBar onSearch={(query) => setFilters(prev => ({ ...prev, searchTerm: query }))} />
          <Button onClick={() => setIsFilterPanelOpen(true)} className="w-full mt-2 lg:hidden flex items-center justify-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
        
        <div className="hidden lg:block mb-4">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} specialties={specialties} />
        </div>

        <div ref={listRef} className="flex-grow overflow-y-auto space-y-4 pr-2">
          {filteredAndSortedProviders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No providers found in this map area.</p>
              <p className="text-xs">Try zooming out or moving the map.</p>
            </div>
          )}
          {displayedProviders.map((provider, index) => (
            <div 
              id={`provider-card-${provider.id}`}
              key={provider.id} 
              ref={index === displayedProviders.length - 1 ? lastProviderElementRef : null}
            >
              <ProviderCard
                provider={provider}
                onMouseEnter={() => setHoveredProviderId(provider.id)}
                onMouseLeave={() => setHoveredProviderId(null)}
                isHovered={hoveredProviderId === provider.id}
              />
            </div>
          ))}
          {displayCount < filteredAndSortedProviders.length && (
            <div className="flex justify-center items-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Map */}
      <div className="w-full lg:w-3/5 xl:w-2/3 h-full lg:h-auto">
        <LeafletDirectoryMap
          providers={filteredAndSortedProviders}
          center={mapState.center}
          zoom={mapState.zoom}
          onBoundsChanged={handleBoundsChanged}
          hoveredProviderId={hoveredProviderId}
          onPinClick={handlePinClick}
        />
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen}>
        <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} specialties={specialties} />
        </SheetContent>
      </Sheet>

      <ComparisonBar 
        providers={providersInCompareList}
        onClear={() => setCompareList([])}
        onRemove={(id) => setCompareList(prev => prev.filter(pId => pId !== id))}
      />
    </div>
  );
};

export default Directory;