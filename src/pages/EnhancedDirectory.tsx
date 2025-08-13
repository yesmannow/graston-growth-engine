import { useState, useMemo, useEffect, useCallback } from "react";
import { DirectoryFilters, FullProviderProfile } from "@/types";
import FilterPanel from "@/components/directory/FilterPanel";
import EnhancedDirectoryMap from "@/components/enhanced-directory/EnhancedDirectoryMap";
import EnhancedProviderCard from "@/components/enhanced-directory/EnhancedProviderCard";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Filter, List, Map as MapIcon, LocateFixed, X } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { mockProviderData, specialties } from "@/lib/mockData";
import Fuse from 'fuse.js';
import smallProvidersRaw from '@/lib/smallProviderData.json';
import { mapMockToFullProfile } from "@/lib/dataMapping";

const smallProviders: FullProviderProfile[] = (smallProvidersRaw as any[]).map(mapMockToFullProfile);

const ITEMS_PER_PAGE = 9;
const LIBRARIES: ("places")[] = ["places"];

const EnhancedDirectory = () => {
  const [filters, setFilters] = useState<DirectoryFilters>({ sortBy: 'premier-first' });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 }); // Center of US
  const [mapZoom, setMapZoom] = useState(4);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [comparingProviders, setComparingProviders] = useState<string[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  const {
    ready,
    value,
    suggestions: { status, data: placePredictions },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      componentRestrictions: { country: "us" },
    },
    debounce: 300,
  });

  const fuse = useMemo(() => new Fuse(smallProviders, {
    keys: ['name', 'specialty', 'location', 'services', 'clinicAddress'],
    threshold: 0.4,
    includeScore: true,
  }), []);

  const filteredProviders = useMemo(() => {
    let providers = smallProviders;

    if (filters.searchTerm) {
      providers = fuse.search(filters.searchTerm).map(result => result.item);
    }

    // Apply other filters
    providers = providers.filter(p => {
      if (filters.state && filters.state !== 'all' && !p.location.includes(filters.state)) return false;
      if (filters.tier && filters.tier !== 'All' && p.tier !== filters.tier) return false;
      if (filters.specialty && filters.specialty !== 'All' && p.specialty !== filters.specialty) return false;
      if (filters.favoritesOnly && !p.isFavorite) return false;
      return true;
    });

    // Apply sorting
    if (filters.sortBy === 'top-rated') {
      providers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sortBy === 'most-reviewed') {
      providers.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    } else { // premier-first (default)
      const tierOrder = { 'Premier': 1, 'Preferred': 2, 'Free': 3 };
      providers.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
    }

    return providers;
  }, [filters, fuse]);

  const totalPages = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE);
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePlaceSelect = async (place: google.maps.places.AutocompletePrediction) => {
    setValue(place.description, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address: place.description });
      const { lat, lng } = await getLatLng(results[0]);
      setMapCenter({ lat, lng });
      setMapZoom(11);
      handleFilterChange({...filters, searchTerm: place.description.split(',')[0]});
    } catch (error) {
      console.error("Error getting geocode: ", error);
    }
  };

  const handleFilterChange = (newFilters: DirectoryFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
          setMapZoom(12);
        },
        (error) => {
          console.error("Error getting user location:", error);
          alert("Could not get your location. Please ensure location services are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleToggleCompare = (providerId: string) => {
    setComparingProviders(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)] bg-gray-50">
      {/* Desktop Filter Panel */}
      <aside className="hidden lg:block w-80 xl:w-96 p-4 border-r bg-white overflow-y-auto">
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} specialties={specialties} />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex-shrink-0 p-4 border-b bg-white flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Input 
              placeholder="Search by city, zip, or provider name..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              className="max-w-md"
            />
            {value && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setValue("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {status === 'OK' && (
              <div className="absolute z-10 w-full max-w-md bg-white border rounded-md mt-1 shadow-lg">
                {placePredictions.map((place: google.maps.places.AutocompletePrediction) => (
                  <div 
                    key={place.place_id}
                    onClick={() => handlePlaceSelect(place)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {place.description}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleUseMyLocation} className="hidden sm:flex">
              <LocateFixed className="h-4 w-4 mr-2" />
              Use My Location
            </Button>
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setViewMode('list')}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'map' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setViewMode('map')}
                className="h-8 w-8"
              >
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-4 overflow-y-auto">
                <FilterPanel filters={filters} onFilterChange={handleFilterChange} specialties={specialties} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {viewMode === 'list' ? (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {paginatedProviders.map(provider => (
                  <div 
                    key={provider.id}
                    onMouseEnter={() => setHoveredProviderId(provider.id)}
                    onMouseLeave={() => setHoveredProviderId(null)}
                  >
                    <EnhancedProviderCard 
                      provider={provider}
                      onToggleCompare={handleToggleCompare}
                      isComparing={comparingProviders.includes(provider.id)}
                      onToggleFavorite={() => {}}
                    />
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex-shrink-0 p-4 border-t bg-white flex items-center justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            isActive={currentPage === i + 1}
                            onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 h-full w-full">
              {isLoaded ? (
                <EnhancedDirectoryMap 
                  providers={filteredProviders} 
                  hoveredProviderId={hoveredProviderId}
                  onMarkerHover={setHoveredProviderId}
                  center={mapCenter}
                  zoom={mapZoom}
                  userLocation={userLocation}
                />
              ) : (
                <div>Loading Map...</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnhancedDirectory;