"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useFilterStore } from '@/hooks/useFilterStore';
import { Search, X } from 'lucide-react';
import { specialties, conditions, languages } from '@/lib/mockData';
import { Condition, Language } from '@/types'; // Import types for casting

const FilterPanel = () => {
  const {
    searchTerm,
    setSearchTerm,
    clinicianType,
    setClinicianType,
    condition,
    setCondition,
    language,
    setLanguage,
    tiers,
    setTiers,
    clearFilters,
  } = useFilterStore();

  return (
    <div className="p-4 space-y-4 bg-white">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name, specialty, or location..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select value={clinicianType || ''} onValueChange={setClinicianType}>
          <SelectTrigger>
            <SelectValue placeholder="Clinician Type" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={condition || ''} onValueChange={(value) => setCondition(value as Condition)}>
          <SelectTrigger>
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={language || ''} onValueChange={(value) => setLanguage(value as Language)}>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium text-brand-text mb-2 block">Provider Tier</label>
        <ToggleGroup
          type="multiple"
          variant="outline"
          value={tiers}
          onValueChange={(value) => setTiers(value)}
          className="justify-start"
        >
          <ToggleGroupItem value="Premier">Premier</ToggleGroupItem>
          <ToggleGroupItem value="Preferred">Preferred</ToggleGroupItem>
          <ToggleGroupItem value="Free">Free</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex gap-2">
        <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">Search</Button>
        <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-1">
          <X className="h-4 w-4" /> Clear
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;