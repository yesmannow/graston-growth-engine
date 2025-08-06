export interface ProviderProfile {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  profileImage: string;
  tier: 'Free' | 'Preferred' | 'Premier';
  trainingLevel?: 'Essential' | 'Advanced' | 'GTS'; // New field for Graston training level
  coordinates?: { // New field for map location
    lat: number;
    lng: number;
  };
}

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

export interface FullProviderProfile extends ProviderProfile {
  contactInfo?: ContactInfo;
  servicesOffered?: string[];
  galleryImages?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
}