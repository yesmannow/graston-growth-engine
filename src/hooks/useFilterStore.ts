import { create } from 'zustand';
import { Condition, Language } from '@/types';

interface FilterState {
  searchTerm: string;
  clinicianType: string | null;
  condition: Condition | null;
  language: Language | null;
  tiers: string[];
  setSearchTerm: (term: string) => void;
  setClinicianType: (type: string | null) => void;
  setCondition: (condition: Condition | null) => void;
  setLanguage: (language: Language | null) => void;
  setTiers: (tiers: string[]) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  clinicianType: null,
  condition: null,
  language: null,
  tiers: ['Premier', 'Preferred', 'Free'],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setClinicianType: (type) => set({ clinicianType: type }),
  setCondition: (condition) => set({ condition: condition }),
  setLanguage: (language) => set({ language: language }),
  setTiers: (tiers) => set({ tiers: tiers }),
  clearFilters: () => set({
    searchTerm: '',
    clinicianType: null,
    condition: null,
    language: null,
    tiers: ['Premier', 'Preferred', 'Free'],
  }),
}));