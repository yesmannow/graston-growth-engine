import { useState, useEffect, useRef } from "react";
import { mockProviders } from "@/lib/mockData";
import ProviderCard from "@/components/directory/ProviderCard";
import { Input } from "@/components/ui/input";
import { DirectoryFilters, FullProviderProfile, SortOption } from "@/types";
import { Search, Filter, X, RefreshCw } from "lucide-react";
import DirectoryMap from "@/components/directory/DirectoryMap";
import { ScrollArea } from "@/components/ui/scroll-area";
import FilterPanel from "@/components/directory/FilterPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { showSuccess } from "@/utils/toast";

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [filters, setFilters] = useState<DirectoryFilters>({
    sortBy: 'premier-first'
  });
  const [filteredProviders, setFilteredProviders] = useState<FullProviderProfile[]>([]);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [filterByMapArea, setFilterByMapArea] = useState(true);
  const [mapKey, setMapKey] = useState(0);
  const [listKey, setListKey] = useState(0);

  const isMobile = useMediaQuery("(max-width: 1024px)");

  // Extract unique specialties for the filter dropdown
  const specialties = [...new Set(mockProviders.flatMap(p => p.specialty ? [p.specialty] : []))];

  // Apply filters and search whenever dependencies change
  useEffect(() => {
    const filtered = mockProviders.filter((provider: FullProviderProfile) => {
      // Text search
      const lowerCaseSearch = searchTerm.toLowerCase();
      const matchesSearch = 
        provider.name.toLowerCase().includes(lowerCaseSearch) ||
        (provider.specialty?.toLowerCase().includes(lowerCaseSearch) || false) ||
        (provider.location?.toLowerCase().includes(lowerCaseSearch) || false) ||
        (provider.clinicianType?.toLowerCase().includes(lowerCaseSearch) || false);
      
      if (!matchesSearch) return false;
      
      // Location filters
      if (filters.city && (!provider.city || !provider.city.toLowerCase().includes(filters.city.toLowerCase()))) {
        return false;
      }
      
      if (filters.state && (!provider.state || provider.state !== filters.state)) {
        return false;
      }
      
      if (filters.zipCode && (!provider.zipCode || !provider.zipCode.includes(filters.zipCode))) {
        return false;
      }
      
      // Provider type filters
      if (filters.tier && filters.tier !== 'All' && provider.tier !== filters.tier) {
        return false;
      }
      
      if (filters.clinicianType && filters.clinicianType !== 'All' && 
          provider.clinicianType !== filters.clinicianType) {
        return false;
      }
      
      if (filters.specialty && filters.specialty !== 'All' && 
          provider.specialty !== filters.specialty) {
        return false;
      }
      
      if (filters.trainingLevel && filters.trainingLevel !== 'All' && 
          provider.trainingLevel !== filters.trainingLevel) {
        return false;
      }
      
      // Languages filter
      if (filters.languages && filters.languages.length > 0) {
        if (!provider.languagesSpoken) return false;
        
        const hasMatchingLanguage = filters.languages.some(language => 
          provider.languagesSpoken?.includes(language)
        );
        
        if (!hasMatchingLanguage) return false;
      }
      
      return true;
    });

    // Sort the filtered results
    const sorted = sortProviders(filtered, filters.sortBy || 'premier-first');
    setFilteredProviders(sorted);
  }, [searchTerm, filters]);

  // Filter providers based on current map bounds if available
  const providersInBounds = mapBounds ? 
    filteredProviders.filter(provider => {
      if (!provider.coordinates) return false;
      const position = new google.maps.LatLng(provider.coordinates.lat, provider.coordinates.lng);
      return mapBounds.contains(position);
    }) : filteredProviders;

  const providersToList = filterByMapArea ? providersInBounds : filteredProviders;

  // Show toast when map-filtered list changes
  useEffect(() => {
    if (filterByMapArea && mapBounds) {
      showSuccess(`Showing ${providersInBounds.length} providers in this map area.`);
    }
  }, [providersInBounds, filterByMapArea, mapBounds]);

  // Reset scroll position of the list when its content changes
  useEffect(() => {
    setListKey(key => key + 1);
  }, [providersToList]);

  // Sort providers based on selected sort option
  const sortProviders = (providers: FullProviderProfile[], sortBy: SortOption): FullProviderProfile[] => {
    const sortedProviders = [...providers];
    
    switch (sortBy) {
      case 'premier-first':
        return sortedProviders.sort((a, b) => {
          const tierOrder = { Premier: 0, Preferred: 1, Free: 2 };
          return tierOrder[a.tier] - tierOrder[b.tier];
        });
      case 'top-rated':
        return sortedProviders.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'most-reviewed':
        return sortedProviders.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      default:
        return sortedProviders;
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilters({ sortBy: 'premier-first' });
    setMapBounds(null);
    setMapKey(prevKey => prevKey + 1); // Remounts the map to reset its view
    showSuccess("Filters and map view have been reset.");
  };

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
        <p className="text-muted-foreground">
          Google Maps API key is missing. Please create a `.env.local` file in the root of your project and add your key as `VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE`.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="text-center p-4 border-b shrink-0">
        <h1 className="text-3xl font-bold">Find a Graston Provider</h1>
        <p className="text-muted-foreground mt-1">Search our directory of certified professionals.</p>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden">
        {/* Left Column: Filters & Results */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
          {/* Search & Controls */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, specialty, location..."
                className="pl-10 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="filter-by-map"
                  checked={filterByMapArea}
                  onCheckedChange={setFilterByMapArea}
                />
                <Label htmlFor="filter-by-map" className="text-sm">Filter by map area</Label>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Reset All
              </Button>
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {Object.keys(filters).length > 1 && (
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                      {Object.keys(filters).length - 1}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <FilterPanel 
                  filters={filters} 
                  onFilterChange={setFilters} 
                  specialties={specialties}
                />
              </SheetContent>
            </Sheet>
          )}
          
          {/* Desktop Filter Panel */}
          {!isMobile && (
            <div className="hidden lg:block">
              <FilterPanel 
                filters={filters} 
                onFilterChange={setFilters} 
                specialties={specialties}
              />
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground shrink-0">
            Showing {providersToList.length} of {filteredProviders.length} matching providers.
          </div>

          {/* Results List */}
          <ScrollArea key={listKey} className="flex-grow border rounded-lg">
            <div className="p-2 space-y-2">
              {providersToList.length > 0 ? (
                providersToList.map((provider) => (
                  <div
                    key={provider.id}
                    onMouseEnter={() => setHoveredProviderId(provider.id)}
                    onMouseLeave={() => setHoveredProviderId(null)}
                  >
                    <ProviderCard provider={provider} />
                  </div>
                ))
              ) : (
                <div className="text-center py-16 px-4">
                  <h2 className="text-xl font-semibold">No Providers Found</h2>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria, or move the map to a new area.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={handleReset}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right Column: Map */}
        <div className="lg:col-span-2 rounded-lg overflow-hidden h-full w-full">
          <DirectoryMap 
            key={mapKey}
            providers={filteredProviders} 
            apiKey={googleMapsApiKey} 
            hoveredProviderId={hoveredProviderId}
            onBoundsChanged={setMapBounds}
          />
        </div>
      </div>
    </div>
  );
};

export default Directory;