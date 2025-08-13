import { Provider } from "@/types/provider";

const mockProviderData: Provider = {
  id: 101,
  profile_status: "active",
  membership_tier: "premier",
  search_priority: 10,
  provider_name: "Dr. Eleanor Vance",
  practitioner_type: { id: 12, name: "Physical Therapist" },
  profile_photo: {
    url: "https://placehold.co/200x200/6366f1/ffffff?text=EV",
    alt: "Profile photo of Dr. Eleanor Vance"
  },
  tier_badge: {
    url: "https://placehold.co/50x50/f59e0b/ffffff?text=P",
    alt: "Premier Member Badge"
  },
  location: {
    clinic_street: "123 Wellness Way",
    clinic_city: "Healingsburg",
    clinic_state: "California",
    clinic_zip: "90210",
    clinic_country: "United States",
    time_zone: "Pacific Time (US & Canada)",
    latitude: 34.0522,
    longitude: -118.2437,
    location_map: {
      address: "123 Wellness Way, Healingsburg, CA 90210, USA",
      lat: 34.0522,
      lng: -118.2437,
      zoom: 14
    }
  },
  contact: {
    clinic_phone: "555-123-4567",
    provider_email: "e.vance@wellnessway.com",
    clinic_website_url: "https://www.wellnessway.com",
    booking_url: "https://www.wellnessway.com/book",
    appointment_page_url: "https://www.wellnessway.com/appointments"
  },
  social_media: {
    facebook_url: "https://facebook.com/wellnessway",
    instagram_url: "https://instagram.com/wellnessway",
    linkedin_url: "https://linkedin.com/company/wellnessway",
    twitter_url: "https://twitter.com/wellnessway"
  },
  bio_experience: {
    provider_bio: "Dr. Eleanor Vance is a board-certified Physical Therapist with over 15 years of experience specializing in sports rehabilitation and chronic pain management. She believes in a holistic approach to recovery, integrating manual therapy with personalized exercise programs to help patients regain function and live pain-free.",
    years_experience: 15,
    associations_affiliations: "American Physical Therapy Association (APTA)\nCalifornia Physical Therapy Association (CPTA)",
    provider_accreditations: ["APTA", "CAPTE", "FSBPT"]
  },
  training_and_ceus: {
    ceu_credits: 45,
    training_completed: [
      { training_name: "Advanced Manual Therapy", training_date: "15/06/2023", ceu_value: 20, certificate_upload: { url: "/certs/cert1.pdf", filename: "cert1.pdf" } },
      { training_name: "Dry Needling Level 2", training_date: "20/01/2023", ceu_value: 25, certificate_upload: { url: "/certs/cert2.pdf", filename: "cert2.pdf" } }
    ]
  },
  media_content: {
    about_clinic: "<h2>Welcome to Wellness Way</h2><p>Our clinic is a state-of-the-art facility dedicated to providing the highest quality of care. We offer a bright, welcoming environment designed for healing and comfort.</p>",
    clinic_gallery: [
      { url: "https://placehold.co/600x400/a5b4fc/ffffff?text=Lobby", alt: "Clinic Lobby" },
      { url: "https://placehold.co/600x400/818cf8/ffffff?text=Treatment+Room", alt: "Treatment Room" },
      { url: "https://placehold.co/600x400/4f46e5/ffffff?text=Gym", alt: "Rehab Gym" }
    ],
    video_intro: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  specialties: {
    conditions_treated: [
      { id: 201, name: "Back Pain" },
      { id: 202, name: "Sports Injuries" },
      { id: 203, name: "Post-Surgical Rehab" }
    ],
    insurance_accepted: [
      { id: 301, name: "Blue Cross Blue Shield" },
      { id: 302, name: "Aetna" },
      { id: 303, name: "Cigna" }
    ],
    payment_methods: ["Credit Card", "CareCredit"]
  },
  availability: {
    telehealth_available: true,
    office_hours: [
      { day_of_week: "Monday", open_time: "9:00 am", close_time: "5:00 pm" },
      { day_of_week: "Tuesday", open_time: "9:00 am", close_time: "5:00 pm" },
      { day_of_week: "Wednesday", open_time: "10:00 am", close_time: "7:00 pm" },
      { day_of_week: "Friday", open_time: "9:00 am", close_time: "3:00 pm" }
    ]
  },
  reviews_and_faqs: {
    avg_rating: 4.9,
    testimonials: [
      { patient_name_initials: "J.D.", testimonial_rating: 5, testimonial_text: "Dr. Vance is amazing! She helped me recover from a knee injury faster than I ever thought possible." },
      { patient_name_initials: "S.P.", testimonial_rating: 5, testimonial_text: "The best physical therapist I've ever been to. The entire clinic is professional and caring." }
    ],
    faqs: [
      { question: "What should I bring to my first appointment?", answer: "<p>Please bring your insurance card, a form of ID, and any relevant medical records or prescriptions from your doctor.</p>" },
      { question: "How long is each session?", answer: "<p>Initial evaluations are typically 60 minutes, and follow-up appointments are 45-60 minutes.</p>" }
    ]
  },
  admin: {
    linked_user: { id: 5, username: "evance" },
    override_expiration_date: "31/12/2025"
  }
};

export async function getProviderById(id: number): Promise<Provider | null> {
  // In a real API you’d fetch from the database here.
  return id === mockProviderData.id ? mockProviderData : null;
}