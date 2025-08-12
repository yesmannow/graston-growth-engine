import { ProviderProfile } from '@/types/provider-profile';

// Free Tier Providers (30)
const freeProviders: ProviderProfile[] = [
  {
    id: 'free-001',
    tier: 'Free',
    provider_name: 'Dr. Sarah Mitchell',
    practitioner_type: 'Physical Therapist',
    credentials: 'DPT, OCS',
    provider_bio: 'Dedicated physical therapist specializing in orthopedic rehabilitation and sports injury recovery.',
    clinic_city: 'Austin',
    clinic_state: 'Texas',
    provider_accreditations: ['Board Certified Orthopedic Clinical Specialist'],
    insurance_accepted: ['Blue Cross Blue Shield', 'Aetna'],
    specialties: ['Orthopedic Rehabilitation', 'Sports Medicine'],
    languages_spoken: ['English'],
    telehealth_available: false,
    accepting_new_patients: true,
    social_media: {},
    tier_badge: 'Free Member',
    verified: true
  },
  {
    id: 'free-002',
    tier: 'Free',
    provider_name: 'Dr. Michael Chen',
    practitioner_type: 'Chiropractor',
    credentials: 'DC',
    provider_bio: 'Experienced chiropractor focused on spinal health and holistic wellness approaches.',
    clinic_city: 'San Diego',
    clinic_state: 'California',
    provider_accreditations: ['Doctor of Chiropractic'],
    insurance_accepted: ['United Healthcare', 'Cigna'],
    specialties: ['Spinal Adjustment', 'Pain Management'],
    languages_spoken: ['English', 'Mandarin'],
    telehealth_available: true,
    accepting_new_patients: true,
    social_media: {},
    tier_badge: 'Free Member',
    verified: true
  },
  {
    id: 'free-003',
    tier: 'Free',
    provider_name: 'Dr. Emily Rodriguez',
    practitioner_type: 'Massage Therapist',
    credentials: 'LMT, NCTMB',
    provider_bio: 'Licensed massage therapist specializing in therapeutic and deep tissue massage.',
    clinic_city: 'Phoenix',
    clinic_state: 'Arizona',
    provider_accreditations: ['National Certification Board for Therapeutic Massage'],
    insurance_accepted: ['Aetna', 'Humana'],
    specialties: ['Deep Tissue Massage', 'Therapeutic Massage'],
    languages_spoken: ['English', 'Spanish'],
    telehealth_available: false,
    accepting_new_patients: true,
    social_media: {},
    tier_badge: 'Free Member',
    verified: true
  }
  // Note: In a real implementation, this would include all 30 free providers
];

// Preferred Tier Providers (30)
const preferredProviders: ProviderProfile[] = [
  {
    id: 'preferred-001',
    tier: 'Preferred',
    provider_name: 'Dr. Jennifer Rodriguez',
    practitioner_type: 'Physical Therapist',
    credentials: 'DPT, CSCS, Cert. MDT',
    profile_photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    provider_bio: 'Board-certified physical therapist with over 12 years of experience in orthopedic and sports rehabilitation. Specializing in manual therapy techniques and movement analysis to help patients achieve optimal function and return to their active lifestyles.',
    clinic_name: 'Rodriguez Physical Therapy Center',
    clinic_street: '2847 Oak Street',
    clinic_city: 'Denver',
    clinic_state: 'Colorado',
    clinic_zip: '80205',
    clinic_phone: '(303) 555-0123',
    provider_email: 'dr.rodriguez@rptcenter.com',
    clinic_website_url: 'https://rodriguezpt.com',
    location_map: { lat: 39.7392, lng: -104.9903 },
    provider_accreditations: ['Board Certified Orthopedic Clinical Specialist', 'Certified Strength & Conditioning Specialist'],
    insurance_accepted: ['Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Cigna', 'Medicare'],
    specialties: ['Orthopedic Rehabilitation', 'Sports Medicine', 'Manual Therapy', 'Movement Analysis'],
    languages_spoken: ['English', 'Spanish'],
    telehealth_available: true,
    accepting_new_patients: true,
    office_hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 5:00 PM',
      'Saturday': '9:00 AM - 2:00 PM',
      'Sunday': 'Closed'
    },
    social_media: {
      facebook: 'https://facebook.com/rodriguezpt',
      linkedin: 'https://linkedin.com/in/jrodriguezpt',
      instagram: 'https://instagram.com/rodriguezpt'
    },
    tier_badge: 'Preferred Provider',
    verified: true,
    years_experience: 12
  },
  {
    id: 'preferred-002',
    tier: 'Preferred',
    provider_name: 'Dr. James Wilson',
    practitioner_type: 'Chiropractor',
    credentials: 'DC, CCSP',
    profile_photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    provider_bio: 'Experienced chiropractor specializing in sports chiropractic and rehabilitation. Dedicated to helping athletes and active individuals achieve peak performance through comprehensive spinal care and movement optimization.',
    clinic_name: 'Wilson Sports Chiropractic',
    clinic_street: '1234 Main Street',
    clinic_city: 'Portland',
    clinic_state: 'Oregon',
    clinic_zip: '97201',
    clinic_phone: '(503) 555-0156',
    provider_email: 'dr.wilson@wilsonchiro.com',
    clinic_website_url: 'https://wilsonchiro.com',
    location_map: { lat: 45.5152, lng: -122.6784 },
    provider_accreditations: ['Certified Chiropractic Sports Physician'],
    insurance_accepted: ['Blue Cross Blue Shield', 'Kaiser Permanente', 'Cigna'],
    specialties: ['Sports Chiropractic', 'Spinal Rehabilitation', 'Athletic Performance'],
    languages_spoken: ['English'],
    telehealth_available: true,
    accepting_new_patients: true,
    office_hours: {
      'Monday': '9:00 AM - 6:00 PM',
      'Tuesday': '9:00 AM - 6:00 PM',
      'Wednesday': '9:00 AM - 6:00 PM',
      'Thursday': '9:00 AM - 6:00 PM',
      'Friday': '9:00 AM - 5:00 PM',
      'Saturday': 'Closed',
      'Sunday': 'Closed'
    },
    social_media: {
      facebook: 'https://facebook.com/wilsonchiro',
      twitter: 'https://twitter.com/drwilsonchiro'
    },
    tier_badge: 'Preferred Provider',
    verified: true,
    years_experience: 15
  }
  // Note: In a real implementation, this would include all 30 preferred providers
];

