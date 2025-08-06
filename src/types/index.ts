export type Tier = 'Free' | 'Preferred' | 'Premier';
export type TrainingLevel = 'Essential' | 'Advanced' | 'GTS';

export type ClinicianType = 
  | 'Chiropractor'
  | 'Physical Therapist'
  | 'Occupational Therapist'
  | 'Athletic Trainer'
  | 'Massage Therapist'
  | 'Medical Doctor'
  | 'Other';

export type Language = 
  | 'English'
  | 'Spanish'
  | 'French'
  | 'Mandarin'
  | 'Arabic'
  | 'Tagalog'
  | 'Other';

export type SortOption = 
  | 'closest'
  | 'top-rated'
  | 'most-active'
  | 'premier-first'
  | 'most-reviewed';

export type RadiusOption = 5 | 10 | 25 | 50 | 100;

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface SocialMedia {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
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
  image: string;
  imageUrl?: string;
  filePath: string;
  fileUrl?: string;
  tier: Tier;
  category: string;
  tags: string[];
}

export interface LocationData {
  city: string;
  state: string;
  zipCode: string;
  coordinates: Coordinates;
}

export interface FullProviderProfile {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  profileImage: string;
  tier: Tier;
  email: string;
  
  // Optional fields used throughout the app
  membershipTier?: Tier;
  trainingLevel?: TrainingLevel;
  coordinates?: Coordinates;
  contactInfo?: ContactInfo;
  servicesOffered?: string[];
  services?: string[];
  galleryImages?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  
  // Additional fields referenced in components
  website?: string;
  socialMedia?: SocialMedia;
  phone?: string;
  experience?: string;
  education?: string;
  churnRisk?: boolean;
  trialStatus?: 'Active' | 'Expired' | 'N/A';
  certifications?: string[];
  
  // New fields for enhanced filtering
  clinicianType?: ClinicianType;
  languagesSpoken?: Language[];
  city?: string;
  state?: string;
  zipCode?: string;
  rating?: number;
  reviewCount?: number;
  activityScore?: number;
}

export interface DirectoryFilters {
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  tier?: Tier | 'All';
  clinicianType?: ClinicianType | 'All';
  specialty?: string | 'All';
  trainingLevel?: TrainingLevel | 'All';
  languages?: Language[];
  sortBy?: SortOption;
}