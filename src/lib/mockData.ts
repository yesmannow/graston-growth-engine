import { FullProviderProfile, Tier, ClinicianType, Language, Condition, PatientDemographic, SortOption, RadiusOption, TrainingLevel } from '@/types/index';

export const mockProviders: FullProviderProfile[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Sports Medicine & Rehabilitation",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    location: "New York, NY",
    clinicAddress: "123 Medical Plaza, New York, NY 10001",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    tier: "Premier" as Tier,
    clinicianType: "Physical Therapist" as ClinicianType,
    languagesSpoken: ["English", "Spanish"] as Language[],
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    website: "https://drjohnsonpt.com",
    bio: "Dr. Sarah Johnson is a board-certified physical therapist specializing in sports medicine and rehabilitation. With over 15 years of experience, she has helped countless athletes return to peak performance using the Graston Technique.",
    trialStatus: "Active",
    activity: 95,
    churnRisk: false,
    rating: 4.9,
    reviewCount: 127,
    isFavorite: false,
    engagementScore: 92,
    views: 1247,
    can_compare: true,
    linkedin: "https://linkedin.com/in/sarahjohnsonpt",
    twitter: "https://twitter.com/drjohnsonpt",
    instagram: "https://instagram.com/drjohnsonpt",
    experience: "15 years",
    education: "DPT, Columbia University",
    certifications: ["Graston Technique", "Dry Needling", "Manual Therapy"],
    conditionsTreated: ["Back Pain", "Shoulder Pain", "Knee Pain"] as Condition[],
    patientTypes: ["Adults", "Athletes"] as PatientDemographic[],
    trainingLevel: "GTS" as TrainingLevel,
    services: ["Graston Technique", "Sports Rehabilitation", "Manual Therapy", "Injury Prevention"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
      },
      {
        type: "image", 
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
      }
    ],
    testimonials: [
      {
        author: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        text: "Dr. Johnson helped me recover from a shoulder injury that had been bothering me for months. The Graston Technique was incredibly effective.",
        rating: 5
      },
      {
        author: "Lisa Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        text: "Professional, knowledgeable, and caring. I highly recommend Dr. Johnson for anyone dealing with sports injuries.",
        rating: 5
      }
    ],
    faqs: [
      {
        question: "What conditions do you treat with the Graston Technique?",
        answer: "I treat a wide range of conditions including tendinitis, muscle strains, ligament sprains, and scar tissue adhesions."
      },
      {
        question: "How many sessions are typically needed?",
        answer: "Treatment duration varies by condition, but most patients see improvement within 4-6 sessions."
      }
    ]
  },
  {
    id: "2", 
    name: "Dr. Michael Chen",
    specialty: "Orthopedic Manual Therapy",
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    location: "Los Angeles, CA",
    clinicAddress: "456 Wellness Center, Los Angeles, CA 90210",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    tier: "Preferred" as Tier,
    clinicianType: "Chiropractor" as ClinicianType,
    languagesSpoken: ["English", "Mandarin"] as Language[],
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    website: "https://drchenorthopedic.com",
    bio: "Dr. Michael Chen combines traditional chiropractic care with modern techniques including the Graston Technique to provide comprehensive orthopedic treatment.",
    trialStatus: "Active",
    activity: 87,
    churnRisk: false,
    rating: 4.7,
    reviewCount: 89,
    isFavorite: true,
    engagementScore: 78,
    views: 892,
    can_compare: true,
    experience: "12 years",
    education: "DC, Palmer College of Chiropractic",
    certifications: ["Graston Technique", "Active Release Technique"],
    conditionsTreated: ["Back Pain", "Neck Pain"] as Condition[],
    patientTypes: ["Adults", "Seniors"] as PatientDemographic[],
    trainingLevel: "Advanced" as TrainingLevel,
    services: ["Graston Technique", "Chiropractic Care", "Orthopedic Assessment"],
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
      }
    ],
    testimonials: [
      {
        author: "Jennifer Walsh",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        text: "Dr. Chen's approach to treatment is thorough and effective. My back pain is completely gone!",
        rating: 5
      }
    ],
    faqs: [
      {
        question: "Do you accept insurance?",
        answer: "Yes, we accept most major insurance plans. Please contact our office to verify your coverage."
      }
    ]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez", 
    specialty: "Pediatric Physical Therapy",
    profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    location: "Chicago, IL",
    clinicAddress: "789 Children's Health Center, Chicago, IL 60601",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    tier: "Free" as Tier,
    clinicianType: "Physical Therapist" as ClinicianType,
    languagesSpoken: ["English", "Spanish"] as Language[],
    email: "emily.rodriguez@example.com",
    phone: "(555) 345-6789", 
    website: "https://pediatricpt-rodriguez.com",
    bio: "Dr. Emily Rodriguez specializes in pediatric physical therapy and has extensive training in the Graston Technique for treating children and adolescents.",
    trialStatus: "Trial",
    activity: 65,
    churnRisk: true,
    rating: 4.8,
    reviewCount: 45,
    isFavorite: false,
    engagementScore: 58,
    views: 432,
    can_compare: true,
    experience: "8 years",
    education: "DPT, Northwestern University",
    certifications: ["Pediatric Graston Technique"],
    conditionsTreated: ["Back Pain", "Knee Pain"] as Condition[],
    patientTypes: ["Children"] as PatientDemographic[],
    trainingLevel: "Essential" as TrainingLevel,
    services: ["Pediatric Graston Technique", "Developmental Therapy", "Sports Injury Prevention"],
    media: [],
    testimonials: [
      {
        author: "Maria Santos",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        text: "Dr. Rodriguez was amazing with my 12-year-old son. She made him feel comfortable throughout the treatment.",
        rating: 5
      }
    ],
    faqs: [
      {
        question: "At what age can children receive Graston Technique treatment?",
        answer: "Children as young as 8 years old can safely receive modified Graston Technique treatment under proper supervision."
      }
    ]
  }
];

// Export all the missing constants
export const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export const clinicianTypes: ClinicianType[] = [
  'Physical Therapist',
  'Chiropractor', 
  'Massage Therapist',
  'Athletic Trainer',
  'Occupational Therapist'
];

export const languages: Language[] = [
  'English',
  'Spanish',
  'French',
  'German',
  'Mandarin',
  'Japanese',
  'Portuguese',
  'Italian'
];

export const radiusOptions: RadiusOption[] = [5, 10, 25, 50, 100];

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'premier-first', label: 'Premier First' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'most-reviewed', label: 'Most Reviewed' }
];

export const conditions: Condition[] = [
  'Back Pain',
  'Neck Pain',
  'Shoulder Pain',
  'Knee Pain',
  'Hip Pain',
  'Ankle Pain',
  'Carpal Tunnel',
  'Tennis Elbow',
  'Plantar Fasciitis',
  'Sciatica'
];

export const patientDemographics: PatientDemographic[] = [
  'Adults',
  'Seniors',
  'Children',
  'Athletes',
  'Post-Surgery',
  'Chronic Pain',
  'Work Injuries',
  'Auto Accidents'
];

export const specialties = [
  'Sports Medicine & Rehabilitation',
  'Orthopedic Manual Therapy',
  'Pediatric Physical Therapy',
  'Geriatric Care',
  'Neurological Rehabilitation',
  'Women\'s Health',
  'Hand Therapy',
  'Aquatic Therapy'
];