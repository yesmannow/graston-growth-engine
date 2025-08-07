import { FullProviderProfile, Language, ClinicianType, RadiusOption, SortOption, Tier, TrainingLevel } from '@/types';

export const languages: Language[] = [
  "English", "Spanish", "French", "German", "Mandarin", "Arabic"
];

export const states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export const clinicianTypes: ClinicianType[] = [
    "Chiropractor", "Physical Therapist", "Athletic Trainer", "Massage Therapist", "Medical Doctor", "Other"
];

export const radiusOptions: RadiusOption[] = [5, 10, 25, 50, 100];

export const sortOptions: { value: SortOption, label: string }[] = [
    { value: 'premier-first', label: 'Premier First' },
    { value: 'closest', label: 'Closest' },
    { value: 'top-rated', label: 'Top Rated' },
    { value: 'most-active', label: 'Most Active' },
    { value: 'most-reviewed', label: 'Most Reviewed' },
];

export const mockProviders: FullProviderProfile[] = [
  {
    id: '123',
    name: 'Dr. John Doe',
    email: 'john.doe@example.com',
    tier: 'Premier',
    trialStatus: 'N/A',
    activity: 150,
    churnRisk: false,
    profileImage: 'https://i.pravatar.cc/150?u=123',
    specialty: 'Physical Therapy',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    bio: 'Dr. John Doe is a premier provider with over 10 years of experience in physical therapy, specializing in the Graston Technique for sports injuries and post-surgical rehabilitation. He is dedicated to providing personalized care to help patients achieve their functional goals.',
    experience: '10 years',
    education: 'DPT, New York University',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoept'
    },
    services: ['Sports Injury Rehab', 'Post-Surgical Rehab', 'Manual Therapy'],
    certifications: ['OCS', 'CSCS', 'Graston Technique Certified'],
    clinicianType: 'Physical Therapist',
    rating: 4.9,
    reviewCount: 88,
    languagesSpoken: ['English', 'Spanish'],
    contactInfo: {
      phone: '(555) 123-4567',
      website: 'https://johndoept.com',
      email: 'contact@johndoept.com'
    },
    coordinates: { lat: 40.7128, lng: -74.0060 },
    city: 'New York',
    state: 'New York',
    zipCode: '10001',
    trainingLevel: 'Advanced',
    activityScore: 95,
    servicesOffered: ['Manual Therapy', 'Graston Technique', 'Dry Needling', 'Kinesio Taping'],
    galleryImages: ['https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'],
    testimonials: [
        { quote: 'Dr. Doe is a miracle worker! My shoulder feels better than ever.', author: 'Jane S.' },
        { quote: 'The best physical therapist in New York. Highly recommended.', author: 'Mike R.' }
    ],
    faqs: [
        { question: 'Do you accept insurance?', answer: 'Yes, we accept most major insurance plans. Please call our office to verify your coverage.' },
        { question: 'What should I wear to my appointment?', answer: 'Please wear comfortable, loose-fitting clothing that allows access to the area we will be treating.' }
    ]
  },
  {
    id: '456',
    name: 'Dr. Jane Smith',
    email: 'jane.smith@example.com',
    tier: 'Preferred',
    trialStatus: 'Active',
    activity: 75,
    churnRisk: true,
    profileImage: 'https://i.pravatar.cc/150?u=456',
    specialty: 'Chiropractic',
    phone: '(555) 987-6543',
    location: 'Los Angeles, CA',
    bio: 'Dr. Jane Smith is a preferred provider specializing in chiropractic care and wellness. She is passionate about helping patients live pain-free lives through holistic and evidence-based treatments.',
    experience: '5 years',
    education: 'DC, Palmer College of Chiropractic',
    socialMedia: {
        instagram: 'https://instagram.com/drjanesmith'
    },
    services: ['Spinal Adjustment', 'Pain Management', 'Wellness Coaching'],
    certifications: ['ART', 'Graston Technique Certified'],
    clinicianType: 'Chiropractor',
    rating: 4.7,
    reviewCount: 45,
    languagesSpoken: ['English', 'German'],
    contactInfo: {
      phone: '(555) 987-6543',
      website: 'https://janesmithdc.com',
      email: 'info@janesmithdc.com'
    },
    coordinates: { lat: 34.0522, lng: -118.2437 },
    city: 'Los Angeles',
    state: 'California',
    zipCode: '90001',
    trainingLevel: 'Essential',
    activityScore: 60,
    servicesOffered: ['Graston Technique', 'Spinal Decompression'],
    galleryImages: ['https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400'],
    testimonials: [{ quote: 'Dr. Smith really listens and provides excellent care.', author: 'Chris P.' }],
    faqs: [{ question: 'What is the Graston Technique?', answer: 'It is a form of instrument-assisted soft tissue mobilization that enables clinicians to effectively break down scar tissue and fascial restrictions.' }]
  }
];