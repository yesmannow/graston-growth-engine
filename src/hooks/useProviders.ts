import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FullProviderProfile, Condition, Language } from '@/types';

interface ProviderFilters {
  searchTerm?: string;
  clinicianType?: string | null;
  condition?: Condition | null;
  language?: Language | null;
  tiers?: string[];
  acceptingNewPatients?: boolean;
}

const fetchProviders = async ({
  searchTerm,
  clinicianType,
  condition,
  language,
  tiers,
  acceptingNewPatients,
}: ProviderFilters): Promise<FullProviderProfile[]> => {
  let query = supabase.from('profiles').select('*');

  if (searchTerm) {
    const searchString = `name.ilike.%${searchTerm}%,specialty.ilike.%${searchTerm}%,clinic_address.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`;
    query = query.or(searchString);
  }

  if (clinicianType) {
    query = query.eq('clinician_type', clinicianType);
  }

  if (condition) {
    query = query.cs('conditions_treated', [condition]);
  }

  if (language) {
    query = query.cs('languages_spoken', [language]);
  }

  if (tiers && tiers.length > 0 && tiers.length < 3) {
    query = query.in('tier', tiers);
  }

  if (acceptingNewPatients) {
    query = query.eq('accepting_new_patients', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching providers:', error);
    throw new Error(error.message);
  }

  return data || [];
};

export const useProviders = (filters: ProviderFilters) => {
  return useQuery<FullProviderProfile[]>({
    queryKey: ['providers', filters],
    queryFn: () => fetchProviders(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};