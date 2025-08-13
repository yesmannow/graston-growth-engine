import { FullProviderProfile } from "@/types";

// This function converts the raw mock data structure to the FullProviderProfile type
export const mapMockToFullProfile = (mock: any): FullProviderProfile => {
  return {
    id: mock.id.toString(),
    name: mock.provider_name,
    specialty: mock.practitioner_type.name,
    profileImage: mock.profile_photo.url,
    tier: mock.membership_tier,
    grastonLevel: mock.bio_experience.graston_level,
    clinicAddress: `${mock.location.clinic_street}, ${mock.location.clinic_city}, ${mock.location.clinic_state} ${mock.location.clinic_zip}`,
    location: `${mock.location.clinic_city}, ${mock.location.clinic_state}`,
    email: mock.contact.provider_email,
    phone: mock.contact.clinic_phone,
    bio: mock.bio_experience.provider_bio,
    services: mock.specialties?.conditions_treated || [],
    certifications: [], // Mock data doesn't have this, so we default to empty
    experience: "15+ years", // Placeholder
    education: "Doctor of Physical Therapy", // Placeholder
    website: "https://example.com", // Placeholder
    linkedin: "https://linkedin.com/in/example", // Placeholder
    facebook: "https://facebook.com/example", // Placeholder
    instagram: "https://instagram.com/example", // Placeholder
    twitter: "https://twitter.com/example", // Placeholder
    rating: mock.reviews_and_faqs?.testimonials?.[0]?.rating || 5,
    reviews: mock.reviews_and_faqs?.testimonials?.length || 0,
  };
};