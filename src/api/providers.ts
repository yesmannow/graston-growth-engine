import { Provider } from '@/types/provider';
import { supabase } from '@/integrations/supabase/client';

export async function fetchProviderById(providerId: number): Promise<Provider> {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('id', providerId)
    .single<Provider>();

  if (error) {
    throw new Error(`Error fetching provider: ${error.message}`);
  }
  return data;
}