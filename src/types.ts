export type Tier = "Premier" | "Preferred" | "Free";
export type TrainingLevel = "GTS" | "Advanced" | "Essential";
export type ClinicianType = "Chiropractor" | "Physical Therapist" | "Athletic Trainer" | "Massage Therapist" | "Other" | "Occupational Therapist" | "Medical Doctor";
export type Language = "English" | "Spanish" | "French" | "German" | "Mandarin" | "Other" | "Cantonese" | "Hindi" | "Arabic" | "Portuguese" | "Russian" | "Japanese" | "Korean" | "Italian" | "Vietnamese";
export type Condition = "Back Pain" | "Neck Pain" | "Shoulder Pain" | "Knee Pain" | "Plantar Fasciitis" | "Tennis Elbow" | "Shoulder Injuries" | "Headaches" | "Carpal Tunnel Syndrome" | "TMJ Dysfunction" | "Sciatica" | "Sports Injuries" | "Post-Surgical Rehab" | "Chronic Pain" | "Golfers Elbow" | "Shin Splints" | "Rotator Cuff Tendinopathy" | "Achilles Tendinopathy" | "IT Band Syndrome";
export type PatientDemographic = "Athletes" | "Pediatrics" | "Geriatrics" | "General Population" | "Adults" | "Children" | "Adolescents" | "Pregnant Women" | "Post-Surgical" | "Seniors" | "Post-Surgical Patients";
export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type SortOption = "premier-first" | "top-rated" | "most-reviewed" | "distance";

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

export interface AccreditationLogo {
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
  accreditationLogos?: AccreditationLogo[];
  languagesSpoken?: Language[];
  patientTypes?: PatientDemographic[];
  conditionsTreated?: Condition[];
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
  tier: Tier;
  clinicianType?: ClinicianType;
  trialStatus: "Active" | "Expired" | "N/A";
  activity: number;
  churnRisk: boolean;
  galleryImages?: string[];
  galleryVideos?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
}

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tier: Tier;
  filePath: string;
}