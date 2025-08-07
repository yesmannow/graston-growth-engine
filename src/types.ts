export type Tier = 'Premier' | 'Preferred' | 'Free';

export type ClinicianType = 'Chiropractor' | 'Physical Therapist' | 'Athletic Trainer' | 'Massage Therapist' | 'Occupational Therapist' | 'Other' | 'Medical Doctor';
export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Mandarin' | 'Vietnamese' | 'Irish' | 'Hindi' | 'Korean' | 'Italian';
export type Condition = 'Back Pain' | 'Neck Pain' | 'Plantar Fasciitis' | 'Tennis Elbow' | 'Carpal Tunnel Syndrome' | 'Headaches' | 'Sports Injuries' | 'Post-Surgical Rehab' | 'Chronic Pain';
export type PatientDemographic = 'Athletes' | 'Pediatrics' | 'Geriatrics' | 'General Population';
export type TrainingLevel = 'M1 Basic' | 'M2 Advanced' | 'Certified Specialist' | 'GTS' | 'Essential' | 'Advanced';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AccreditationLogo {
  name: string;
  logoUrl: string;
  url: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  rating?: number;
  source?: string;
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
}

export interface FullProviderProfile {
  id: string;
  name: string;
  specialty: string;
  profileImage: string;
  location: string;
  clinicAddress: string;
  coordinates?: Coordinates;
  tier: Tier;
  clinicianType: ClinicianType;
  languages_spoken?: Language[];
  email: string;
  phone: string;
  website: string;
  bio?: string;
  trialStatus?: string;
  activity?: number;
  churnRisk?: boolean;
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
  services?: string[];
  certifications?: string[];
  gt_certifications?: TrainingLevel[];
  verification_badges?: string[];
  accreditation_logos?: AccreditationLogo[];
  patient_types?: PatientDemographic[];
  conditions_treated?: Condition[];
  gallery_images?: string[];
  gallery_videos?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  views?: number;
  engagementScore?: number;
  can_compare?: boolean;
  // Fields from mock data and forms
  experience?: string;
  education?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface DirectoryFilters {
  sortBy: string;
  searchTerm?: string;
  clinicianType?: string | null;
  condition?: string | null;
  language?: string | null;
  tiers?: string[];
}

export type SortOption = 'premier-first' | 'rating-desc' | 'name-asc';