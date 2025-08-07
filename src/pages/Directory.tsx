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
import { Search, Filter, RefreshCw } from "lucide-react";
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
import { mockProviders, specialties as mockSpecialties } from "@/lib/mockData";
import { Skeleton } from "@/components/ui/skeleton";

const Directory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [filters, setFilters] = useState<DirectoryFilters>({ sortBy: "premier-first" });
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [localProviders, setLocalProviders] = useState<FullProviderProfile[]>(mockProviders);
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOnMapMove, setSearchOnMapMove] = useState(false);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters: DirectoryFilters = { sortBy: "premier-first" };
    const urlSearchTerm = params.get('searchTerm');

    if (urlSearchTerm) {
      newFilters.searchTerm = urlSearchTerm;
      setSearchTerm(urlSearchTerm);
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

  const handleGeocodeSearch = async () => {
    setFilters(prev => ({ ...prev, searchTerm }));
    if (!searchTerm) return;
    try {
      const results = await getGeocode({ address: searchTerm });
      const { lat, lng } = await getLatLng(results[0]);
      setMapCenter({ lat, lng });
      setMapZoom(10);
    } catch (error) {
      console.error("Error geocoding search term:", error);
      showError("Could not find location. Please try a different search term.");
    }
  };

  const specialties: string[] = useMemo(() => {
    return Array.from(
      new Set<string>(
        mockProviders.flatMap(
          (p: FullProviderProfile) => (p.specialty ? [p.specialty] : [])
        )
      )
    );
  }, []);

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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="relative mb-6 flex items-center gap-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name, specialty, or location..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleGeocodeSearch(); }}
        />
        <Button onClick={handleGeocodeSearch}>Search</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isDesktop && (
          <div className="lg:col-span-1">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              specialties={specialties} 
            />
          </div>
        )}

        <div className="lg:col-span-2 space-y-6">
          {!isDesktop && (
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="outline" 
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
          )}

          {googleMapsApiKey && (
            <Card className="h-[400px] w-full">
              <CardContent className="p-0 h-full w-full rounded-lg overflow-hidden">
                <DirectoryMap 
                  providers={filteredAndSortedProviders} 
                  apiKey={googleMapsApiKey} 
                  center={mapCenter}
                  zoom={mapZoom}
                  onBoundsChanged={setMapBounds}
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="search-on-move"
              checked={searchOnMapMove}
              onCheckedChange={(checked) => setSearchOnMapMove(Boolean(checked))}
            />
            <Label htmlFor="search-on-move" className="font-semibold text-sm">
              Search as I move the map
            </Label>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredAndSortedProviders.length > 0 ? (
              filteredAndSortedProviders.map((provider) => (
                <ProviderCard 
                  key={provider.id} 
                  provider={provider} 
                  onMouseEnter={() => setHoveredProviderId(provider.id)}
                  onMouseLeave={() => setHoveredProviderId(null)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No providers found matching your criteria.</p>
                <Button variant="link" onClick={() => setFilters({ sortBy: "premier-first" })}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;