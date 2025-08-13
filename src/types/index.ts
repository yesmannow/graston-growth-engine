export type Tier = 'Premier' | 'Preferred' | 'Free';
export type TierFilter = Tier | 'All';
export type SortOption = 'premier-first' | 'top-rated' | 'most-reviewed';
export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type ClinicianType = 'Physical Therapist' | 'Chiropractor' | 'Massage Therapist' | 'Athletic Trainer' | 'Occupational Therapist';
export type TrainingLevel = 'GTS' | 'Advanced' | 'Essential';
export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Mandarin' | 'Japanese' | 'Portuguese' | 'Italian';
export type Condition = 'Back Pain' | 'Neck Pain' | 'Shoulder Pain' | 'Knee Pain' | 'Hip Pain' | 'Ankle Pain' | 'Carpal Tunnel' | 'Tennis Elbow' | 'Plantar Fasciitis' | 'Sciatica';
export type PatientDemographic = 'Adults' | 'Seniors' | 'Children' | 'Athletes' | 'Post-Surgery' | 'Chronic Pain' | 'Work Injuries' | 'Auto Accidents';

export interface DirectoryFilters {
  sortBy: SortOption;
  searchTerm?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  clinicianType?: ClinicianType | 'All';
  specialty?: string;
  tier?: TierFilter;
  trainingLevel?: TrainingLevel | 'All';
  languages?: Language[];
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  favoritesOnly?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  profileImage: string;
  location: string;
  clinicAddress: string;
  coordinates?: { lat: number; lng: number };
  tier: Tier;
  clinicianType: ClinicianType;
  languagesSpoken: Language[];
  email: string;
  phone: string;
  website: string;
  bio?: string;
  trialStatus: string;
  activity: number;
  churnRisk: boolean;
  rating?: number;
  reviewCount?: number;
  isFavorite: boolean;
  engagementScore?: number;
  views?: number;
  can_compare: boolean;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  experience?: string;
  education?: string;
  certifications?: string[];
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  trainingLevel?: TrainingLevel;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface Testimonial {
  author: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface AccreditationLogo {
  name: string;
  logoUrl: string;
  url: string;
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

export interface FullProviderProfile extends Provider {
  media?: MediaItem[];
  testimonials?: Testimonial[];
  faqs?: Faq[];
  services?: string[];
  verificationBadges?: string[];
  accreditationLogos?: AccreditationLogo[];
}