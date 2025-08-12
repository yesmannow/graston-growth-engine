"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EnhancedProviderCard from "@/components/enhanced-directory/EnhancedProviderCard";
import EnhancedDirectoryMap from "@/components/enhanced-directory/EnhancedDirectoryMap";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card";
import FilterPanel from "@/components/directory/FilterPanel";
import ComparisonBar from "@/components/directory/ComparisonBar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import {
  DirectoryFilters,
  FullProviderProfile,
  Tier,
} from "@/types";
import { 
  Search, 
  Filter, 
  RefreshCw, 
  List, 
  Map, 
  Star, 
  MapPin,
  Users,
  Grid3X3,
  LayoutList
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { showSuccess } from "@/utils/toast";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { mockProviders, specialties } from "@/lib/mockData";
import Fuse from 'fuse.js';
import { useDebounce } from '@/hooks/useDebounce';
import smallProvidersRaw from '@/lib/smallProviderData.json';

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

const EnhancedDirectory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // State management
  const [filters, setFilters] = useState<DirectoryFilters>({ sortBy: "premier-first" });
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [listViewMode, setListViewMode] = useState<'grid' | 'list'>('grid');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebounce(searchInput, 300);

  // Generate enhanced provider data
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
      clinicianType: p.clinician_type as any,
      languagesSpoken: p.languages_spoken as any[],
      email: p.email,
      phone: p.phone,
      website: p.website,
      bio: p.bio || '',
      trialStatus: 'N/A',
      activity: 0,
      churnRisk: false,
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 200) + 10,
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
    return list;
  });

  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [searchOnMapMove, setSearchOnMapMove] = useState(true);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [displayCount, setDisplayCount] = useState(12);

  // Search functionality
  const fuse = useMemo(() =>
    new Fuse(localProviders, { 
      keys: ['name', 'specialty', 'bio', 'location'], 
      threshold: 0.4,
      includeScore: true 
    }),
  [localProviders]);

  // Enhanced search with suggestions
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setFilters(prev => ({ ...prev, searchTerm: query }));
    
    // Geocode if it looks like a location
    if (query.includes(',') || /\d{5}/.test(query)) {
      try {
        const results = await getGeocode({ address: query });
        const { lat, lng } = await getLatLng(results[0]);
        setMapCenter({ lat, lng });
        setMapZoom(10);
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    }
    
    setIsLoading(false);
  };

  // Update search when debounced input changes
  useEffect(() => {
    if (debouncedSearchInput !== filters.searchTerm) {
      handleSearch(debouncedSearchInput);
    }
  }, [debouncedSearchInput]);

  // Filter and sort providers
  const filteredAndSortedProviders = useMemo(() => {
    let filtered = localProviders;

    // Apply all filters
    if (filters.searchTerm) {
      const searchResults = fuse.search(filters.searchTerm);
      filtered = searchResults.map(result => result.item);
    }

    if (filters.city) {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.state && filters.state !== 'All') {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(filters.state!.toLowerCase()));
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
    if (filters.favoritesOnly) {
      filtered = filtered.filter(p => p.isFavorite);
    }

    // Filter by map bounds when enabled
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

  // Displayed providers for current view
  const displayedProviders = filteredAndSortedProviders.slice(0, displayCount);
  const providersInCompareList = useMemo(() => 
    localProviders.filter(p => compareList.includes(p.id)),
    [localProviders, compareList]
  );

  // Event handlers
  const handleToggleFavorite = (providerId: string) => {
    setLocalProviders(prevProviders =>
      prevProviders.map(p =>
        p.id === providerId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
    showSuccess("Added to favorites!");
  };

  const handleToggleCompare = (providerId: string) => {
    setCompareList(prev => {
      const newList = prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId];
      
      if (newList.length > prev.length) {
        showSuccess("Provider added to comparison");
      }
      
      return newList;
    });
  };

  const resetFilters = () => {
    setFilters({ sortBy: "premier-first" });
    setDisplayCount(12);
    setSearchInput('');
  };

  // Stats for the header
  const stats = useMemo(() => ({
    total: filteredAndSortedProviders.length,
    premier: filteredAndSortedProviders.filter(p => p.tier === 'Premier').length,
    avgRating: filteredAndSortedProviders.reduce((acc, p) => acc + (p.rating || 0), 0) / filteredAndSortedProviders.length,
  }), [filteredAndSortedProviders]);

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Provider Directory</h1>
            <p className="text-muted-foreground mt-1">
              Discover and connect with healthcare professionals in your area
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Providers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.premier}</div>
              <div className="text-xs text-muted-foreground">Premier</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 flex items-center gap-1">
                <Star className="h-5 w-5" />
                {stats.avgRating.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Enhanced Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search providers, specialties, or locations..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <EnhancedButton
            onClick={() => setIsFilterPanelOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {Object.keys(filters).length > 1 && (
              <Badge variant="secondary" className="ml-1">
                {Object.keys(filters).length - 1}
              </Badge>
            )}
          </EnhancedButton>
          
          <EnhancedButton variant="outline" onClick={resetFilters} title="Reset all filters">
            <RefreshCw className="h-4 w-4" />
          </EnhancedButton>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value: 'list' | 'map') => value && setViewMode(value)}
          >
            <ToggleGroupItem value="map" aria-label="Map view" title="Map view">
              <Map className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" title="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* List view mode toggle */}
          {viewMode === 'list' && (
            <ToggleGroup 
              type="single" 
              value={listViewMode} 
              onValueChange={(value: 'grid' | 'list') => value && setListViewMode(value)}
            >
              <ToggleGroupItem value="grid" aria-label="Grid layout" title="Grid layout">
                <Grid3X3 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List layout" title="List layout">
                <LayoutList className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        {/* Filter Panel */}
        <div className="lg:col-span-1">
          <div className="hidden lg:block">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              specialties={specialties}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {viewMode === 'map' ? (
            <div className="space-y-4">
              {googleMapsApiKey ? (
                <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
                  {/* Map */}
                  <div className="xl:col-span-2">
                    <EnhancedCard className="h-[600px] w-full overflow-hidden">
                      <EnhancedDirectoryMap
                        providers={filteredAndSortedProviders}
                        apiKey={googleMapsApiKey}
                        center={mapCenter}
                        zoom={mapZoom}
                        onBoundsChanged={setMapBounds}
                        hoveredProviderId={hoveredProviderId}
                        onProviderHover={setHoveredProviderId}
                      />
                    </EnhancedCard>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        id="search-on-move"
                        checked={searchOnMapMove}
                        onCheckedChange={(checked) => setSearchOnMapMove(Boolean(checked))}
                      />
                      <Label htmlFor="search-on-move" className="text-sm font-medium">
                        Filter results as I move the map
                      </Label>
                    </div>
                  </div>
                  
                  {/* Provider List Sidebar */}
                  <div className="xl:col-span-1">
                    <EnhancedCard className="h-[600px] overflow-hidden">
                      <EnhancedCardContent className="p-4 h-full">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-lg">
                            Providers ({filteredAndSortedProviders.length})
                          </h3>
                        </div>
                        <div className="space-y-3 overflow-y-auto h-full">
                          {filteredAndSortedProviders.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                              <MapPin className="h-12 w-12 mx-auto mb-4" />
                              <p>No providers found in this area.</p>
                              <EnhancedButton 
                                variant="link" 
                                onClick={resetFilters}
                                className="mt-2"
                              >
                                Reset Filters
                              </EnhancedButton>
                            </div>
                          ) : (
                            filteredAndSortedProviders.map((provider, index) => (
                              <div
                                key={provider.id}
                                className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:shadow-sm"
                                onMouseEnter={() => setHoveredProviderId(provider.id)}
                                onMouseLeave={() => setHoveredProviderId(null)}
                                onClick={() => navigate(`/directory/provider/${provider.id}`)}
                              >
                                <div className="flex items-start gap-3">
                                  <img
                                    src={provider.profileImage}
                                    alt={provider.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm hover:scale-105 transition-transform"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate hover:text-primary transition-colors">
                                      {provider.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {provider.specialty}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {provider.location}
                                    </p>
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
                      </EnhancedCardContent>
                    </EnhancedCard>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
                  <p className="font-bold">Google Maps API Key Missing</p>
                  <p>To enable the interactive map, please set the `VITE_GOOGLE_MAPS_API_KEY` environment variable.</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {filteredAndSortedProviders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No providers found</h3>
                  <p className="mb-6 max-w-md mx-auto">
                    We couldn't find any providers matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <EnhancedButton onClick={resetFilters}>
                    Reset Filters
                  </EnhancedButton>
                </div>
              ) : (
                <>
                  <div className={`grid gap-6 ${listViewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {displayedProviders.map((provider, index) => (
                      <div key={provider.id}>
                        <EnhancedProviderCard
                          provider={provider}
                          onMouseEnter={() => setHoveredProviderId(provider.id)}
                          onMouseLeave={() => setHoveredProviderId(null)}
                          onToggleFavorite={handleToggleFavorite}
                          onToggleCompare={handleToggleCompare}
                          isComparing={compareList.includes(provider.id)}
                          viewMode={listViewMode}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Load more */}
                  {displayCount < filteredAndSortedProviders.length && (
                    <div className="text-center mt-8">
                      <EnhancedButton onClick={() => setDisplayCount(prev => prev + 12)}>
                        Load More Providers
                      </EnhancedButton>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen}>
        <SheetContent side="left" className="w-full sm:max-w-sm overflow-y-auto">
          <div className="p-4">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              specialties={specialties}
            />
            <EnhancedButton 
              className="w-full mt-4" 
              onClick={() => setIsFilterPanelOpen(false)}
            >
              Apply Filters
            </EnhancedButton>
          </div>
        </SheetContent>
      </Sheet>

      {/* Comparison Bar */}
      {compareList.length > 0 && (
        <div className="animate-in slide-in-from-bottom-4 duration-300">
          <ComparisonBar 
            providers={providersInCompareList}
            onClear={() => setCompareList([])}
            onRemove={handleToggleCompare}
          />
        </div>
      )}
    </div>
  );
};

export default EnhancedDirectory;