// Premier Tier Providers (30)
const premierProviders: ProviderProfile[] = [
  {
    id: 'premier-001',
    tier: 'Premier',
    provider_name: 'Dr. Alexander Thompson',
    practitioner_type: 'Physical Therapist',
    credentials: 'DPT, PhD, OCS, FAAOMPT',
    profile_photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    provider_bio: 'Distinguished physical therapist and researcher with over 18 years of clinical experience and academic leadership. Fellowship-trained in orthopedic manual therapy with extensive expertise in complex spine conditions, sports injuries, and movement dysfunction. Published author of over 30 peer-reviewed articles and international speaker on advanced manual therapy techniques. Committed to evidence-based practice and mentoring the next generation of physical therapists.',
    clinic_name: 'Thompson Advanced Physical Therapy Institute',
    clinic_street: '1500 Medical Center Drive, Suite 300',
    clinic_city: 'Seattle',
    clinic_state: 'Washington',
    clinic_zip: '98101',
    clinic_phone: '(206) 555-0199',
    provider_email: 'dr.thompson@taptinstitute.com',
    clinic_website_url: 'https://thompsonptinstitute.com',
    location_map: { lat: 47.6062, lng: -122.3321 },
    provider_accreditations: [
      'Fellow of the American Academy of Orthopedic Manual Physical Therapists',
      'Board Certified Orthopedic Clinical Specialist',
      'Certified Graston Technique Instructor',
      'Dry Needling Certification'
    ],
    insurance_accepted: [
      'Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Cigna', 
      'Medicare', 'Premera', 'Kaiser Permanente', 'Regence'
    ],
    specialties: [
      'Orthopedic Manual Therapy', 'Spine Rehabilitation', 'Sports Medicine',
      'Movement Analysis', 'Dry Needling', 'Research & Education'
    ],
    languages_spoken: ['English', 'German'],
    telehealth_available: true,
    accepting_new_patients: true,
    office_hours: {
      'Monday': '7:00 AM - 7:00 PM',
      'Tuesday': '7:00 AM - 7:00 PM',
      'Wednesday': '7:00 AM - 7:00 PM',
      'Thursday': '7:00 AM - 7:00 PM',
      'Friday': '7:00 AM - 6:00 PM',
      'Saturday': '8:00 AM - 4:00 PM',
      'Sunday': 'By Appointment'
    },
    social_media: {
      facebook: 'https://facebook.com/thompsonptinstitute',
      twitter: 'https://twitter.com/drthompsonpt',
      linkedin: 'https://linkedin.com/in/alexanderthompsonpt',
      instagram: 'https://instagram.com/thompsonptinstitute'
    },
    clinic_gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop'
    ],
    video_intro: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    booking_url: 'https://thompsonptinstitute.com/book-appointment',
    avg_rating: 4.9,
    testimonials: [
      {
        id: 'test-001',
        patient_name: 'Sarah M.',
        rating: 5,
        text: 'Dr. Thompson is exceptional. His expertise in manual therapy helped me recover from a complex spine injury that other providers couldn\'t resolve. Highly recommend!',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 'test-002',
        patient_name: 'Robert K.',
        rating: 5,
        text: 'Outstanding care and attention to detail. The clinic is state-of-the-art and Dr. Thompson\'s approach is both scientific and compassionate.',
        date: '2024-01-10',
        verified: true
      },
      {
        id: 'test-003',
        patient_name: 'Maria L.',
        rating: 5,
        text: 'After months of chronic back pain, Dr. Thompson\'s treatment plan got me back to running marathons. Truly life-changing care.',
        date: '2024-01-05',
        verified: true
      }
    ],
    faqs: [
      {
        id: 'faq-001',
        question: 'What makes your approach different from other physical therapy clinics?',
        answer: 'Our institute combines cutting-edge research with advanced manual therapy techniques. We focus on identifying and treating the root cause of dysfunction, not just symptoms. Every treatment plan is evidence-based and tailored to the individual patient\'s needs and goals.',
        category: 'Treatment Approach'
      },
      {
        id: 'faq-002',
        question: 'Do you accept insurance?',
        answer: 'Yes, we accept most major insurance plans including Blue Cross Blue Shield, Aetna, United Healthcare, Cigna, Medicare, and many others. We also offer flexible payment options and can provide documentation for out-of-network reimbursement.',
        category: 'Insurance & Billing'
      },
      {
        id: 'faq-003',
        question: 'How long are typical treatment sessions?',
        answer: 'Initial evaluations are typically 60-90 minutes, allowing for comprehensive assessment and treatment planning. Follow-up sessions are usually 45-60 minutes, ensuring adequate time for hands-on treatment and patient education.',
        category: 'Treatment Process'
      },
      {
        id: 'faq-004',
        question: 'Do you offer telehealth consultations?',
        answer: 'Yes, we offer telehealth consultations for initial assessments, follow-up visits, and movement analysis. While hands-on treatment requires in-person visits, many aspects of care can be effectively delivered remotely.',
        category: 'Services'
      }
    ],
    published_articles: [
      {
        id: 'article-001',
        title: 'Advanced Manual Therapy Techniques for Chronic Spine Pain',
        excerpt: 'Exploring evidence-based approaches to complex spinal conditions through integrated manual therapy methods and movement science.',
        published_date: '2024-01-01',
        read_time: 8,
        slug: 'advanced-manual-therapy-spine-pain'
      },
      {
        id: 'article-002',
        title: 'The Role of Movement Analysis in Injury Prevention',
        excerpt: 'How comprehensive movement screening can prevent injuries and optimize athletic performance in both recreational and elite athletes.',
        published_date: '2023-12-15',
        read_time: 6,
        slug: 'movement-analysis-injury-prevention'
      },
      {
        id: 'article-003',
        title: 'Integrating Research into Clinical Practice',
        excerpt: 'Bridging the gap between current research and practical application in orthopedic physical therapy.',
        published_date: '2023-11-20',
        read_time: 10,
        slug: 'research-clinical-practice-integration'
      }
    ],
    upcoming_events: [
      {
        id: 'event-001',
        title: 'Advanced Spine Rehabilitation Workshop',
        date: '2024-02-15',
        time: '9:00 AM - 4:00 PM',
        location: 'Thompson PT Institute',
        type: 'workshop',
        registration_url: 'https://thompsonptinstitute.com/workshops',
        description: 'Comprehensive workshop covering advanced techniques for spine rehabilitation and manual therapy.'
      },
      {
        id: 'event-002',
        title: 'Movement Analysis Webinar Series',
        date: '2024-03-01',
        time: '7:00 PM - 8:30 PM',
        location: 'Online',
        type: 'webinar',
        registration_url: 'https://thompsonptinstitute.com/webinars',
        description: 'Monthly webinar series exploring the latest in movement analysis and injury prevention.'
      }
    ],
    tier_badge: 'Premier Provider',
    verified: true,
    years_experience: 18
  },
  {
    id: 'premier-002',
    tier: 'Premier',
    provider_name: 'Dr. Lisa Park',
    practitioner_type: 'Chiropractor',
    credentials: 'DC, DACBSP, CSCS',
    profile_photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    provider_bio: 'Board-certified sports chiropractor with specialized training in biomechanics and athletic performance optimization. Dr. Park has worked with professional athletes and Olympic competitors, bringing elite-level care to everyday patients. Her integrated approach combines chiropractic care, movement analysis, and performance training to achieve optimal results.',
    clinic_name: 'Park Performance & Wellness Center',
    clinic_street: '789 Wellness Boulevard',
    clinic_city: 'Miami',
    clinic_state: 'Florida',
    clinic_zip: '33101',
    clinic_phone: '(305) 555-0187',
    provider_email: 'dr.park@parkwellness.com',
    clinic_website_url: 'https://parkwellness.com',
    location_map: { lat: 25.7617, lng: -80.1918 },
    provider_accreditations: [
      'Diplomate American Chiropractic Board of Sports Physicians',
      'Certified Strength & Conditioning Specialist',
      'Certified Functional Movement Screen Specialist'
    ],
    insurance_accepted: [
      'Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Cigna', 
      'Humana', 'Florida Blue', 'Medicare'
    ],
    specialties: [
      'Sports Chiropractic', 'Performance Optimization', 'Movement Analysis',
      'Injury Prevention', 'Biomechanics', 'Athletic Training'
    ],
    languages_spoken: ['English', 'Korean'],
    telehealth_available: true,
    accepting_new_patients: true,
    office_hours: {
      'Monday': '6:00 AM - 8:00 PM',
      'Tuesday': '6:00 AM - 8:00 PM',
      'Wednesday': '6:00 AM - 8:00 PM',
      'Thursday': '6:00 AM - 8:00 PM',
      'Friday': '6:00 AM - 6:00 PM',
      'Saturday': '7:00 AM - 3:00 PM',
      'Sunday': '8:00 AM - 2:00 PM'
    },
    social_media: {
      facebook: 'https://facebook.com/parkwellness',
      twitter: 'https://twitter.com/drparkdc',
      linkedin: 'https://linkedin.com/in/lisaparkdc',
      instagram: 'https://instagram.com/parkwellness'
    },
    clinic_gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop'
    ],
    video_intro: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    booking_url: 'https://parkwellness.com/book',
    avg_rating: 4.8,
    testimonials: [
      {
        id: 'test-004',
        patient_name: 'Carlos R.',
        rating: 5,
        text: 'Dr. Park helped me overcome a chronic shoulder injury that was affecting my tennis game. Her approach is thorough and results-driven.',
        date: '2024-01-12',
        verified: true
      },
      {
        id: 'test-005',
        patient_name: 'Amanda T.',
        rating: 5,
        text: 'The best chiropractor I\'ve ever worked with. Dr. Park\'s knowledge of sports medicine is incredible.',
        date: '2024-01-08',
        verified: true
      }
    ],
    faqs: [
      {
        id: 'faq-005',
        question: 'What is your approach to sports injury treatment?',
        answer: 'I use a comprehensive approach that addresses not just the injury, but the underlying movement patterns and biomechanical factors that contributed to it. This includes manual therapy, corrective exercises, and performance optimization strategies.',
        category: 'Treatment Philosophy'
      },
      {
        id: 'faq-006',
        question: 'Do you work with professional athletes?',
        answer: 'Yes, I have extensive experience working with professional and Olympic athletes. However, I bring that same level of expertise and attention to detail to all my patients, regardless of their athletic level.',
        category: 'Experience'
      }
    ],
    published_articles: [
      {
        id: 'article-004',
        title: 'Biomechanical Analysis in Sports Performance',
        excerpt: 'Understanding how proper biomechanics can enhance athletic performance and prevent injuries.',
        published_date: '2024-01-10',
        read_time: 7,
        slug: 'biomechanical-analysis-sports-performance'
      }
    ],
    upcoming_events: [
      {
        id: 'event-003',
        title: 'Athletic Performance Optimization Seminar',
        date: '2024-02-20',
        time: '6:00 PM - 8:00 PM',
        location: 'Park Performance Center',
        type: 'seminar',
        registration_url: 'https://parkwellness.com/events',
        description: 'Learn the latest techniques in athletic performance optimization and injury prevention.'
      }
    ],
    tier_badge: 'Premier Provider',
    verified: true,
    years_experience: 14
  }
  // Note: In a real implementation, this would include all 30 premier providers
];

export const mockProviders = [...freeProviders, ...preferredProviders, ...premierProviders];

// Export by tier for easy access
export const providersByTier = {
  Free: freeProviders,
  Preferred: preferredProviders,
  Premier: premierProviders
};

// Export individual providers for direct access
export const sampleProviders = {
  free: freeProviders[0],
  preferred: preferredProviders[0],
  premier: premierProviders[0]
};