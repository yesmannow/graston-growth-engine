import { useState, useMemo } from "react";
import { DirectoryFilters, FullProviderProfile } from "@/types";
import FilterPanel from "@/components/directory/FilterPanel";
import DirectoryMap from "@/components/directory/DirectoryMap";
import MiniProfileCard from "@/components/directory/MiniProfileCard";
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
import { specialties } from "@/lib/mockData";
import Fuse from 'fuse.js';
import { Filter, List, Map as MapIcon } from "lucide-react";
import smallProvidersRaw from '@/lib/smallProviderData.json';
import { mapMockToFullProfile } from "@/lib/dataMapping";

const smallProviders: FullProviderProfile[] = (smallProvidersRaw as any[]).map(mapMockToFullProfile);

const ITEMS_PER_PAGE = 9;

const Directory = () => {
  const [filters, setFilters] = useState<DirectoryFilters>({ sortBy: 'premier-first' });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [hoveredProviderId, setHoveredProviderId] = useState<string | null>(null);

  const fuse = useMemo(() => new Fuse(smallProviders, {
    keys: ['name', 'specialty', 'location', 'services'],
    threshold: 0.3,
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

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* Desktop Filter Panel */}
      <aside className="hidden lg:block w-80 xl:w-96 p-4 border-r overflow-y-auto">
        <FilterPanel filters={filters} onFilterChange={setFilters} specialties={specialties} />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex-shrink-0 p-4 border-b flex items-center justify-between gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Search by name, specialty, or location..."
              value={filters.searchTerm || ''}
              onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:inline">
              Showing {filteredProviders.length} results
            </span>
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'map' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setViewMode('map')}
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
                <FilterPanel filters={filters} onFilterChange={setFilters} specialties={specialties} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'list' ? (
            <div className="h-full overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginatedProviders.map(provider => (
                <div 
                  key={provider.id}
                  onMouseEnter={() => setHoveredProviderId(provider.id)}
                  onMouseLeave={() => setHoveredProviderId(null)}
                >
                  <MiniProfileCard provider={provider} />
                </div>
              ))}
            </div>
          ) : (
            <DirectoryMap 
              providers={filteredProviders} 
              hoveredProviderId={hoveredProviderId}
              onMarkerHover={setHoveredProviderId}
            />
          )}
        </div>

        {/* Pagination */}
        {viewMode === 'list' && totalPages > 1 && (
          <div className="flex-shrink-0 p-4 border-t flex items-center justify-center">
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
      </main>
    </div>
  );
};

export default Directory;