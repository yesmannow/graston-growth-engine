"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProviderCard from "@/components/directory/ProviderCard";
import { Input } from "@/components/ui/input";
import {
  DirectoryFilters,
  FullProviderProfile,
  SortOption,
  Tier,
  TrainingLevel,
  Language,
  Condition,
  PatientDemographic,
  RadiusOption,
  ClinicianType,
} from "@/types";
import { Search, Filter, RefreshCw, List, Map, Star, MapPin } from "lucide-react";
import DirectoryMap from "@/components/directory/DirectoryMap";
import FilterPanel from "@/components/directory/FilterPanel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { showSuccess, showError } from "@/utils/toast";
import { Card, CardContent } from "@/components/ui/card";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { mockProviders, specialties } from "@/lib/mockData";
import Fuse from 'fuse.js';
import { useDebounce } from '@/hooks/useDebounce';
import smallProvidersRaw from '@/lib/smallProviderData.json';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ComparisonBar from "@/components/directory/ComparisonBar";
import { MapSidebarSkeleton } from "@/components/ui/skeleton-loader";

// Type definition for external raw providers JSON
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
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [filters, setFilters] = useState<DirectoryFilters>({ sortBy: "premier-first" });
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMapProvider, setSelectedMapProvider] = useState<FullProviderProfile | null>(null);

  const [localProviders, setLocalProviders] = useState<FullProviderProfile[]>([]);
  
  useEffect(() => {
    // Simulate loading provider data
    const external = (smallProvidersRaw as RawProvider[]).map((p: RawProvider, idx: number) => ({
      ...p,
      id: `ext-${idx}`,
      name: p.provider_name,
      specialty: p.specialties.join(', '),
      profileImage: `https://i.pravatar.cc/150?u=ext-${idx}`,
      location: `${p.city}, ${p.state}`,
      clinicAddress: p.clinic_name,
      coordinates: { lat: p.latitude, lng: p.longitude },
      tier: (p.provider_tier === 'Basic' ? 'Free' : p.provider_tier) as Tier,
      clinicianType: p.clinician_type as ClinicianType,
      languagesSpoken: p.languages_spoken as Language[],
      email: p.email,
      phone: p.phone,
      website: p.website,
      bio: p.bio || '',
      trialStatus: 'N/A',
      activity: 0,
      churnRisk: false,
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 150),
      isFavorite: false,
      engagementScore: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 1000),
      can_compare: p.provider_tier !== 'Basic',
    } as FullProviderProfile));
    const base = [...mockProviders, ...external];
    const list: FullProviderProfile[] = [];
    for (let i = 0; i < 100; i++) {
      const p = base[i % base.length];
      list.push({ 
        ...p, 
        id: `${p.id}-${i}`, 
        can_compare: p.tier !== 'Free',
        engagementScore: p.engagementScore || Math.floor(Math.random() * 100),
        views: p.views || Math.floor(Math.random() * 1000)
      });
    }
    setLocalProviders(list);
    setIsLoading(false);
  }, []);

  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);
  const [searchOnMapMove, setSearchOnMapMove] = useState(true);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [displayCount, setDisplayCount] = useState(10);

  const fuse = useMemo(() =>
    new Fuse(localProviders, { keys: ['name', 'specialty', 'bio', 'location'], threshold: 0.4 }),
  [localProviders]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, searchTerm: debouncedSearch }));
  }, [debouncedSearch]);

  const handleGeocodeAndSearch = async (query: string) => {
    if (!query) return;
    setSearchInput(query);
    try {
      const results = await getGeocode({ address: query });
      const { lat, lng } = await getLatLng(results[0]);
      setMapCenter({ lat, lng });
      setMapZoom(10);
    } catch (error) {
      console.error("Geocoding error:", error);
      showError("Could not find that location. Please try another search.");
    }
  };

  const filteredAndSortedProviders = useMemo(() => {
    let filtered = localProviders;

    if (filters.searchTerm) {
      filtered = fuse.search(filters.searchTerm).map(result => result.item);
    }
    
    // Apply panel filters
    if (filters.clinicianType && filters.clinicianType !== 'All') {
      filtered = filtered.filter(p => p.clinicianType === filters.clinicianType);
    }
    if (filters.specialty && filters.specialty !== 'All') {
      filtered = filtered.filter(p => p.specialty === filters.specialty);
    }
    if (filters.tier && filters.tier !== 'All') {
      filtered = filtered.filter(p => p.tier === filters.tier);
    }
    if (filters.favoritesOnly) {
      filtered = filtered.filter(p => p.isFavorite);
    }

    // CRITICAL: Filter by map bounds if the feature is enabled
    if (viewMode === 'map' && searchOnMapMove && mapBounds) {
      filtered = filtered.filter(p =>
        p.coordinates && mapBounds.contains(p.coordinates)
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      if (filters.sortBy === 'premier-first') {
        const tierOrder: Record<Tier, number> = { Premier: 3, Preferred: 2, Free: 1 };
        return tierOrder[b.tier] - tierOrder[a.tier];
      } else if (filters.sortBy === 'top-rated') {
        return (b.rating || 0) - (a.rating || 0);
      } else if (filters.sortBy === 'most-reviewed') {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
      return 0;
    });

    return filtered;
  }, [localProviders, filters, searchOnMapMove, mapBounds, viewMode, fuse]);

  const displayedProviders = filteredAndSortedProviders.slice(0, displayCount);
  const providersInCompareList = useMemo(() => 
    localProviders.filter(p => compareList.includes(p.id)),
    [localProviders, compareList]
  );

  const handleToggleFavorite = (providerId: string) => {
    setLocalProviders(prev => prev.map(p => p.id === providerId ? { ...p, isFavorite: !p.isFavorite } : p));
    showSuccess("Favorite status updated!");
  };

  const handleToggleCompare = (providerId: string) => {
    setCompareList(prev => prev.includes(providerId) ? prev.filter(id => id !== providerId) : [...prev, providerId]);
  };

  const resetAll = () => {
    setFilters({ sortBy: "premier-first" });
    setSearchInput("");
    setMapCenter({ lat: 39.8283, lng: -98.5795 });
    setMapZoom(4);
    setSelectedMapProvider(null);
  };

  const handleProviderSelectFromList = (provider: FullProviderProfile) => {
    if (provider.coordinates) {
      setMapCenter(provider.coordinates);
      setMapZoom(14);
      setSelectedMapProvider(provider);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="relative mb-6 flex items-center gap-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name, specialty, or location..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGeocodeAndSearch(searchInput)}
        />
        <Button onClick={() => handleGeocodeAndSearch(searchInput)}>Search</Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsFilterPanelOpen(true)} variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
          <Button variant="outline" onClick={resetAll}>
            <RefreshCw className="h-4 w-4 mr-2" /> Reset
          </Button>
        </div>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value: 'list' | 'map') => value && setViewMode(value)}>
          <ToggleGroupItem value="map" aria-label="Map view"><Map className="h-4 w-4 mr-2" /> Map</ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view"><List className="h-4 w-4 mr-2" /> List</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="hidden lg:block">
            <FilterPanel filters={filters} onFilterChange={setFilters} specialties={specialties} />
          </div>
        </div>

        <div className="lg:col-span-3">
          {viewMode === 'map' ? (
            <div className="space-y-4">
              {googleMapsApiKey ? (
                <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
                  <div className="xl:col-span-2">
                    <Card className="h-[600px] w-full">
                      <CardContent className="p-0 h-full w-full rounded-lg overflow-hidden">
                        <DirectoryMap
                          providers={filteredAndSortedProviders}
                          apiKey={googleMapsApiKey}
                          center={mapCenter}
                          zoom={mapZoom}
                          onBoundsChanged={setMapBounds}
                          hoveredProviderId={hoveredProviderId}
                          selectedProvider={selectedMapProvider}
                          onMarkerClick={setSelectedMapProvider}
                        />
                      </CardContent>
                    </Card>
                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox id="search-on-move" checked={searchOnMapMove} onCheckedChange={(checked) => setSearchOnMapMove(Boolean(checked))} />
                      <Label htmlFor="search-on-move" className="font-semibold text-sm">Search as I move the map</Label>
                    </div>
                  </div>
                  
                  <div className="xl:col-span-1">
                    <Card className="h-[600px] overflow-hidden">
                      <CardContent className="p-4 h-full flex flex-col">
                        <h3 className="font-semibold text-lg mb-4">Providers ({filteredAndSortedProviders.length})</h3>
                        <div className="space-y-3 overflow-y-auto flex-grow">
                          {isLoading ? <MapSidebarSkeleton /> :
                           filteredAndSortedProviders.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground h-full flex flex-col justify-center items-center">
                              <MapPin className="w-12 h-12 mb-4" />
                              <p className="font-semibold">No providers found.</p>
                              <p className="text-sm">Try zooming out or clearing filters.</p>
                            </div>
                          ) : (
                            filteredAndSortedProviders.map(provider => (
                              <div
                                key={provider.id}
                                className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                                onMouseEnter={() => setHoveredProviderId(provider.id)}
                                onMouseLeave={() => setHoveredProviderId(null)}
                                onClick={() => handleProviderSelectFromList(provider)}
                              >
                                <div className="flex items-start gap-3">
                                  <img src={provider.profileImage} alt={provider.name} className="w-12 h-12 rounded-full object-cover" />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">{provider.name}</h4>
                                    <p className="text-xs text-muted-foreground truncate">{provider.specialty}</p>
                                    <div className="flex items-center mt-1">
                                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                      <span className="text-xs">{provider.rating?.toFixed(1)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                  <p className="font-bold">Google Maps API Key Missing</p>
                  <p>Please set `VITE_GOOGLE_MAPS_API_KEY` to enable the map.</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {filteredAndSortedProviders.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <p>No providers found matching your criteria.</p>
                  <Button variant="link" onClick={resetAll}>Reset Filters</Button>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    {displayedProviders.map(provider => (
                      <ProviderCard
                        key={provider.id}
                        provider={provider}
                        onMouseEnter={() => setHoveredProviderId(provider.id)}
                        onMouseLeave={() => setHoveredProviderId(null)}
                        onToggleFavorite={handleToggleFavorite}
                        onToggleCompare={handleToggleCompare}
                        isComparing={compareList.includes(provider.id)}
                      />
                    ))}
                  </div>
                  {displayCount < filteredAndSortedProviders.length && (
                    <div className="text-center mt-6">
                      <Button onClick={() => setDisplayCount(prev => prev + 10)}>Load More</Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Sheet open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen}>
        <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
          <div className="p-4">
            <FilterPanel filters={filters} onFilterChange={setFilters} specialties={specialties} />
            <Button className="w-full mt-4" onClick={() => setIsFilterPanelOpen(false)}>Apply Filters</Button>
          </div>
        </SheetContent>
      </Sheet>

      <ComparisonBar providers={providersInCompareList} onClear={() => setCompareList([])} onRemove={handleToggleCompare} />
    </div>
  );
};

export default Directory;