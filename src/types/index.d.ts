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

export interface FullProviderProfile {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  profileImage: string;
  tier: Tier;
  trainingLevel?: TrainingLevel;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contactInfo?: ContactInfo;
  servicesOffered?: string[];
  galleryImages?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
}