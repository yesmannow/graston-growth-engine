import { FullProviderProfile, ClinicianType, Language } from "@/types";

export const mockProviders: FullProviderProfile[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    specialty: "Orthopedic Surgery",
    location: "New York, NY",
    bio: "Dr. Johnson is a board-certified orthopedic surgeon specializing in sports medicine and joint replacement. With over 15 years of experience, she has helped countless athletes return to peak performance.",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
    tier: "Premier",
    trainingLevel: "GTS",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    city: "New York",
    state: "NY",
    zipCode: "10001",
    clinicianType: "Medical Doctor" as ClinicianType,
    languagesSpoken: ["English", "Spanish"] as Language[],
    rating: 4.9,
    reviewCount: 127,
    activityScore: 98,
    contactInfo: {
      phone: "(212) 555-1234",
      email: "sarah.johnson@example.com",
      website: "www.drsarahjohnson.com"
    },
    servicesOffered: [
      "Joint Replacement Surgery",
      "Sports Injury Treatment",
      "Arthroscopic Surgery",
      "Physical Therapy"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&h=400&fit=crop"
    ],
    testimonials: [
      { quote: "Dr. Johnson helped me get back on the field after my ACL tear. I couldn't be more grateful!", author: "Michael T., Professional Athlete" },
      { quote: "The knee replacement surgery was a complete success. I'm pain-free for the first time in years.", author: "Eleanor R., Retired Teacher" }
    ],
    faqs: [
      { question: "What insurance plans do you accept?", answer: "We accept most major insurance plans, including Blue Cross, Aetna, and Medicare." },
      { question: "How long is the typical recovery from knee surgery?", answer: "Recovery varies by patient, but most can return to normal activities within 6-8 weeks." }
    ]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    specialty: "Dermatology",
    location: "Los Angeles, CA",
    bio: "Dr. Chen is a dermatologist with expertise in cosmetic procedures, skin cancer treatment, and general dermatology. He is committed to helping patients achieve healthy, beautiful skin.",
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
    tier: "Preferred",
    trainingLevel: "Advanced",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    clinicianType: "Medical Doctor" as ClinicianType,
    languagesSpoken: ["English", "Mandarin"] as Language[],
    rating: 4.7,
    reviewCount: 89,
    activityScore: 85,
    contactInfo: {
      phone: "(310) 555-6789",
      email: "michael.chen@example.com",
      website: "www.drchendermatology.com"
    },
    servicesOffered: [
      "Skin Cancer Screening",
      "Botox and Fillers",
      "Acne Treatment",
      "Laser Therapy"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&h=400&fit=crop"
    ],
    testimonials: [
      { quote: "Dr. Chen's acne treatment plan completely transformed my skin. I feel so much more confident now.", author: "Jessica L., Student" }
    ],
    faqs: [
      { question: "How often should I get a skin cancer screening?", answer: "We recommend annual screenings for most patients, but those with a history of skin cancer or significant sun exposure may need more frequent checks." }
    ]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    specialty: "Pediatrics",
    location: "Chicago, IL",
    bio: "Dr. Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She believes in partnering with families to ensure optimal health outcomes.",
    profileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
    tier: "Free",
    trainingLevel: "Essential",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    clinicianType: "Medical Doctor" as ClinicianType,
    languagesSpoken: ["English", "Spanish"] as Language[],
    rating: 4.8,
    reviewCount: 56,
    activityScore: 72,
    contactInfo: {
      phone: "(773) 555-4321",
      email: "emily.rodriguez@example.com",
      website: "www.chicagokidsdoc.com"
    },
    servicesOffered: [
      "Well-Child Visits",
      "Immunizations",
      "Developmental Assessments",
      "Acute Illness Care"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=600&h=400&fit=crop"
    ],
    testimonials: [
      { quote: "Dr. Rodriguez is amazing with my twins. She takes the time to answer all my questions and makes my children feel comfortable.", author: "Amanda S., Parent" }
    ],
    faqs: [
      { question: "What is your after-hours policy?", answer: "We have a nurse triage line available 24/7 for urgent concerns, and same-day appointments are often available for sick visits." }
    ]
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    specialty: "Cardiology",
    location: "Houston, TX",
    bio: "Dr. Wilson is a cardiologist specializing in preventive cardiology and heart disease management. He uses the latest diagnostic tools and treatments to help patients maintain optimal heart health.",
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop",
    tier: "Premier",
    trainingLevel: "GTS",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    city: "Houston",
    state: "TX",
    zipCode: "77001",
    clinicianType: "Medical Doctor" as ClinicianType,
    languagesSpoken: ["English"] as Language[],
    rating: 4.9,
    reviewCount: 112,
    activityScore: 95,
    contactInfo: {
      phone: "(832) 555-7890",
      email: "james.wilson@example.com",
      website: "www.hearthealth-wilson.com"
    },
    servicesOffered: [
      "Cardiac Stress Testing",
      "Echocardiography",
      "Cholesterol Management",
      "Heart Disease Prevention"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop"
    ],
    testimonials: [
      { quote: "Dr. Wilson's preventive approach helped me avoid a heart attack. His guidance on lifestyle changes has been life-changing.", author: "Robert J., Business Executive" }
    ],
    faqs: [
      { question: "How can I reduce my risk of heart disease?", answer: "Regular exercise, a heart-healthy diet, not smoking, and managing stress are key factors in reducing heart disease risk." }
    ]
  },
  {
    id: "5",
    name: "Dr. Olivia Thompson",
    email: "olivia.thompson@example.com",
    specialty: "Psychiatry",
    location: "Miami, FL",
    bio: "Dr. Thompson is a psychiatrist who provides compassionate mental health care for adults dealing with depression, anxiety, and other psychiatric conditions. She believes in a holistic approach to treatment.",
    profileImage: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop",
    tier: "Preferred",
    trainingLevel: "Advanced",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    clinicianType: "Medical Doctor" as ClinicianType,
    languagesSpoken: ["English", "Spanish"] as Language[],
    rating: 4.6,
    reviewCount: 78,
    activityScore: 82,
    contactInfo: {
      phone: "(305) 555-2345",
      email: "olivia.thompson@example.com",
      website: "www.drolviathompson.com"
    },
    servicesOffered: [
      "Depression Treatment",
      "Anxiety Management",
      "Medication Management",
      "Psychotherapy"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=600&h=400&fit=crop"
    ],
    testimonials: [
      { quote: "Dr. Thompson's approach to treating my anxiety has given me tools I can use for a lifetime. I'm finally feeling like myself again.", author: "Sarah M., Marketing Director" }
    ],
    faqs: [
      { question: "Do you offer telehealth appointments?", answer: "Yes, we offer secure video appointments for both new and established patients." }
    ]
  },
  {
    id: "6",
    name: "Dr. Robert Taylor",
    email: "robert.taylor@example.com",
    specialty: "Physical Therapy",
    location: "Denver, CO",
    bio: "Dr. Taylor is a physical therapist with over 20 years of experience in sports rehabilitation and injury prevention. He specializes in helping athletes recover from injuries and improve performance.",
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
    tier: "Premier",
    trainingLevel: "GTS",
    coordinates: { lat: 39.7392, lng: -104.9903 },
    city: "Denver",
    state: "CO",
    zipCode: "80201",
    clinicianType: "Physical Therapist" as ClinicianType,
    languagesSpoken: ["English", "French"] as Language[],
    rating: 4.9,
    reviewCount: 143,
    activityScore: 97,
    contactInfo: {
      phone: "(303) 555-8765",
      email: "robert.taylor@example.com",
      website: "www.taylorphysicaltherapy.com"
    },
    servicesOffered: [
      "Sports Rehabilitation",
      "Post-Surgical Rehabilitation",
      "Manual Therapy",
      "Injury Prevention"
    ]
  },
  {
    id: "7",
    name: "Dr. Lisa Chang",
    email: "lisa.chang@example.com",
    specialty: "Chiropractic Care",
    location: "Seattle, WA",
    bio: "Dr. Chang is a chiropractor focused on holistic wellness and pain management through spinal adjustments and therapeutic exercises. She has helped hundreds of patients find relief from chronic pain.",
    profileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
    tier: "Preferred",
    trainingLevel: "Advanced",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    clinicianType: "Chiropractor" as ClinicianType,
    languagesSpoken: ["English", "Mandarin"] as Language[],
    rating: 4.7,
    reviewCount: 92,
    activityScore: 84,
    contactInfo: {
      phone: "(206) 555-3456",
      email: "lisa.chang@example.com",
      website: "www.changchiropractic.com"
    },
    servicesOffered: [
      "Spinal Adjustments",
      "Therapeutic Exercise",
      "Posture Correction",
      "Pain Management"
    ]
  },
  {
    id: "8",
    name: "Mark Johnson",
    email: "mark.johnson@example.com",
    specialty: "Sports Massage",
    location: "Portland, OR",
    bio: "Mark is a certified massage therapist specializing in sports massage and myofascial release. He works with athletes of all levels to improve recovery and performance.",
    profileImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&h=300&fit=crop",
    tier: "Free",
    trainingLevel: "Essential",
    coordinates: { lat: 45.5051, lng: -122.6750 },
    city: "Portland",
    state: "OR",
    zipCode: "97201",
    clinicianType: "Massage Therapist" as ClinicianType,
    languagesSpoken: ["English"] as Language[],
    rating: 4.5,
    reviewCount: 47,
    activityScore: 65,
    contactInfo: {
      phone: "(503) 555-9876",
      email: "mark.johnson@example.com",
      website: "www.markjohnsonmassage.com"
    },
    servicesOffered: [
      "Sports Massage",
      "Deep Tissue Massage",
      "Myofascial Release",
      "Recovery Techniques"
    ]
  }
];

export const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export const clinicianTypes: ClinicianType[] = [
  "Chiropractor",
  "Physical Therapist",
  "Occupational Therapist",
  "Athletic Trainer",
  "Massage Therapist",
  "Medical Doctor",
  "Other"
];

export const languages: Language[] = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Arabic",
  "Tagalog",
  "Other"
];

export const radiusOptions: number[] = [5, 10, 25, 50, 100];

export const sortOptions = [
  { value: "closest", label: "Closest First" },
  { value: "top-rated", label: "Top-Rated" },
  { value: "most-active", label: "Most Active" },
  { value: "premier-first", label: "Premier First" },
  { value: "most-reviewed", label: "Most Reviewed" }
];