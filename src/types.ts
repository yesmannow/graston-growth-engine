export type Tier = "Free" | "Preferred" | "Premier";

export type Language = "English" | "Spanish" | "French" | "German" | "Mandarin" | "Arabic";

export type ClinicianType = "Chiropractor" | "Physical Therapist" | "Athletic Trainer" | "Massage Therapist" | "Medical Doctor" | "Other";

export type TrainingLevel = "GTS" | "Advanced" | "Essential";

export type SortOption = "premier-first" | "closest" | "top-rated" | "most-active" | "most-reviewed";

export type RadiusOption = 5 | 10 | 25 | 50 | 100;

export interface DirectoryFilters {
  sortBy?: SortOption;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  clinicianType?: ClinicianType | 'All';
  specialty?: string | 'All';
  tier?: Tier | 'All';
  trainingLevel?: TrainingLevel | 'All';
  languages?: Language[];
}

export interface ContactInfo {
  phone?: string;
  website?: string;
  email?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: Tier;
  image: string;
  filePath: string;
  tags?: string[];
}

export interface FullProviderProfile {
  id: string;
  name: string;
  email: string;
  tier: Tier;
  trialStatus: "Active" | "Expired" | "N/A";
  activity: number;
  churnRisk: boolean;
  profileImage?: string;
  specialty?: string;
  phone?: string;
  location?: string;
  bio?: string;
  experience?: string;
  education?: string;
  website?: string;
  socialMedia?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  services?: string[];
  certifications?: string[];
  clinicianType?: ClinicianType;
  rating?: number;
  reviewCount?: number;
  languagesSpoken?: Language[];
  contactInfo?: ContactInfo;
  coordinates?: { lat: number; lng: number };
  city?: string;
  state?: string;
  zipCode?: string;
  trainingLevel?: TrainingLevel;
  activityScore?: number;
  servicesOffered?: string[];
  galleryImages?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
}