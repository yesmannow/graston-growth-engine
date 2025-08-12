export type Tier = 'Free' | 'Preferred' | 'Premier' | 'All';
export type TrialStatus = 'Active' | 'Expired' | 'N/A';
export type SortOption = 'premier-first' | 'top-rated' | 'most-reviewed';
export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type ClinicianType = 'All' | 'Therapist' | 'Psychiatrist' | 'Psychologist' | 'Counselor' | 'Social Worker' | 'Coach' | 'Chiropractor' | 'Physical Therapist' | 'Athletic Trainer' | 'Massage Therapist' | 'Medical Doctor' | 'Other';
export type TrainingLevel = 'All' | 'Level 1' | 'Level 2' | 'Level 3' | 'Consultant' | 'GTS' | 'Advanced' | 'Essential';
export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Italian' | 'Portuguese' | 'Chinese' | 'Japanese' | 'Korean' | 'Arabic' | 'Russian' | 'Hindi' | 'Mandarin';
export type Condition = 'Anxiety' | 'Depression' | 'PTSD' | 'OCD' | 'ADHD' | 'Bipolar' | 'Eating Disorders' | 'Substance Abuse' | 'Relationship Issues' | 'Grief' | 'Trauma' | 'Phobias' | 'Back Pain' | 'Neck Pain' | 'Headaches' | 'Sports Injuries' | 'Post-Surgical Rehab';
export type PatientDemographic = 'Children' | 'Adolescents' | 'Adults' | 'Seniors' | 'Couples' | 'Families' | 'Groups' | 'LGBTQ+' | 'Veterans' | 'First Responders' | 'Athletes' | 'Pediatrics' | 'Geriatrics' | 'General Population';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AccreditationLogo {
  name: string;
  imageUrl: string;
  logoUrl: string;
  url: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  quote: string;
  author: string;
  source?: string;
}

export interface FAQ {
  id: string;
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
  email: string;
  profileImage: string;
  specialty: string;
  clinicianType: ClinicianType;
  tier: Tier;
  trialStatus: TrialStatus;
  location: string;
  clinicAddress: string;
  coordinates?: Coordinates;
  phone: string;
  website: string;
  bio: string;
  services?: string[];
  languagesSpoken?: Language[];
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  gtCertifications?: TrainingLevel[];
  accreditationLogos?: AccreditationLogo[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  rating?: number;
  reviewCount?: number;
  activity: number;
  churnRisk: boolean;
  isFavorite: boolean;
  // Added missing properties
  engagementScore?: number;
  views?: number;
  can_compare?: boolean;
  verificationBadges?: string[];
  galleryImages?: string[];
  galleryVideos?: string[];
  experience?: string;
  education?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  certifications?: string[];
}

export interface DirectoryFilters {
  searchTerm?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  clinicianType?: ClinicianType;
  specialty?: string;
  tier?: Tier;
  trainingLevel?: TrainingLevel;
  languages?: Language[];
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  sortBy: SortOption;
  favoritesOnly?: boolean;
}