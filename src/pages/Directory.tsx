import { useState } from "react";
import { mockProviders } from "@/lib/mockData";
import ProviderCard from "@/components/directory/ProviderCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FullProviderProfile, Tier } from "@/types";
import { Search } from "lucide-react";

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<Tier | "All">("All");

  const filteredProviders = mockProviders.filter((provider: FullProviderProfile) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const matchesSearch = 
      provider.name.toLowerCase().includes(lowerCaseSearch) ||
      provider.specialty?.toLowerCase().includes(lowerCaseSearch) ||
      provider.location?.toLowerCase().includes(lowerCaseSearch);
    
    const matchesTier = selectedTier === "All" || provider.tier === selectedTier;

    return matchesSearch && matchesTier;
  });

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Find a Graston Provider</h1>
        <p className="text-muted-foreground mt-2">Search our directory of certified professionals.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-muted rounded-lg sticky top-0 z-10">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, specialty, or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto">
          <Select value={selectedTier} onValueChange={(value) => setSelectedTier(value as Tier | "All")}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Tiers</SelectItem>
              <SelectItem value="Premier">Premier</SelectItem>
              <SelectItem value="Preferred">Preferred</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProviders.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold">No Providers Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Directory;