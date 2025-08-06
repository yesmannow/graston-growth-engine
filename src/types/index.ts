export type Tier = 'Free' | 'Preferred' | 'Premier';
export type TrainingLevel = 'Essential' | 'Advanced' | 'GTS';

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
  image: string;         // Added this property
  imageUrl?: string;     // Made optional since image is used instead
  filePath: string;      // Added this property
  fileUrl?: string;      // Made optional since filePath is used instead
  tier: Tier;
  category: string;
  tags: string[];
}

export interface FullProviderProfile {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  profileImage: string;
  tier: Tier;
  email: string;         // Required field
  
  // Optional fields used throughout the app
  membershipTier?: Tier;
  trainingLevel?: TrainingLevel;
  coordinates?: Coordinates;
  contactInfo?: ContactInfo;
  servicesOffered?: string[];
  services?: string[]; // Alternative name used in some components
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
}