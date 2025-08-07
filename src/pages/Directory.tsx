import { useState, useEffect } from "react";
import { mockProviders } from "@/lib/mockData";
import ProviderCard from "@/components/directory/ProviderCard";
import { Input } from "@/components/ui/input";
import { DirectoryFilters, FullProviderProfile, SortOption } from "@/types";
import { Search, Filter, X } from "lucide-react";
import DirectoryMap from "@/components/directory/DirectoryMap";
import { ScrollArea } from "@/components/ui/scroll-area";
import FilterPanel from "@/components/directory/FilterPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);
  const [filters, setFilters] = useState<DirectoryFilters>({
    sortBy: 'premier-first'
  });
  const [filteredProviders, setFilteredProviders] = useState<FullProviderProfile[]>(mockProviders);
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

  // Sort providers based on selected sort option
  const sortProviders = (providers: FullProviderProfile[], sortBy: SortOption): FullProviderProfile[] => {
    const sortedProviders = [...providers];
    
    switch (sortBy) {
      case 'premier-first':
        return sortedProviders.sort((a, b) => {
          const tierOrder = { Premier: 0, Preferred: 1, Free: 2 };
          return tierOrder[a.tier] - tierOrder[b.tier];
        });
        
      case 'closest':
        // In a real app, this would use geolocation to sort by actual distance
        // For now, we'll just return the original order
        return sortedProviders;
        
      case 'top-rated':
        return sortedProviders.sort((a, b) => 
          (b.rating || 0) - (a.rating || 0)
        );
        
      case 'most-active':
        return sortedProviders.sort((a, b) => 
          (b.activityScore || 0) - (a.activityScore || 0)
        );
        
      case 'most-reviewed':
        return sortedProviders.sort((a, b) => 
          (b.reviewCount || 0) - (a.reviewCount || 0)
        );
        
      default:
        return sortedProviders;
    }
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
          {/* Search Bar */}
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
          <div className="text-sm text-muted-foreground">
            Found {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
          </div>

          {/* Results List */}
          <ScrollArea className="flex-grow border rounded-lg">
            <div className="p-2 space-y-2">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
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
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({ sortBy: 'premier-first' });
                    }}
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
            providers={filteredProviders} 
            apiKey={googleMapsApiKey} 
            hoveredProviderId={hoveredProviderId} 
          />
        </div>
      </div>
    </div>
  );
};

export default Directory;