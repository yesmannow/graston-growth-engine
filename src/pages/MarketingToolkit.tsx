import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockProviders } from "@/lib/mockData";
import { marketingResources } from "@/data/marketingResources";
import ResourceCard from "@/components/dashboards/provider/ResourceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import { MarketingResource } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import ResourceCardSkeleton from "@/components/dashboards/provider/ResourceCardSkeleton";

const categories = ['All', ...new Set(marketingResources.map((r: MarketingResource) => r.category))];

const MarketingToolkitPage = () => {
  const { id } = useParams<{ id: string }>();
  const provider = mockProviders.find((p) => p.id === id);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [resourceStatuses, setResourceStatuses] = useState<Record<string, 'read' | 'downloaded'>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatuses = async () => {
      if (!provider) return;
      setIsLoading(true);
      const { data, error } = await supabase
        .from('provider_resources')
        .select('resource_id, status')
        .eq('provider_id', provider.id);

      if (error) {
        console.error("Error fetching resource statuses", error);
      } else {
        const statuses = data.reduce((acc, record) => {
          acc[record.resource_id] = record.status;
          return acc;
        }, {} as Record<string, 'read' | 'downloaded'>);
        setResourceStatuses(statuses);
      }
      setIsLoading(false);
    };

    fetchStatuses();
  }, [provider]);

  const handleStatusChange = (resourceId: string, newStatus?: 'read' | 'downloaded') => {
    setResourceStatuses(prev => {
      const newState = { ...prev };
      if (newStatus) {
        newState[resourceId] = newStatus;
      } else {
        delete newState[resourceId]; // Remove the status if newStatus is undefined
      }
      return newState;
    });
  };

  if (!provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Provider not found</h1>
      </div>
    );
  }

  const featuredResource = marketingResources.find((r: MarketingResource) => r.id === 'res_002')!;

  const filteredResources = marketingResources
    .filter((resource: MarketingResource) => resource.id !== featuredResource.id)
    .filter((resource: MarketingResource) => 
      selectedCategory === 'All' || resource.category === selectedCategory
    )
    .filter((resource: MarketingResource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-2">Marketing Toolkit</h1>
      <p className="text-muted-foreground mb-8">
        Your central hub for marketing resources to help you grow your practice.
      </p>

      {/* Featured Resource */}
      <div className="mb-12 p-6 bg-secondary rounded-lg flex flex-col md:flex-row gap-6 items-center">
        <img src={featuredResource.image} alt={featuredResource.title} className="w-full md:w-1/3 rounded-lg object-cover aspect-video" />
        <div className="flex-1">
          <h2 className="text-sm font-semibold uppercase text-primary mb-1 flex items-center gap-2"><Star className="h-4 w-4" /> Featured Resource</h2>
          <h3 className="text-2xl font-bold">{featuredResource.title}</h3>
          <p className="text-muted-foreground mt-2 mb-4">{featuredResource.description}</p>
          {isLoading ? <ResourceCardSkeleton /> : (
            <ResourceCard 
              resource={featuredResource} 
              userTier={provider.tier} 
              providerId={provider.id}
              status={resourceStatuses[featuredResource.id]}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category: string) => (
            <Button 
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="flex-shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => <ResourceCardSkeleton key={index} />)
        ) : (
            filteredResources.map((resource: MarketingResource) => (
                <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    userTier={provider.tier} 
                    providerId={provider.id}
                    status={resourceStatuses[resource.id]}
                    onStatusChange={handleStatusChange}
                />
            ))
        )}
      </div>
      {!isLoading && filteredResources.length === 0 && (
        <div className="text-center col-span-full py-12">
            <p className="text-muted-foreground">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MarketingToolkitPage;