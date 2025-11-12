import type { Language, Tier, ClinicianType } from "@/types";


export interface TransformedProvider {
  id: string;
  name: string;
  email: string;
  bio: string;
  specialty: string;
  experience: string;
  education: string;
  location: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  zipCode: string;
  profileImage: string;
  tier: Tier;
  clinicianType: ClinicianType;
  languagesSpoken: Language[];
  services: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  activityScore: number;
  galleryImages: string[];
  testimonials: { author: string; quote: string }[];
  faqs: { question: string; answer: string }[];
  contactInfo: {
    phone: string;
    website: string;
  };
//   trialStatus?: "Active" | "Expired" | "N/A"; // optional field for trial status
  activity: number;
  churnRisk: boolean;
}

export const transformProvider = (wp: any): TransformedProvider => {
  const acf = wp.acf ?? {};
  const map = acf.location_map ?? {};

  return {
    id: wp.id.toString(),
    name: acf.provider_name ?? wp.title?.rendered ?? "Unnamed",
    email: acf.provider_email ?? "",
    bio: acf.provider_bio ?? "",
    specialty: acf.practitioner_type || "General",
    experience: acf.years_experience ?? "",
    education: acf.associations_affiliations ?? "",
    location: map.address ?? "",
    latitude: parseFloat(map.lat ?? map.latitude ?? 0),
    longitude: parseFloat(map.lng ?? map.longitude ?? 0),
    city: map.city ?? "",
    state: map.state_short ?? map.state ?? "",
    zipCode: map.post_code?.toString() ?? "",
    profileImage: acf.profile_photo || "",

    tier: acf.membership_tier ?? "standard",
    clinicianType: wp["directory_clinician_type"]?.[0] ?? "",
    languagesSpoken: wp["directory-language-spoken"] ?? [],
    services: acf.conditions_treated || [],
    certifications: acf.provider_accreditations || [],
    rating: parseFloat(acf.avg_rating || 0),
    reviewCount: 0, // you can update later if this becomes available
    activityScore: 0, // placeholder

    galleryImages: Array.isArray(acf.clinic_gallery)
      ? acf.clinic_gallery.map((img: any) => img.url ?? img)
      : [],

    testimonials: Array.isArray(acf.testimonials)
      ? acf.testimonials.map((t: any) => ({
          author: t.author ?? "Anonymous",
          quote: t.quote ?? "",
        }))
      : [],

    faqs: Array.isArray(acf.faqs)
      ? acf.faqs.map((f: any) => ({
          question: f.question ?? "",
          answer: f.answer ?? "",
        }))
      : [],

    contactInfo: {
      phone: acf.clinic_phone ?? "",
      website: acf.clinic_website_url ?? acf.booking_url ?? "",
    },

    activity: 0, // placeholder for activity score
    churnRisk: false, // placeholder for churn risk
  };
};