export type Tier = "Free" | "Preferred" | "Premier";
export type ClinicianType = "Physical Therapist" | "Chiropractor" | "Massage Therapist" | "Athletic Trainer" | "Other";
export type Language = "English" | "Spanish" | "French" | "Hindi" | "Mandarin";
export type RadiusOption = 10 | 25 | 50 | 100;
export type SortOption = "premier-first" | "top-rated" | "most-reviewed";
export type TrainingLevel = "GTS" | "Advanced" | "Essential";

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  bookingUrl?: string;
}

export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  source?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Accreditation {
  name: string;
  logoUrl: string;
  url?: string;
}

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[]; // Added tags property
  tier: Tier;
  image: string;
  filePath: string;
}

export interface FullProviderProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  specialty?: string;
  clinicianType?: ClinicianType;
  location?: string; // City, State
  clinicAddress?: string; // Full clinic address
  coordinates?: { lat: number; lng: number; }; // For map
  tier: Tier;
  trialStatus: "Active" | "Expired" | "N/A";
  activity: number; // e.g., views, clicks
  churnRisk: boolean;
  bio?: string;
  experience?: string; // e.g., "10 years"
  education?: string; // e.g., "MD, Harvard"
  socialMedia?: SocialMedia;
  services?: string[]; // Services offered
  certifications?: string[]; // Other certifications
  gtCertifications?: TrainingLevel[]; // Graston Technique specific certifications
  verificationBadges?: string[]; // e.g., "Background Checked", "Licensed"
  accreditationLogos?: Accreditation[]; // Logos for accreditations
  languagesSpoken?: Language[];
  patientTypes?: string[]; // e.g., "Adults", "Children", "Athletes"
  galleryImages?: string[];
  galleryVideos?: string[]; // URLs for embedded videos
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  rating?: number; // 1-5
  reviewCount?: number;
  contactInfo?: ContactInfo; // Consolidated contact info (phone and website are here)
  isFavorite?: boolean; // For favorite toggle
  canCompare?: boolean; // For compare button
}

export interface DirectoryFilters {
  searchTerm?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  clinicianType?: ClinicianType | 'All';
  specialty?: string | 'All';
  tier?: Tier | 'All';
  trainingLevel?: TrainingLevel | 'All';
  languages?: Language[];
  patientTypes?: string[];
  sortBy?: SortOption;
  favoritesOnly?: boolean;
}