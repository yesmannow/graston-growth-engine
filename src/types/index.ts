export type Tier = 'Premier' | 'Preferred' | 'Free';
export type ClinicianType = string;
export type Language = string;
export type Condition = string;
export type PatientDemographic = string;
export type SortOption = 'premier-first' | 'top-rated' | 'most-reviewed';
export type RadiusOption = number;
export type TrainingLevel = 'GTS' | 'Advanced' | 'Essential';
export type TierFilter = Tier | 'All';

export interface DirectoryFilters {
  sortBy: SortOption;
  clinicianType?: ClinicianType;
  specialty?: string;
  tier?: TierFilter;
  favoritesOnly?: boolean;
  searchTerm?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  languages?: Language[];
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  trainingLevel?: TrainingLevel;
}

export interface MediaItem {
  url: string;
  alt?: string;
  type?: string;
}

export interface Testimonial {
  patient_name_initials?: string;
  testimonial_rating?: number;
  testimonial_text?: string;
  author?: string;
  avatar?: string;
  rating?: number;
  text?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface FullProviderProfile {
  id: string | number;
  // Core fields
  profile_status?: string;
  membership_tier?: string;
  search_priority?: number;
  provider_name?: string;
  practitioner_type?: any;
  profile_photo?: any;
  tier_badge?: any;
  location?: any;
  contact?: any;
  social_media?: any;
  bio_experience?: any;
  training_and_ceus?: any;
  media_content?: any;
  specialties?: any;
  availability?: any;
  reviews_and_faqs?: any;
  admin?: any;

  // Directory/dashboard form fields
  name?: string;
  specialty?: string;
  profileImage?: string;
  clinicAddress?: string;
  coordinates?: { lat: number; lng: number };
  tier?: Tier;
  clinicianType?: ClinicianType;
  languagesSpoken?: Language[];
  email?: string;
  phone?: string;
  website?: string;
  bio?: string;
  trialStatus?: string;
  activity?: number;
  churnRisk?: boolean;
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
  engagementScore?: number;
  views?: number;
  can_compare?: boolean;
  services?: string[];
  certifications?: string[];
  accreditationLogos?: Array<{ name: string; logoUrl: string; url: string }>;

  // loose index signature to allow all mock-data props
  [key: string]: any;
}