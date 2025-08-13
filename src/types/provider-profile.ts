export interface OfficeHours {
  day: string;
  open?: string;
  close?: string;
  closed?: boolean;
}

export interface ProviderProfile {
  // Basic Information (All Tiers)
  id: string;
  provider_name: string;
  credentials?: string;
  practitioner_type: string;
  tier: 'Free' | 'Preferred' | 'Premier';
  tier_badge: string;
  
  // Location (All Tiers - Free shows city/state only)
  clinic_city: string;
  clinic_state: string;
  
  // Free Tier Only
  specialties?: string[];
  conditions_treated?: string[];
  provider_accreditations?: string[];
  insurance_accepted?: string[];
  telehealth_available?: boolean;
  accepting_new_patients?: boolean;
  
  // Preferred Tier and Above
  profile_photo?: string;
  clinic_name?: string;
  clinic_street?: string;
  clinic_zip?: string;
  clinic_phone?: string;
  provider_email?: string;
  clinic_website_url?: string;
  location_map?: {
    lat: number;
    lng: number;
  };
  provider_bio?: string;
  avg_rating?: number;
  total_reviews?: number;
  office_hours?: OfficeHours[];
  social_media?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  
  // Premier Tier Only
  clinic_gallery?: {
    id: string;
    url: string;
    alt: string;
    caption?: string;
  }[];
  video_intro?: string;
  testimonials?: {
    id: string;
    patient_name: string;
    rating: number;
    text: string;
    date: string;
    verified?: boolean;
  }[];
  faqs?: {
    id: string;
    question: string;
    answer: string;
    category: string;
  }[];
  booking_url?: string;
  published_articles?: {
    id: string;
    title: string;
    excerpt: string;
    published_date: string;
    read_time: number;
    slug: string;
  }[];
  upcoming_events?: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    registration_url: string;
    description: string;
  }[];
  community_activity?: {
    id: string;
    title: string;
    type: 'topic' | 'reply';
    date: string;
    engagement: number;
  }[];
}