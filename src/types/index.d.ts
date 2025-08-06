export type Tier = 'Free' | 'Preferred' | 'Premier';
export type TrainingLevel = 'Essential' | 'Advanced' | 'GTS';

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface FullProviderProfile {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  profileImage: string;
  tier: Tier;

  // Optional fields used elsewhere in the codebase
  trainingLevel?: TrainingLevel;
  coordinates?: Coordinates;
  contactInfo?: ContactInfo;
  servicesOffered?: string[];
  galleryImages?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
}