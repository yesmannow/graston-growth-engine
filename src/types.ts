import { LatLngExpression } from "leaflet";

export type Tier = 'Free' | 'Preferred' | 'Premier';
export type TrainingLevel = 'Level 1' | 'Level 2' | 'Level 3' | 'MDT' | 'Dry Needling' | 'GTS' | 'Advanced' | 'Essential'; // Added GTS, Advanced, Essential
export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Chinese' | 'Japanese' | 'Mandarin' | 'Hindi' | 'Korean' | 'Italian'; // Added Mandarin, Hindi, Korean, Italian
export type Condition = 'Back Pain' | 'Neck Pain' | 'Shoulder Pain' | 'Knee Pain' | 'Headaches' | 'Sports Injury' | 'Post-surgical Rehab' | 'Prenatal Therapy' | 'Ankle Rehab' | 'Sports Injuries' | 'Post-Surgical Rehab'; // Added Sports Injuries, Post-Surgical Rehab
export type PatientDemographic = 'Pediatric' | 'Adolescent' | 'Adult' | 'Geriatric' | 'Athletes' | 'Pregnant Women' | 'Pediatrics' | 'Geriatrics' | 'General Population'; // Added Pediatrics, Geriatrics, General Population
export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type ClinicianType = 'Physical Therapist' | 'Chiropractor' | 'Occupational Therapist' | 'Athletic Trainer' | 'Massage Therapist' | 'Other' | 'Medical Doctor'; // Added Medical Doctor
export type SortOption = 'premier-first' | 'top-rated' | 'most-reviewed';

export interface FullProviderProfile {
  id: string;
  name: string;
  specialty: string;
  bio?: string;
  experience?: string;
  education?: string;
  profileImage?: string;
  phone?: string;
  email?: string;
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
  accreditationLogos?: { name: string; logoUrl: string; url: string }[]; // Updated type
  languagesSpoken?: Language[];
  patientTypes?: PatientDemographic[];
  conditionsTreated?: Condition[];
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
  tier: Tier;
  clinicianType?: ClinicianType;
  updated_at?: string;
  galleryImages?: string[];
  galleryVideos?: string[];
  testimonials?: Testimonial[]; // Updated type
  faqs?: FAQ[]; // Updated type
  can_compare?: boolean;
  views?: number;
  engagementScore?: number;
  trialStatus?: 'Active' | 'Expired' | 'N/A';
  churnRisk?: boolean;
  activity?: number;
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
  patientTypes?: PatientDemographic[];
  conditionsTreated?: Condition[];
  sortBy: SortOption;
  favoritesOnly?: boolean;
}

export interface MapProvider {
  id: string;
  name: string;
  coordinates: LatLngExpression;
  tier: Tier;
  profileImage?: string;
  specialty?: string;
}

// New interfaces for Marketing Toolkit, Testimonials, and FAQs
export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: Tier;
  image: string;
  filePath: string;
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