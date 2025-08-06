import { useState } from "react";
import { mockProviders } from "@/lib/mockData";
import ProviderCard from "@/components/directory/ProviderCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FullProviderProfile, Tier, TrainingLevel } from "@/types";
import { Search } from "lucide-react";
import DirectoryMap from "@/components/directory/DirectoryMap";
import { ScrollArea } from "@/components/ui/scroll-area";

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<Tier | "All">("All");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | "All">("All");
  const [selectedTrainingLevel, setSelectedTrainingLevel] = useState<TrainingLevel | "All">("All");

  // Ensure specialties are always strings
  const specialties = [...new Set(mockProviders.map(p => p.specialty).filter((s): s is string => typeof s === 'string'))];

  const filteredProviders = mockProviders.filter((provider: FullProviderProfile) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const matchesSearch = 
      provider.name.toLowerCase().includes(lowerCaseSearch) ||
      provider.specialty?.toLowerCase().includes(lowerCaseSearch) ||
      provider.location?.toLowerCase().includes(lowerCaseSearch);
    
    const matchesTier = selectedTier === "All" || provider.tier === selectedTier;
    const matchesSpecialty = selectedSpecialty === "All" || provider.specialty === selectedSpecialty;
    const matchesTrainingLevel = selectedTrainingLevel === "All" || provider.trainingLevel === selectedTrainingLevel;

    return matchesSearch && matchesTier && matchesSpecialty && matchesTrainingLevel;
  });

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
          {/* Filters */}
          <div className="flex flex-col gap-4 p-4 bg-muted rounded-lg shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={(value) => setSelectedSpecialty(value as string | "All")}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Specialties</SelectItem>
                {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedTrainingLevel} onValueChange={(value) => setSelectedTrainingLevel(value as TrainingLevel | "All")}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by training level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Training Levels</SelectItem>
                <SelectItem value="Essential">Essential</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="GTS">GTS</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTier} onValueChange={(value) => setSelectedTier(value as Tier | "All")}>
              <SelectTrigger>
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

          {/* Results List */}
          <ScrollArea className="flex-grow border rounded-lg">
            <div className="p-2 space-y-2">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))
              ) : (
                <div className="text-center py-16 px-4">
                  <h2 className="text-xl font-semibold">No Providers Found</h2>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right Column: Map */}
        <div className="lg:col-span-2 rounded-lg overflow-hidden h-full w-full">
          <DirectoryMap providers={filteredProviders} apiKey={googleMapsApiKey} />
        </div>
      </div>
    </div>
  );
};

export default Directory;