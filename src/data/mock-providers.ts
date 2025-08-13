import { ProviderProfile } from '@/types/provider-profile';

// Free Tier Providers
const freeProviders: ProviderProfile[] = [
  {
    id: 'free-001',
    provider_name: 'Dr. Sarah Mitchell',
    credentials: 'DPT, IASTM',
    practitioner_type: 'Physical Therapist',
    tier: 'Free',
    tier_badge: 'Verified Provider',
    clinic_city: 'Austin',
    clinic_state: 'Texas',
    specialties: ['Sports Medicine', 'Orthopedic Rehabilitation'],
    conditions_treated: ['Back Pain', 'Knee Injuries'],
    provider_accreditations: ['Graston Technique Certified'],
    insurance_accepted: ['Blue Cross Blue Shield', 'Aetna'],
    telehealth_available: false,
    accepting_new_patients: true
  },
  {
    id: 'free-002',
    provider_name: 'Dr. Michael Chen',
    credentials: 'DC, CCSP',
    practitioner_type: 'Chiropractor',
    tier: 'Free',
    tier_badge: 'Verified Provider',
    clinic_city: 'Denver',
    clinic_state: 'Colorado',
    specialties: ['Sports Chiropractic', 'Spinal Rehabilitation'],
    conditions_treated: ['Neck Pain', 'Headaches'],
    provider_accreditations: ['Graston Technique Certified'],
    insurance_accepted: ['United Healthcare', 'Cigna'],
    telehealth_available: true,
    accepting_new_patients: true
  },
  {
    id: 'free-003',
    provider_name: 'Dr. Lisa Rodriguez',
    credentials: 'DPT, CSCS',
    practitioner_type: 'Physical Therapist',
    tier: 'Free',
    tier_badge: 'Verified Provider',
    clinic_city: 'Phoenix',
    clinic_state: 'Arizona',
    specialties: ['Geriatric Physical Therapy', 'Balance Training'],
    conditions_treated: ['Fall Prevention', 'Arthritis'],
    provider_accreditations: ['Graston Technique Certified'],
    insurance_accepted: ['Medicare', 'Blue Cross Blue Shield'],
    telehealth_available: false,
    accepting_new_patients: true
  }
];

// Preferred Tier Providers
const preferredProviders: ProviderProfile[] = [
  {
    id: 'pref-001',
    provider_name: 'Dr. Jennifer Rodriguez',
    credentials: 'DPT, OCS, FAAOMPT',
    practitioner_type: 'Physical Therapist',
    tier: 'Preferred',
    tier_badge: 'Preferred Provider',
    profile_photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    clinic_name: 'Elite Sports Rehabilitation',
    clinic_street: '1234 Medical Plaza Drive',
    clinic_city: 'San Diego',
    clinic_state: 'California',
    clinic_zip: '92101',
    clinic_phone: '(619) 555-0123',
    provider_email: 'dr.rodriguez@elitesports.com',
    clinic_website_url: 'https://elitesportsrehab.com',
    location_map: { lat: 32.7157, lng: -117.1611 },
    provider_bio: 'Dr. Rodriguez specializes in orthopedic manual therapy and sports rehabilitation. With over 12 years of experience, she has worked with professional athletes and weekend warriors alike. Her approach combines evidence-based treatment with personalized care to help patients achieve their goals.',
    specialties: ['Orthopedic Manual Therapy', 'Sports Rehabilitation', 'Dry Needling'],
    conditions_treated: ['Shoulder Impingement', 'ACL Rehabilitation', 'Tennis Elbow'],
    provider_accreditations: ['Graston Technique Certified', 'Dry Needling Certified', 'FAAOMPT'],
    insurance_accepted: ['Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Cigna'],
    avg_rating: 4.8,
    total_reviews: 127,
    telehealth_available: true,
    accepting_new_patients: true,
    office_hours: [
      { day: 'Monday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Tuesday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Wednesday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Thursday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Friday', open: '8:00 AM', close: '5:00 PM' },
      { day: 'Saturday', open: '9:00 AM', close: '2:00 PM' },
      { day: 'Sunday', closed: true }
    ],
    social_media: {
      facebook: 'https://facebook.com/elitesportsrehab',
      linkedin: 'https://linkedin.com/in/jenniferrodriguezpt',
      instagram: 'https://instagram.com/elitesportsrehab'
    }
  },
  {
    id: 'pref-002',
    provider_name: 'Dr. Robert Kim',
    credentials: 'DC, DACBSP',
    practitioner_type: 'Chiropractor',
    tier: 'Preferred',
    tier_badge: 'Preferred Provider',
    profile_photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    clinic_name: 'Advanced Spine Center',
    clinic_street: '5678 Wellness Boulevard',
    clinic_city: 'Portland',
    clinic_state: 'Oregon',
    clinic_zip: '97201',
    clinic_phone: '(503) 555-0456',
    provider_email: 'dr.kim@advancedspine.com',
    clinic_website_url: 'https://advancedspinecenter.com',
    location_map: { lat: 45.5152, lng: -122.6784 },
    provider_bio: 'Dr. Kim is a board-certified sports chiropractor with expertise in spinal rehabilitation and performance optimization. He has worked with collegiate and professional athletes, helping them recover from injuries and enhance their athletic performance.',
    specialties: ['Sports Chiropractic', 'Spinal Decompression', 'Functional Movement'],
    conditions_treated: ['Disc Herniation', 'Sciatica', 'Sports Injuries'],
    provider_accreditations: ['Graston Technique Certified', 'DACBSP', 'FMS Certified'],
    insurance_accepted: ['All Major Insurance', 'Workers Compensation'],
    avg_rating: 4.7,
    total_reviews: 89,
    telehealth_available: true,
    accepting_new_patients: true,
    office_hours: [
      { day: 'Monday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Tuesday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Wednesday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Thursday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Friday', open: '7:00 AM', close: '6:00 PM' },
      { day: 'Saturday', open: '8:00 AM', close: '3:00 PM' },
      { day: 'Sunday', closed: true }
    ],
    social_media: {
      facebook: 'https://facebook.com/advancedspinecenter',
      linkedin: 'https://linkedin.com/in/robertkimdc'
    }
  }
];

