export type Tier = "Premier" | "Preferred" | "Free";
export type TrainingLevel = "GTS" | "Advanced" | "Essential" | "All";
export type ClinicianType = "Physical Therapist" | "Chiropractor" | "Acupuncturist" | "All";
export type Language = "English" | "Spanish";
export type RadiusOption = 5 | 10 | 25 | 50;
export type SortOption = "premier-first" | "top-rated" | "most-reviewed";
export type TierFilter = Tier | "All";
export type Condition = "Back Pain" | "Sports Injuries" | "Post-Surgical Rehab" | "Headaches & Migraines" | "Sciatica" | "Neck Pain" | "Athletic Injuries" | "Joint Pain" | "Mobility Issues" | "Knee Replacement Rehab" | "Shoulder Surgery Recovery" | "Aquatic Therapy";
export type PatientDemographic = "Athletes" | "Seniors" | "Pediatric" | "General";

export interface FullProviderProfile {
  id: string;
  name: string;
  specialty: string;
  profileImage: string;
  tier: Tier;
  grastonLevel: string;
  clinicAddress: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  services: string[];
  certifications: string[];
  experience: string;
  education: string;
  website: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  rating: number;
  reviews: number;
  isFavorite?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  tier: Tier;
  status: "Active" | "Inactive" | "Pending";
  lastLogin: string;
  specialty: string;
  profileImage: string;
  location: string;
  clinicAddress: string;
  phone: string;
  bio: string;
  services: string[];
  certifications: string[];
  experience: string;
  education: string;
  website: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  rating: number;
  reviews: number;
  isFavorite?: boolean;
}

export interface DirectoryFilters {
  searchTerm?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  clinicianType?: ClinicianType;
  specialty?: string;
  tier?: TierFilter;
  trainingLevel?: TrainingLevel;
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  languages?: Language[];
  favoritesOnly?: boolean;
  sortBy: SortOption;
}