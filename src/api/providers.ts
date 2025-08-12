import { supabase } from "@/integrations/supabase/client";
import type { FullProviderProfile } from "@/types";

export async function fetchProviderById(
  id: number
): Promise<FullProviderProfile> {
  const { data, error } = await supabase
    .from("providers")
    .select(`
      id,
      profile_status,
      membership_tier,
      search_priority,
      provider_name,
      practitioner_type,
      profile_photo,
      tier_badge,
      location,
      contact,
      social_media,
      bio_experience,
      training_and_ceus,
      media_content,
      specialties,
      availability,
      reviews_and_faqs,
      admin
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Provider not found");
  }
  return data as FullProviderProfile;
}