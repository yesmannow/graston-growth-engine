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
import { Switch } from "@/components/ui/switch"; // Imported Switch
import { 
  ClinicianType, 
  DirectoryFilters, 
  Language, 
  RadiusOption, 
  SortOption, 
  TierFilter,
  TrainingLevel,
  Condition,
  PatientDemographic
} from "@/types";
import { 
  states, 
  clinicianTypes, 
  languages, 
  radiusOptions, 
  sortOptions,
  conditions,
  patientDemographics
} from "@/lib/mockData";
import { MapPin, Filter, X } from "lucide-react";

interface FilterPanelProps {
  filters: DirectoryFilters;
  onFilterChange: (filters: DirectoryFilters) => void;
  specialties: string[];
}

const FilterPanel = ({ filters, onFilterChange, specialties }: FilterPanelProps) => {
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(filters.languages || []);
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>(filters.conditionsTreated || []);
  const [selectedPatientTypes, setSelectedPatientTypes] = useState<PatientDemographic[]>(filters.patientTypes || []);

  const handleFilterChange = (key: keyof DirectoryFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const handleMultiSelectToggle = <T extends string>(
    currentSelection: T[],
    item: T,
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    filterKey: keyof DirectoryFilters
  ) => {
    const updatedSelection = currentSelection.includes(item)
      ? currentSelection.filter(l => l !== item)
      : [...currentSelection, item];
    
    setter(updatedSelection);
    handleFilterChange(filterKey, updatedSelection.length > 0 ? updatedSelection : undefined);
  };

  const clearFilters = () => {
    setSelectedLanguages([]);
    setSelectedConditions([]);
    setSelectedPatientTypes([]);
    onFilterChange({
      sortBy: 'premier-first'
    });
  };

  const hasActiveFilters = () => {
    return Object.keys(filters).some(key => {
      if (key === 'sortBy') return false; // Don't count sort as a filter
      if (key === 'languages') return filters.languages && filters.languages.length > 0;
      if (key === 'conditionsTreated') return filters.conditionsTreated && filters.conditionsTreated.length > 0;
      if (key === 'patientTypes') return filters.patientTypes && filters.patientTypes.length > 0;
      if (key === 'searchTerm') return filters.searchTerm && filters.searchTerm.length > 0;
      if (key === 'favoritesOnly') return filters.favoritesOnly;
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
                      value={filters.state || 'all'} 
                      onValueChange={(value) => handleFilterChange('state', value === 'all' ? undefined : value)}
                    >
                      <SelectTrigger id="state" className="h-8 text-sm">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
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
                      value={filters.radius?.toString() || 'all'} 
                      onValueChange={(value) => handleFilterChange('radius', value === 'all' ? undefined : parseInt(value) as RadiusOption)}
                    >
                      <SelectTrigger id="radius" className="h-8 text-sm">
                        <SelectValue placeholder="Select radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Distance</SelectItem>
                        {radiusOptions.map(radius => (
                          <SelectItem key={radius} value={radius.toString()}>{`${radius} miles`}</SelectItem>
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
                    onValueChange={(value) => handleFilterChange('tier', value as TierFilter)}
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

        {/* Conditions Treated */}
        <Accordion type="single" collapsible>
          <AccordionItem value="conditions">
            <AccordionTrigger className="text-sm font-medium">Conditions Treated</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {conditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`condition-${condition}`} 
                      checked={selectedConditions.includes(condition)}
                      onCheckedChange={() => handleMultiSelectToggle(selectedConditions, condition, setSelectedConditions, 'conditionsTreated')}
                    />
                    <Label 
                      htmlFor={`condition-${condition}`}
                      className="text-sm cursor-pointer"
                    >
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Patient Types */}
        <Accordion type="single" collapsible>
          <AccordionItem value="patient-types">
            <AccordionTrigger className="text-sm font-medium">Patient Types</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {patientDemographics.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`patient-type-${type}`} 
                      checked={selectedPatientTypes.includes(type)}
                      onCheckedChange={() => handleMultiSelectToggle(selectedPatientTypes, type, setSelectedPatientTypes, 'patientTypes')}
                    />
                    <Label 
                      htmlFor={`patient-type-${type}`}
                      className="text-sm cursor-pointer"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
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
                      onCheckedChange={() => handleMultiSelectToggle(selectedLanguages, language, setSelectedLanguages, 'languages')}
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

        {/* Favorites Only Toggle */}
        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="favorites-only"
            checked={filters.favoritesOnly || false}
            onCheckedChange={(checked: boolean) => handleFilterChange('favoritesOnly', checked)}
          />
          <Label htmlFor="favorites-only" className="text-sm">Show Favorites Only</Label>
        </div>

        {/* Sort Options */}
        <div className="space-y-1 pt-2">
          <Label htmlFor="sortBy" className="text-xs">Sort Results By</Label>
          <Select 
            value={filters.sortBy || 'premier-first'} 
            onValueChange={(value) => handleFilterChange('sortBy', value as SortOption)}
          >
            <SelectTrigger id="sortBy" className="h-8 text-sm">
              <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option: { value: string; label: string }) => (
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