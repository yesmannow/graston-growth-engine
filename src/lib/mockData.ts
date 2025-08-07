import { FullProviderProfile, ClinicianType, TrainingLevel, Language, Tier, SortOption } from "@/types";
import rawProviders from "../dummy_provider_directory_with_taxonomies.json";

// Helper function to ensure a string is a valid ClinicianType
const getClinicianType = (type: string | undefined): ClinicianType | undefined => {
  if (!type) return undefined;
  const validTypes: ClinicianType[] = ["Physical Therapist", "Chiropractor", "Occupational Therapist", "Athletic Trainer", "Medical Doctor", "Other"];
  return validTypes.includes(type as ClinicianType) ? (type as ClinicianType) : "Other";
};

// Helper function to ensure a string is a valid TrainingLevel
const getTrainingLevel = (level: string | undefined): TrainingLevel | undefined => {
  if (!level) return undefined;
  const validLevels: TrainingLevel[] = ["GTS", "Advanced", "Essential"];
  return validLevels.includes(level as TrainingLevel) ? (level as TrainingLevel) : undefined;
};

// Helper function to ensure a string is a valid Language
const getLanguage = (lang: string | undefined): Language | undefined => {
  if (!lang) return undefined;
  const validLanguages: Language[] = ["English", "Spanish", "French", "German", "Mandarin", "Arabic"];
  return validLanguages.includes(lang as Language) ? (lang as Language) : undefined;
};

export const mockProviders: FullProviderProfile[] = rawProviders.map((provider: any) => ({
  id: provider.id,
  name: provider.name,
  email: provider.email,
  tier: provider.tier as Tier,
  trialStatus: provider.trialStatus,
  activity: provider.activity,
  churnRisk: provider.churnRisk,
  profileImage: provider.profileImage,
  specialty: provider.specialty,
  bio: provider.bio,
  experience: provider.experience,
  education: provider.education,
  socialMedia: provider.socialMedia,
  services: provider.services,
  certifications: provider.certifications,
  location: provider.location,
  coordinates: provider.latitude && provider.longitude ? { lat: provider.latitude, lng: provider.longitude } : undefined,
  city: provider.city,
  state: provider.state,
  zipCode: provider.zipCode,
  clinicianType: getClinicianType(provider.clinicianType),
  trainingLevel: getTrainingLevel(provider.trainingLevel),
  languagesSpoken: provider.languagesSpoken?.map(getLanguage).filter(Boolean) as Language[],
  rating: provider.rating,
  reviewCount: provider.reviewCount,
  activityScore: provider.activityScore,
  galleryImages: provider.galleryImages,
  testimonials: provider.testimonials,
  faqs: provider.faqs,
  contactInfo: provider.contactInfo,
}));

export const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export const clinicianTypes: ClinicianType[] = [
  "Physical Therapist", "Chiropractor", "Occupational Therapist", "Athletic Trainer", "Medical Doctor", "Other"
];

export const languages: Language[] = [
  "English", "Spanish", "French", "German", "Mandarin", "Arabic"
];

export const radiusOptions = [5, 10, 25, 50, 100];

export const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Premier First", value: "premier-first" },
  { label: "Closest to Me", value: "closest" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Most Active", value: "most-active" },
  { label: "Most Reviewed", value: "most-reviewed" },
];