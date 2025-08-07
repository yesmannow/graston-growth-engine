export type Tier = "Free" | "Preferred" | "Premier";
export type TrainingLevel = "GTS" | "Advanced" | "Essential";
export type SortOption = "premier-first" | "top-rated" | "most-reviewed";
export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type ClinicianType = "Chiropractor" | "Physical Therapist" | "Athletic Trainer" | "Massage Therapist" | "Other";
export type Language = "English" | "Spanish" | "French" | "German" | "Mandarin";
export type Condition = "Back Pain" | "Neck Pain" | "Headaches" | "Sports Injuries" | "Post-Surgical Rehab";
export type PatientDemographic = "Athletes" | "Pediatrics" | "Geriatrics" | "General Population";

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
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  sortBy: SortOption;
  favoritesOnly?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  source?: string;
  rating?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Accreditation {
  name: string;
  logoUrl: string;
  url: string;
}

export interface FullProviderProfile {
  id: string;
  name: string;
  email: string;
  specialty?: string;
  bio?: string;
  experience?: string;
  education?: string;
  profileImage?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  services?: string[];
  certifications?: string[];
  location?: string;
  clinicAddress?: string;
  coordinates?: { lat: number; lng: number };
  gtCertifications?: TrainingLevel[];
  verificationBadges?: string[];
  accreditationLogos?: Accreditation[];
  languagesSpoken?: Language[];
  patientTypes?: PatientDemographic[];
  conditionsTreated?: Condition[];
  rating?: number;
  reviewCount?: number;
  isFavorite: boolean;
  tier: Tier;
  clinicianType?: ClinicianType;
  trialStatus: "Active" | "Expired" | "N/A";
  activity: number;
  churnRisk: boolean;
  galleryImages?: string[];
  galleryVideos?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  views?: number;
  engagementScore?: number;
}

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: Tier;
  image: string;
  filePath: string;
}