import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ClinicianType, 
  DirectoryFilters, 
  Language, 
  RadiusOption, 
  SortOption, 
  Tier, 
  TrainingLevel 
} from "@/types";
import { 
  states, 
  clinicianTypes, 
  languages, 
  radiusOptions, 
  sortOptions 
} from "@/lib/mockData";
import { MapPin, Filter, X } from "lucide-react";

interface FilterPanelProps {
  filters: DirectoryFilters;
  onFilterChange: (filters: DirectoryFilters) => void;
  specialties: string[];
}

const FilterPanel = ({ filters, onFilterChange, specialties }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(filters.languages || []);

  const handleFilterChange = (key: keyof DirectoryFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const handleLanguageToggle = (language: Language) => {
    const updatedLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    
    setSelectedLanguages(updatedLanguages);
    handleFilterChange('languages', updatedLanguages);
  };

  const clearFilters = () => {
    setSelectedLanguages([]);
    onFilterChange({
      sortBy: 'premier-first'
    });
  };

  const hasActiveFilters = () => {
    return Object.keys(filters).some(key => {
      if (key === 'sortBy') return false; // Don't count sort as a filter
      if (key === 'languages') return filters.languages && filters.languages.length > 0;
      return filters[key as keyof DirectoryFilters] !== undefined && 
             filters[key as keyof DirectoryFilters] !== 'All';
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter Providers
          </CardTitle>
          {hasActiveFilters() && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="h-8 text-xs"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location Filters */}
        <Accordion type="single" collapsible defaultValue="location">
          <AccordionItem value="location">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="city" className="text-xs">City</Label>
                    <Input 
                      id="city" 
                      placeholder="Enter city" 
                      value={filters.city || ''}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="state" className="text-xs">State</Label>
                    <Select 
                      value={filters.state || ''} 
                      onValueChange={(value) => handleFilterChange('state', value)}
                    >
                      <SelectTrigger id="state" className="h-8 text-sm">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All States</SelectItem>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="zipCode" className="text-xs">Zip Code</Label>
                    <Input 
                      id="zipCode" 
                      placeholder="Enter zip code" 
                      value={filters.zipCode || ''}
                      onChange={(e) => handleFilterChange('zipCode', e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="radius" className="text-xs">Search Radius</Label>
                    <Select 
                      value={filters.radius?.toString() || ''} 
                      onValueChange={(value) => handleFilterChange('radius', value ? parseInt(value) as RadiusOption : undefined)}
                    >
                      <SelectTrigger id="radius" className="h-8 text-sm">
                        <SelectValue placeholder="Select radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Distance</SelectItem>
                        {radiusOptions.map(radius => (
                          <SelectItem key={radius} value={radius.toString()}>{radius} miles</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Provider Type Filters */}
        <Accordion type="single" collapsible defaultValue="provider-type">
          <AccordionItem value="provider-type">
            <AccordionTrigger className="text-sm font-medium">Provider Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <Label htmlFor="clinicianType" className="text-xs">Clinician Type</Label>
                  <Select 
                    value={filters.clinicianType || 'All'} 
                    onValueChange={(value) => handleFilterChange('clinicianType', value === 'All' ? 'All' : value as ClinicianType)}
                  >
                    <SelectTrigger id="clinicianType" className="h-8 text-sm">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      {clinicianTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="specialty" className="text-xs">Specialty</Label>
                  <Select 
                    value={filters.specialty || 'All'} 
                    onValueChange={(value) => handleFilterChange('specialty', value)}
                  >
                    <SelectTrigger id="specialty" className="h-8 text-sm">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Specialties</SelectItem>
                      {specialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tier" className="text-xs">Membership Tier</Label>
                  <Select 
                    value={filters.tier || 'All'} 
                    onValueChange={(value) => handleFilterChange('tier', value === 'All' ? 'All' : value as Tier)}
                  >
                    <SelectTrigger id="tier" className="h-8 text-sm">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Tiers</SelectItem>
                      <SelectItem value="Premier">Premier</SelectItem>
                      <SelectItem value="Preferred">Preferred</SelectItem>
                      <SelectItem value="Free">Basic (Free)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="trainingLevel" className="text-xs">Training Level</Label>
                  <Select 
                    value={filters.trainingLevel || 'All'} 
                    onValueChange={(value) => handleFilterChange('trainingLevel', value === 'All' ? 'All' : value as TrainingLevel)}
                  >
                    <SelectTrigger id="trainingLevel" className="h-8 text-sm">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Levels</SelectItem>
                      <SelectItem value="GTS">GTS</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Essential">Essential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Languages Spoken */}
        <Accordion type="single" collapsible>
          <AccordionItem value="languages">
            <AccordionTrigger className="text-sm font-medium">Languages Spoken</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`language-${language}`} 
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={() => handleLanguageToggle(language)}
                    />
                    <Label 
                      htmlFor={`language-${language}`}
                      className="text-sm cursor-pointer"
                    >
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Sort Options */}
        <div className="space-y-1 pt-2">
          <Label htmlFor="sortBy" className="text-xs">Sort Results By</Label>
          <Select 
            value={filters.sortBy || 'premier-first'} 
            onValueChange={(value) => handleFilterChange('sortBy', value as SortOption)}
          >
            <SelectTrigger id="sortBy" className="h-8 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;