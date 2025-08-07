import type {
  ClinicianType,
  Language,
  RadiusOption,
  SortOption,
  FullProviderProfile,
  TrainingLevel,
} from "@/types";

// Sample/mock clinicians
export const clinicianTypes: ClinicianType[] = [
  "Physical Therapist",
  "Chiropractor",
  "Massage Therapist",
  "Athletic Trainer",
  "Other",
];

// Supported languages
export const languages: Language[] = [
  "English",
  "Spanish",
  "French",
  "Hindi",
  "Mandarin", // Added Mandarin
] as Language[];

// Map radius options
export const radiusOptions: RadiusOption[] = [10, 25, 50, 100];

// U.S. state abbreviations
export const states: string[] = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

// Sort options for directory
export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "premier-first", label: "Premier First" },
  { value: "top-rated",    label: "Top Rated"    },
  { value: "most-reviewed",label: "Most Reviewed"},
];

// Mock list of providers
export const mockProviders: FullProviderProfile[] = [
  {
    id: "prov_001",
    name: "Dr. Emily White",
    email: "emily.white@example.com",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b716b1772a1?fit=crop&w=100&h=100&q=80",
    specialty: "Sports Medicine",
    clinicianType: "Physical Therapist",
    location: "New York, NY",
    clinicAddress: "123 Main St, New York, NY 10001",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    tier: "Premier",
    trialStatus: "N/A",
    activity: 2500,
    churnRisk: false,
    bio: "Dr. Emily White is a highly experienced physical therapist specializing in sports injury rehabilitation and performance enhancement. With over 15 years of practice, she combines advanced Graston Technique® interventions with personalized exercise programs to help athletes return to their peak performance. Dr. White is passionate about educating her patients and empowering them to take an active role in their recovery journey.",
    experience: "15 years",
    education: "DPT, New York University",
    socialMedia: {
      linkedin: "https://linkedin.com/in/emilywhite",
      facebook: "https://facebook.com/emilywhitept",
      instagram: "https://instagram.com/emilywhitept",
    },
    services: ["Sports Injury Rehab", "Post-Surgical Rehab", "Manual Therapy", "Dry Needling", "Graston Technique"],
    certifications: ["Board-Certified Sports Physical Therapist", "Certified Strength and Conditioning Specialist"],
    gtCertifications: ["GTS", "Advanced"],
    verificationBadges: ["Licensed PT", "Background Checked"],
    accreditationLogos: [
      { name: "APTA", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/American_Physical_Therapy_Association_logo.svg/1200px-American_Physical_Therapy_Association_logo.svg.png", url: "https://www.apta.org/" },
    ],
    languagesSpoken: ["English", "Spanish"],
    patientTypes: ["Athletes", "Adults", "Geriatric"],
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160550-fd428796c875?fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576091160399-c50494367d25?fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576091160550-fd428796c875?fit=crop&w=600&q=80",
    ],
    galleryVideos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"], // Example YouTube embed
    testimonials: [
      { quote: "Dr. White helped me recover from my knee injury faster than I thought possible!", author: "John D." },
      { quote: "Professional, knowledgeable, and truly cares about her patients.", author: "Sarah L." },
    ],
    faqs: [
      { question: "Do you accept insurance?", answer: "We are an out-of-network provider but can provide superbills for reimbursement." },
      { question: "What should I wear to my appointment?", answer: "Comfortable, loose-fitting clothing is recommended." },
    ],
    rating: 4.9,
    reviewCount: 120,
    contactInfo: {
      phone: "(212) 555-1234",
      email: "emily.white@example.com",
      website: "https://www.emilywhitept.com",
    },
    isFavorite: false,
    canCompare: true,
  },
  {
    id: "prov_002",
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cfd2feae?fit=crop&w=100&h=100&q=80",
    specialty: "Chiropractic Care",
    clinicianType: "Chiropractor",
    location: "Los Angeles, CA",
    clinicAddress: "456 Oak Ave, Los Angeles, CA 90012",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    tier: "Preferred",
    trialStatus: "N/A",
    activity: 1800,
    churnRisk: false,
    bio: "Dr. Michael Chen is a dedicated chiropractor focused on holistic wellness and pain management. He utilizes Graston Technique® as part of a comprehensive approach to treat musculoskeletal conditions, improve mobility, and enhance overall patient well-being. Dr. Chen believes in empowering his patients through education and personalized care plans.",
    experience: "10 years",
    education: "DC, Southern California University of Health Sciences",
    socialMedia: {
      facebook: "https://facebook.com/michaelchenchiro",
    },
    services: ["Spinal Adjustments", "Graston Technique", "Rehabilitative Exercises", "Nutritional Counseling"],
    certifications: ["Certified Chiropractic Sports Physician"],
    gtCertifications: ["Essential"],
    verificationBadges: ["Licensed DC"],
    accreditationLogos: [],
    languagesSpoken: ["English", "Mandarin"], // Corrected type
    patientTypes: ["Adults", "Athletes"],
    galleryImages: [
      "https://images.unsplash.com/photo-1584820927478-b00bce69d128?fit=crop&w=600&q=80",
    ],
    testimonials: [
      { quote: "My back pain is gone thanks to Dr. Chen!", author: "Maria S." },
    ],
    faqs: [],
    rating: 4.7,
    reviewCount: 85,
    contactInfo: {
      phone: "(310) 555-5678",
      email: "michael.chen@example.com",
      website: "https://www.michaelchenchiro.com",
    },
    isFavorite: false,
    canCompare: true,
  },
  {
    id: "prov_003",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100&q=80",
    specialty: "Massage Therapy",
    clinicianType: "Massage Therapist",
    location: "Chicago, IL",
    clinicAddress: "789 Pine Ln, Chicago, IL 60601",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    tier: "Free",
    trialStatus: "Active",
    activity: 500,
    churnRisk: true,
    bio: "Sarah Johnson is a licensed massage therapist offering therapeutic and deep tissue massage. She incorporates Graston Technique® to address soft tissue restrictions and enhance recovery for her clients. Sarah is committed to providing a relaxing and effective treatment experience.",
    experience: "7 years",
    education: "Licensed Massage Therapist",
    socialMedia: {},
    services: ["Deep Tissue Massage", "Sports Massage", "Graston Technique", "Relaxation Massage"],
    certifications: [],
    gtCertifications: ["Essential"],
    verificationBadges: ["Licensed MT"],
    accreditationLogos: [],
    languagesSpoken: ["English"],
    patientTypes: ["Adults"],
    galleryImages: [],
    testimonials: [],
    faqs: [],
    rating: 4.5,
    reviewCount: 30,
    contactInfo: {
      phone: "(312) 555-9876",
      email: "sarah.j@example.com",
      website: "https://www.sarahjohnsonmassage.com",
    },
    isFavorite: false,
    canCompare: false,
  },
  {
    id: "prov_004",
    name: "Dr. David Lee",
    email: "david.lee@example.com",
    profileImage: "https://images.unsplash.com/photo-1507003211169-e69adba17077?fit=crop&w=100&h=100&q=80",
    specialty: "Orthopedic Rehabilitation",
    clinicianType: "Physical Therapist",
    location: "Houston, TX",
    clinicAddress: "101 Elm Rd, Houston, TX 77002",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    tier: "Premier",
    trialStatus: "N/A",
    activity: 3000,
    churnRisk: false,
    bio: "Dr. David Lee is a board-certified orthopedic physical therapist with a passion for helping patients overcome complex musculoskeletal issues. He integrates Graston Technique® with advanced therapeutic exercises and manual therapy to achieve optimal outcomes. Dr. Lee is committed to evidence-based practice and continuous professional development.",
    experience: "18 years",
    education: "DPT, University of Texas Medical Branch",
    socialMedia: {
      linkedin: "https://linkedin.com/in/davidleept",
    },
    services: ["Orthopedic Rehab", "Spine Therapy", "Graston Technique", "Post-Operative Care"],
    certifications: ["Board-Certified Orthopedic Physical Therapist"],
    gtCertifications: ["GTS", "Advanced"],
    verificationBadges: ["Licensed PT", "Board Certified"],
    accreditationLogos: [
      { name: "AAOS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/American_Academy_of_Orthopaedic_Surgeons_logo.svg/1200px-American_Academy_of_Orthopaedic_Surgeons_logo.svg.png", url: "https://www.aaos.org/" },
    ],
    languagesSpoken: ["English"],
    patientTypes: ["Adults", "Athletes", "Post-Surgical"],
    galleryImages: [
      "https://images.unsplash.com/photo-1576091160550-fd428796c875?fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576091160399-c50494367d25?fit=crop&w=600&q=80",
    ],
    testimonials: [
      { quote: "Exceptional care and results. Highly recommend Dr. Lee!", author: "Emily R." },
    ],
    faqs: [
      { question: "What is Graston Technique?", answer: "Graston Technique is an innovative, instrument-assisted soft tissue mobilization that enables clinicians to effectively address scar tissue and fascial restrictions." },
    ],
    rating: 5.0,
    reviewCount: 150,
    contactInfo: {
      phone: "(713) 555-4321",
      email: "david.lee@example.com",
      website: "https://www.davidleept.com",
    },
    isFavorite: false,
    canCompare: true,
  },
];