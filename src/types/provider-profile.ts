export interface ProviderProfile {
  id: string;
  tier: 'Free' | 'Preferred' | 'Premier';
  
  // Basic Information
  provider_name: string;
  practitioner_type: string;
  credentials: string;
  profile_photo?: string;
  provider_bio: string;
  
  // Location & Contact
  clinic_name?: string;
  clinic_street?: string;
  clinic_city: string;
  clinic_state: string;
  clinic_zip?: string;
  clinic_phone?: string;
  provider_email?: string;
  clinic_website_url?: string;
  location_map?: {
    lat: number;
    lng: number;
  };
  
  // Professional Details
  provider_accreditations: string[];
  insurance_accepted: string[];
  specialties: string[];
  languages_spoken: string[];
  
  // Availability & Services
  telehealth_available: boolean;
  accepting_new_patients: boolean;
  office_hours?: {
    [key: string]: string;
  };
  
  // Social Media
  social_media: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  
  // Premier Features
  clinic_gallery?: string[];
  video_intro?: string;
  booking_url?: string;
  avg_rating?: number;
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  custom_sections?: CustomSection[];
  published_articles?: Article[];
  upcoming_events?: Event[];
  
  // Verification & Trust
  tier_badge: string;
  verified: boolean;
  years_experience?: number;
}

export interface Testimonial {
  id: string;
  patient_name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CustomSection {
  id: string;
  type: 'text' | 'video' | 'download' | 'gallery';
  title: string;
  content: string;
  media_url?: string;
  download_url?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  published_date: string;
  read_time: number;
  slug: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'webinar' | 'seminar';
  registration_url: string;
  description: string;
}