// Premier Tier Providers
const premierProviders: ProviderProfile[] = [
  {
    id: 'prem-001',
    provider_name: 'Dr. Alexander Thompson',
    credentials: 'DPT, PhD, OCS, SCS',
    practitioner_type: 'Physical Therapist',
    tier: 'Premier',
    tier_badge: 'Premier Provider',
    profile_photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    clinic_name: 'Thompson Performance Institute',
    clinic_street: '5678 Innovation Boulevard',
    clinic_city: 'Seattle',
    clinic_state: 'Washington',
    clinic_zip: '98101',
    clinic_phone: '(206) 555-0199',
    provider_email: 'dr.thompson@tpi-seattle.com',
    clinic_website_url: 'https://thompsonperformance.com',
    location_map: { lat: 47.6062, lng: -122.3321 },
    provider_bio: 'Dr. Alexander Thompson is a renowned physical therapist and researcher specializing in sports performance and injury prevention. With a PhD in Biomechanics and over 15 years of clinical experience, he has worked with Olympic athletes, professional sports teams, and serves as a consultant for major sports organizations. His evidence-based approach combines cutting-edge research with personalized treatment protocols to optimize human performance and prevent injuries.',
    specialties: ['Sports Performance', 'Biomechanical Analysis', 'Injury Prevention', 'Return to Sport'],
    conditions_treated: ['Complex Sports Injuries', 'Movement Dysfunction', 'Performance Optimization'],
    provider_accreditations: ['Graston Technique Master Clinician', 'Board Certified Sports Specialist', 'PhD Biomechanics'],
    insurance_accepted: ['All Major Insurance', 'Workers Compensation', 'Auto Insurance'],
    avg_rating: 4.9,
    total_reviews: 284,
    telehealth_available: true,
    accepting_new_patients: true,
    office_hours: [
      { day: 'Monday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Tuesday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Wednesday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Thursday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Friday', open: '7:00 AM', close: '6:00 PM' },
      { day: 'Saturday', open: '8:00 AM', close: '4:00 PM' },
      { day: 'Sunday', open: '10:00 AM', close: '2:00 PM' }
    ],
    social_media: {
      facebook: 'https://facebook.com/thompsonperformance',
      twitter: 'https://twitter.com/drthompsonpt',
      linkedin: 'https://linkedin.com/in/alexanderthompsonpt',
      instagram: 'https://instagram.com/thompsonperformance'
    },
    clinic_gallery: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        alt: 'Modern rehabilitation facility',
        caption: 'State-of-the-art rehabilitation equipment'
      },
      {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        alt: 'Treatment room',
        caption: 'Private treatment rooms'
      },
      {
        id: 'img-3',
        url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
        alt: 'Exercise area',
        caption: 'Functional movement training area'
      }
    ],
    video_intro: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    testimonials: [
      {
        id: 'test-1',
        patient_name: 'Sarah M.',
        rating: 5,
        text: 'Dr. Thompson helped me return to competitive running after a complex knee injury. His expertise and personalized approach made all the difference.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 'test-2',
        patient_name: 'Michael K.',
        rating: 5,
        text: 'Outstanding care and cutting-edge treatment methods. The biomechanical analysis was incredibly detailed and helpful.',
        date: '2024-01-10',
        verified: true
      },
      {
        id: 'test-3',
        patient_name: 'Jennifer L.',
        rating: 5,
        text: 'Professional, knowledgeable, and truly cares about his patients. I would highly recommend Dr. Thompson to anyone.',
        date: '2024-01-08',
        verified: true
      }
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'What makes your approach different?',
        answer: 'I combine advanced biomechanical analysis with evidence-based treatment protocols to create personalized rehabilitation programs that address the root cause of dysfunction.',
        category: 'Treatment Approach'
      },
      {
        id: 'faq-2',
        question: 'Do you work with professional athletes?',
        answer: 'Yes, I have extensive experience working with Olympic and professional athletes across various sports, helping them optimize performance and prevent injuries.',
        category: 'Experience'
      },
      {
        id: 'faq-3',
        question: 'What should I expect during my first visit?',
        answer: 'Your first visit includes a comprehensive evaluation, movement analysis, and development of a personalized treatment plan tailored to your specific goals and needs.',
        category: 'First Visit'
      }
    ],
    booking_url: 'https://thompsonperformance.com/book',
    published_articles: [
      {
        id: 'art-1',
        title: 'Biomechanical Factors in ACL Injury Prevention',
        excerpt: 'Understanding the key biomechanical factors that contribute to ACL injuries and evidence-based prevention strategies.',
        published_date: '2024-01-20',
        read_time: 8,
        slug: 'acl-injury-prevention'
      },
      {
        id: 'art-2',
        title: 'The Role of Movement Quality in Athletic Performance',
        excerpt: 'How movement quality assessment can identify performance limiters and injury risk factors in athletes.',
        published_date: '2024-01-05',
        read_time: 12,
        slug: 'movement-quality-performance'
      },
      {
        id: 'art-3',
        title: 'Return to Sport: A Comprehensive Framework',
        excerpt: 'A systematic approach to safely returning athletes to competition after injury.',
        published_date: '2023-12-15',
        read_time: 10,
        slug: 'return-to-sport-framework'
      }
    ],
    upcoming_events: [
      {
        id: 'event-1',
        title: 'Advanced Movement Assessment Workshop',
        date: '2024-02-15',
        time: '9:00 AM - 5:00 PM',
        location: 'Thompson Performance Institute',
        registration_url: 'https://thompsonperformance.com/workshops',
        description: 'Learn advanced techniques for movement assessment and corrective exercise prescription.'
      },
      {
        id: 'event-2',
        title: 'Sports Injury Prevention Seminar',
        date: '2024-03-10',
        time: '2:00 PM - 4:00 PM',
        location: 'Seattle Sports Medicine Conference',
        registration_url: 'https://seattlesportsmed.com/events',
        description: 'Evidence-based strategies for preventing common sports injuries.'
      }
    ],
    community_activity: [
      {
        id: 'comm-1',
        title: 'Latest Research on Graston Technique Effectiveness',
        type: 'topic',
        date: '2024-01-18',
        engagement: 47
      },
      {
        id: 'comm-2',
        title: 'Re: Best practices for treating plantar fasciitis',
        type: 'reply',
        date: '2024-01-16',
        engagement: 23
      },
      {
        id: 'comm-3',
        title: 'Movement screening protocols for athletes',
        type: 'topic',
        date: '2024-01-12',
        engagement: 35
      }
    ]
  }
];

export const mockProviders = [...freeProviders, ...preferredProviders, ...premierProviders];

export const providersByTier = {
  Free: freeProviders,
  Preferred: preferredProviders,
  Premier: premierProviders
};