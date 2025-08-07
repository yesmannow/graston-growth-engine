export type Tier = "Free" | "Preferred" | "Premier";
export type ClinicianType = "Physical Therapist" | "Occupational Therapist" | "Chiropractor" | "Massage Therapist" | "Other";
export type TrainingLevel = "Essential" | "Advanced" | "GTS";
export type Language = "English" | "Spanish" | "French" | "Mandarin";
export type ProfileStatus = "active" | "pending" | "inactive";
export type AccreditationType = 'fsbpt' | 'nata' | 'apta' | 'ica'; // Example accreditations

export interface FullProviderProfile {
  id: string;
  name: string;
  email: string;
  tier: Tier;
  trialStatus: "Active" | "Expired" | "N/A";
  activity: number; // e.g., views, clicks
  churnRisk: boolean;
  profileImage?: string;
  specialty?: string;
  bio?: string;
  experience?: string; // e.g., "10 years"
  education?: string;
  website?: string;
  phone?: string;
  location?: string; // combined city, state, zip
  city?: string;
  state?: string;
  zipCode?: string;
  clinicianType?: ClinicianType;
  languagesSpoken?: Language[];
  services?: string[];
  certifications?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  rating?: number;
  reviewCount?: number;
  trainingLevel?: TrainingLevel;
  bookingUrl?: string;
  telehealthAvailable?: boolean;
  appointmentPageUrl?: string;
  profileStatus?: ProfileStatus;
  activityScore?: number;
  accreditations?: AccreditationType[]; // Added for accreditation badges
}

export interface DirectoryFilters {
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  clinicianType?: ClinicianType | 'All';
  specialty?: string | 'All';
  tier?: Tier | 'All';
  trainingLevel?: TrainingLevel | 'All';
  languages?: Language[];
  sortBy?: SortOption;
}

export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type SortOption = 'premier-first' | 'closest' | 'top-rated' | 'most-active' | 'most-reviewed';

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: Tier;
  image: string;
  filePath: string;
}