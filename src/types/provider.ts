export interface Provider {
  id: number;
  profile_status: string;
  membership_tier: string;
  search_priority: number;
  provider_name: string;
  practitioner_type: { id: number; name: string };
  profile_photo: { url: string; alt: string };
  tier_badge: { url: string; alt: string };
  location: {
    clinic_street: string;
    clinic_city: string;
    clinic_state: string;
    clinic_zip: string;
    clinic_country: string;
    time_zone: string;
    latitude: number;
    longitude: number;
    location_map: { address: string; lat: number; lng: number; zoom: number };
  };
  contact: {
    clinic_phone: string;
    provider_email: string;
    clinic_website_url: string;
    booking_url: string;
    appointment_page_url: string;
  };
  social_media: {
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
    twitter_url: string;
  };
  bio_experience: {
    provider_bio: string;
    years_experience: number;
    associations_affiliations: string;
    provider_accreditations: string[];
  };
  training_and_ceus: {
    ceu_credits: number;
    training_completed: Array<{
      training_name: string;
      training_date: string;
      ceu_value: number;
      certificate_upload: { url: string; filename: string };
    }>;
  };
  media_content: {
    about_clinic: string;
    clinic_gallery: Array<{ url: string; alt: string }>;
    video_intro: string;
  };
  specialties: {
    conditions_treated: Array<{ id: number; name: string }>;
    insurance_accepted: Array<{ id: number; name: string }>;
    payment_methods: string[];
  };
  availability: {
    telehealth_available: boolean;
    office_hours: Array<{
      day_of_week: string;
      open_time: string;
      close_time: string;
    }>;
  };
  reviews_and_faqs: {
    avg_rating: number;
    testimonials: Array<{
      patient_name_initials: string;
      testimonial_rating: number;
      testimonial_text: string;
    }>;
    faqs: Array<{ question: string; answer: string }>;
  };
  admin: {
    linked_user: { id: number; username: string };
    override_expiration_date: string;
  };
}