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
import { Search, Filter, RefreshCw, List, Map } from "lucide-react";
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
import SearchBar from '@/components/SearchBar';
import smallProvidersRaw from '@/lib/smallProviderData.json';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ComparisonBar from "@/components/directory/ComparisonBar";

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
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list'); // New state for view mode
  const [compareList, setCompareList] = useState<string[]>([]);

  // Generate a list of ~100 providers by repeating base and external data
  const [localProviders, setLocalProviders] = useState<FullProviderProfile[]>(() => {
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
      rating: 4,
      reviewCount: 0,
      isFavorite: false,
      can_compare: p.provider_tier !== 'Basic',
    } as FullProviderProfile));
    const base = [...mockProviders, ...external];
    const list: FullProviderProfile[] = [];
    for (let i = 0; i < 100; i++) {
      const p = base[i % base.length];
      list.push({ ...p, id: `${p.id}-${i}`, can_compare: p.tier !== 'Free' });
    }
    return list;
  });
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [searchInput, setSearchInput] = useState(''); // controlled input for search
  const debouncedInput = useDebounce(searchInput, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchOnMapMove, setSearchOnMapMove] = useState(false);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  // pagination for manual load more
  const [displayCount, setDisplayCount] = useState(10);

  // build fuse index
  const fuse = useMemo(() =>
    new Fuse(localProviders, { keys: ['name', 'specialty', 'bio'], threshold: 0.4 }),
  [localProviders]);

  // update suggestions when user types
  useEffect(() => {
    if (debouncedInput) {
      const results = fuse.search(debouncedInput).slice(0, 5).map(r => r.item.name);
      setSuggestions(results);
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInput, fuse]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters: DirectoryFilters = { sortBy: "premier-first" };
    const urlSearchTerm = params.get('searchTerm');

    if (urlSearchTerm) {
      newFilters.searchTerm = urlSearchTerm;
      setSearchInput(urlSearchTerm);
    }
    if (params.get('city')) newFilters.city = params.get('city') || '';
    if (params.get('state')) newFilters.state = params.get('state') || '';
    if (params.get('zipCode')) newFilters.zipCode = params.get('zipCode') || '';
    if (params.get('radius')) newFilters.radius = parseInt(params.get('radius') || '0') as RadiusOption;
    if (params.get('clinicianType')) newFilters.clinicianType = (params.get('clinicianType') as ClinicianType) || 'All';
    if (params.get('specialty')) newFilters.specialty = params.get('specialty') || 'All';
    if (params.get('tier')) newFilters.tier = (params.get('tier') as Tier) || 'All';
    if (params.get('trainingLevel')) newFilters.trainingLevel = (params.get('trainingLevel') as TrainingLevel) || 'All';
    if (params.get('languages')) newFilters.languages = params.get('languages')?.split(',') as Language[];
    if (params.get('patientTypes')) newFilters.patientTypes = params.get('patientTypes')?.split(',') as PatientDemographic[];
    if (params.get('conditionsTreated')) newFilters.conditionsTreated = params.get('conditionsTreated')?.split(',') as Condition[];
    if (params.get('sortBy')) newFilters.sortBy = (params.get('sortBy') as SortOption) || 'premier-first';
    if (params.get('favoritesOnly') === 'true') newFilters.favoritesOnly = true;

    setFilters(prev => ({ ...prev, ...newFilters }));
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set('searchTerm', filters.searchTerm);
    if (filters.city) params.set('city', filters.city);
    if (filters.state) params.set('state', filters.state);
    if (filters.zipCode) params.set('zipCode', filters.zipCode);
    if (filters.radius) params.set('radius', filters.radius.toString());
    if (filters.clinicianType && filters.clinicianType !== 'All') params.set('clinicianType', filters.clinicianType);
    if (filters.specialty && filters.specialty !== 'All') params.set('specialty', filters.specialty);
    if (filters.tier && filters.tier !== 'All') params.set('tier', filters.tier);
    if (filters.trainingLevel && filters.trainingLevel !== 'All') params.set('trainingLevel', filters.trainingLevel);
    if (filters.languages && filters.languages.length > 0) params.set('languages', filters.languages.join(','));
    if (filters.patientTypes && filters.patientTypes.length > 0) params.set('patientTypes', filters.patientTypes.join(','));
    if (filters.conditionsTreated && filters.conditionsTreated.length > 0) params.set('conditionsTreated', filters.conditionsTreated.join(','));
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    if (filters.favoritesOnly) params.set('favoritesOnly', 'true');

    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

  const handleFilterChange = (newFilters: DirectoryFilters) => {
    setFilters(newFilters);
  };

  const handleToggleFavorite = (providerId: string) => {
    setLocalProviders(prevProviders =>
      prevProviders.map(p =>
        p.id === providerId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
    showSuccess("Favorite status updated! (This is a demo and won't be saved)");
  };

  const handleToggleCompare = (providerId: string) => {
    setCompareList(prev =>
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  // Geocode based on the applied search input
  const handleGeocode = async (query: string) => {
    if (!query) return;
    try {
      const results = await getGeocode({ address: query });
      const { lat, lng } = await getLatLng(results[0]);
      setMapCenter({ lat, lng });
      setMapZoom(10);
    } catch (error) {
      console.error("Error geocoding search term:", error);
      showError("Could not find location. Please try a different search term.");
    }
  };

  const applySearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchTerm: query }));
    setSearchInput(query);
    handleGeocode(query);
  };

  const filteredAndSortedProviders = useMemo(() => {
    let filtered = localProviders;

    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTermLower) ||
          p.specialty?.toLowerCase().includes(searchTermLower) ||
          p.location?.toLowerCase().includes(searchTermLower) ||
          p.bio?.toLowerCase().includes(searchTermLower) ||
          p.services?.some(service => service.toLowerCase().includes(searchTermLower))
      );
    }
    if (filters.city) {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.state && filters.state !== 'All') {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(filters.state!.toLowerCase()));
    }
    if (filters.zipCode) {
      filtered = filtered.filter(p => p.clinicAddress?.includes(filters.zipCode!));
    }
    if (filters.clinicianType && filters.clinicianType !== 'All') {
      filtered = filtered.filter(p => p.clinicianType === filters.clinicianType);
    }
    if (filters.specialty && filters.specialty !== 'All') {
      filtered = filtered.filter(p => p.specialty === filters.specialty);
    }
    if (filters.tier && filters.tier !== 'All') {
      filtered = filtered.filter(p => p.tier === filters.tier);
    }
    if (filters.trainingLevel && filters.trainingLevel !== 'All') {
      filtered = filtered.filter(p => p.gtCertifications?.includes(filters.trainingLevel as TrainingLevel));
    }
    if (filters.languages && filters.languages.length > 0) {
      filtered = filtered.filter(p =>
        p.languagesSpoken?.some(lang => filters.languages?.includes(lang))
      );
    }
    if (filters.conditionsTreated && filters.conditionsTreated.length > 0) {
      filtered = filtered.filter(p =>
        p.conditionsTreated?.some(cond => filters.conditionsTreated?.includes(cond))
      );
    }
    if (filters.patientTypes && filters.patientTypes.length > 0) {
      filtered = filtered.filter(p =>
        p.patientTypes?.some(type => filters.patientTypes?.includes(type))
      );
    }
    if (filters.favoritesOnly) {
      filtered = filtered.filter(p => p.isFavorite);
    }

    if (searchOnMapMove && mapBounds) {
      filtered = filtered.filter(p =>
        p.coordinates && mapBounds.contains(p.coordinates)
      );
    }

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
  }, [localProviders, filters, searchOnMapMove, mapBounds]);

  // slice for manual pagination
  const displayedProviders = filteredAndSortedProviders.slice(0, displayCount);
  const providersInCompareList = useMemo(() => 
    localProviders.filter(p => compareList.includes(p.id)),
    [localProviders, compareList]
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="relative mb-6 flex items-center gap-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name, specialty, or location..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (activeIndex >= 0) applySearch(suggestions[activeIndex]);
            else applySearch(searchInput);
          } else if (e.key === 'ArrowDown') {
            setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
          } else if (e.key === 'ArrowUp') {
            setActiveIndex(prev => Math.max(prev - 1, 0));
          }
        }}
        />
        <Button onClick={() => applySearch(searchInput)}>Search</Button>
        {/* autocomplete suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border mt-2 w-full max-w-md z-10 shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((name, idx) => (
              <li
                key={name}
                className={`px-3 py-1 cursor-pointer ${idx === activeIndex ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => applySearch(name)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                {(() => {
                  const query = debouncedInput;
                  if (!query) return name;
                  const parts = name.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'));
                  return parts.map((part, i) => (
                    part.toLowerCase() === query.toLowerCase()
                      ? <span key={i} className="font-semibold">{part}</span>
                      : <span key={i}>{part}</span>
                  ));
                })()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Toggle for List/Map View */}
      <div className="flex justify-end mb-4">
        <ToggleGroup type="single" value={viewMode} onValueChange={(value: 'list' | 'map') => setViewMode(value)} aria-label="View mode toggle">
          <ToggleGroupItem value="list" aria-label="Toggle list view">
            <List className="h-4 w-4 mr-2" /> List View
          </ToggleGroupItem>
          <ToggleGroupItem value="map" aria-label="Toggle map view">
            <Map className="h-4 w-4 mr-2" /> Map View
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Filter Panel (always visible) */}
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => setIsFilterPanelOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Sheet open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen}>
              <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
                <div className="p-4">
                  <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    specialties={specialties}
                  />
                  <Button className="w-full mt-4" onClick={() => setIsFilterPanelOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline" onClick={() => setFilters({ sortBy: "premier-first" })}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Main content area (conditionally rendered) */}
        {viewMode === 'list' ? (
          <div className="lg:col-span-2">
            {filteredAndSortedProviders.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No providers found matching your criteria.</p>
                <Button variant="link" onClick={() => setFilters({ sortBy: "premier-first" })}>
                  Reset Filters
                </Button>
              </div>
            )}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {displayedProviders.length > 0 &&
                displayedProviders.map(provider => (
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
                <Button onClick={() => setDisplayCount(prev => prev + 10)}>
                  Load More
                </Button>
              </div>
            )}
          </div>
        ) : ( // viewMode === 'map'
          <div className="lg:col-span-2">
            {googleMapsApiKey && (
              <Card className="h-[600px] w-full"> {/* Increased height for better map view */}
                <CardContent className="p-0 h-full w-full rounded-lg overflow-hidden">
                  <DirectoryMap
                    providers={filteredAndSortedProviders}
                    apiKey={googleMapsApiKey}
                    center={mapCenter}
                    zoom={mapZoom}
                    onBoundsChanged={setMapBounds}
                    hoveredProviderId={hoveredProviderId} // Pass hovered ID to map
                  />
                </CardContent>
              </Card>
            )}
            {!googleMapsApiKey && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                <p className="font-bold">Google Maps API Key Missing</p>
                <p>To enable the interactive map, please set the `VITE_GOOGLE_MAPS_API_KEY` environment variable.</p>
              </div>
            )}
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="search-on-move"
                checked={searchOnMapMove}
                onCheckedChange={(checked) => setSearchOnMapMove(Boolean(checked))}
              />
              <Label htmlFor="search-on-move" className="font-semibold text-sm">
                Search as I move the map
              </Label>
            </div>
          </div>
        )}
      </div>
      <ComparisonBar 
        providers={providersInCompareList}
        onClear={() => setCompareList([])}
        onRemove={handleToggleCompare}
      />
    </div>
  );
};

export default Directory;