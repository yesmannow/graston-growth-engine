import { FullProviderProfile } from "@/types";

export const mockProviders: FullProviderProfile[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    specialty: "Physical Therapy",
    location: "New York, NY",
    bio: "Experienced physical therapist specializing in sports injuries and rehabilitation.",
    profileScore: 85,
    membershipTier: "Premier",
    tier: "Premier",
    joinDate: "2023-01-15",
    lastActive: "2024-01-20",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    website: "https://drjohnsonpt.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/sarahjohnsonpt",
      facebook: "https://facebook.com/drjohnsonpt"
    },
    services: [
      "Sports Injury Rehabilitation",
      "Manual Therapy",
      "Movement Analysis",
      "Post-Surgical Recovery"
    ],
    certifications: [
      "Licensed Physical Therapist",
      "Certified Strength and Conditioning Specialist",
      "Dry Needling Certification"
    ],
    experience: "12 years",
    education: "Doctor of Physical Therapy, Columbia University",
    trialStatus: "N/A",
    activity: 1200,
    churnRisk: false,
    first_name: "Sarah",
    last_name: "Johnson"
  },
  {
    id: "2", 
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 987-6543",
    specialty: "Chiropractic Care",
    location: "Los Angeles, CA",
    bio: "Board-certified chiropractor focused on holistic wellness and pain management.",
    profileScore: 92,
    membershipTier: "Premier",
    tier: "Premier",
    joinDate: "2022-08-10",
    lastActive: "2024-01-19",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    website: "https://drchenwellness.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/michaelchenwellness",
      instagram: "https://instagram.com/drchenwellness"
    },
    services: [
      "Spinal Adjustments",
      "Soft Tissue Therapy",
      "Wellness Coaching",
      "Nutritional Counseling"
    ],
    certifications: [
      "Doctor of Chiropractic",
      "Certified Functional Medicine Practitioner",
      "Active Release Technique Certified"
    ],
    experience: "8 years",
    education: "Doctor of Chiropractic, Palmer College of Chiropractic",
    trialStatus: "N/A",
    activity: 800,
    churnRisk: false,
    first_name: "Michael",
    last_name: "Chen"
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com", 
    phone: "(555) 456-7890",
    specialty: "Massage Therapy",
    location: "Miami, FL",
    bio: "Licensed massage therapist specializing in therapeutic and relaxation techniques.",
    profileScore: 78,
    membershipTier: "Preferred",
    tier: "Preferred",
    joinDate: "2023-06-20",
    lastActive: "2024-01-18",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1594824388853-e0c8b8b0b6e5?w=400&h=400&fit=crop&crop=face",
    website: "https://rodrigueztherapy.com",
    socialMedia: {
      facebook: "https://facebook.com/rodrigueztherapy",
      instagram: "https://instagram.com/rodrigueztherapy"
    },
    services: [
      "Deep Tissue Massage",
      "Swedish Massage", 
      "Trigger Point Therapy",
      "Prenatal Massage"
    ],
    certifications: [
      "Licensed Massage Therapist",
      "Certified Myofascial Release Therapist",
      "Prenatal Massage Certification"
    ],
    experience: "6 years",
    education: "Massage Therapy Diploma, Miami School of Massage",
    trialStatus: "Active",
    activity: 350,
    churnRisk: false,
    first_name: "Emily",
    last_name: "Rodriguez"
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    phone: "(555) 234-5678",
    specialty: "Orthopedic Surgery",
    location: "Chicago, IL",
    bio: "Board-certified orthopedic surgeon with expertise in joint replacement and sports medicine.",
    profileScore: 95,
    membershipTier: "Premier",
    tier: "Premier",
    joinDate: "2021-03-12",
    lastActive: "2024-01-21",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    website: "https://wilsonorthopedics.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/drjameswilson",
      twitter: "https://twitter.com/drwilsonortho"
    },
    services: [
      "Joint Replacement Surgery",
      "Arthroscopic Surgery",
      "Sports Medicine",
      "Fracture Care"
    ],
    certifications: [
      "Board Certified Orthopedic Surgeon",
      "Fellowship in Sports Medicine",
      "Arthroscopy Certification"
    ],
    experience: "15 years",
    education: "MD, Harvard Medical School",
    trialStatus: "N/A",
    activity: 1500,
    churnRisk: false,
    first_name: "James",
    last_name: "Wilson"
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    email: "lisa.thompson@example.com",
    phone: "(555) 345-6789",
    specialty: "Dermatology",
    location: "Phoenix, AZ",
    bio: "Dermatologist specializing in cosmetic and medical dermatology treatments.",
    profileScore: 88,
    membershipTier: "Premier",
    tier: "Premier",
    joinDate: "2022-11-08",
    lastActive: "2024-01-20",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1594824388853-e0c8b8b0b6e5?w=400&h=400&fit=crop&crop=face",
    website: "https://thompsondermatology.com",
    socialMedia: {
      instagram: "https://instagram.com/drlisathompson",
      facebook: "https://facebook.com/thompsondermatology"
    },
    services: [
      "Botox & Fillers",
      "Laser Treatments",
      "Skin Cancer Screening",
      "Acne Treatment"
    ],
    certifications: [
      "Board Certified Dermatologist",
      "Cosmetic Dermatology Fellowship",
      "Mohs Surgery Certified"
    ],
    experience: "10 years",
    education: "MD, Stanford University School of Medicine",
    trialStatus: "N/A",
    activity: 950,
    churnRisk: false,
    first_name: "Lisa",
    last_name: "Thompson"
  },
  {
    id: "6",
    name: "Dr. Robert Martinez",
    email: "robert.martinez@example.com",
    phone: "(555) 456-7890",
    specialty: "Cardiology",
    location: "Houston, TX",
    bio: "Interventional cardiologist with focus on minimally invasive cardiac procedures.",
    profileScore: 72,
    membershipTier: "Preferred",
    tier: "Preferred",
    joinDate: "2023-04-22",
    lastActive: "2024-01-19",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    website: "https://martinezcardiology.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/drrobertmartinez"
    },
    services: [
      "Cardiac Catheterization",
      "Angioplasty",
      "Stent Placement",
      "Heart Disease Prevention"
    ],
    certifications: [
      "Board Certified Cardiologist",
      "Interventional Cardiology Fellowship",
      "Nuclear Cardiology Certification"
    ],
    experience: "14 years",
    education: "MD, Baylor College of Medicine",
    trialStatus: "Active",
    activity: 680,
    churnRisk: true,
    first_name: "Robert",
    last_name: "Martinez"
  },
  {
    id: "7",
    name: "Dr. Amanda Foster",
    email: "amanda.foster@example.com",
    phone: "(555) 567-8901",
    specialty: "Pediatrics",
    location: "Seattle, WA",
    bio: "Pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.",
    profileScore: 91,
    membershipTier: "Premier",
    tier: "Premier",
    joinDate: "2021-09-15",
    lastActive: "2024-01-21",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    website: "https://fosterpediatrics.com",
    socialMedia: {
      facebook: "https://facebook.com/fosterpediatrics",
      instagram: "https://instagram.com/drfosterpeds"
    },
    services: [
      "Well-Child Visits",
      "Immunizations",
      "Developmental Assessments",
      "Sick Child Care"
    ],
    certifications: [
      "Board Certified Pediatrician",
      "Pediatric Advanced Life Support",
      "Lactation Consultant"
    ],
    experience: "9 years",
    education: "MD, University of Washington School of Medicine",
    trialStatus: "N/A",
    activity: 1100,
    churnRisk: false,
    first_name: "Amanda",
    last_name: "Foster"
  },
  {
    id: "8",
    name: "Dr. Kevin Park",
    email: "kevin.park@example.com",
    phone: "(555) 678-9012",
    specialty: "Dentistry",
    location: "San Francisco, CA",
    bio: "General dentist providing comprehensive dental care with a focus on preventive dentistry.",
    profileScore: 65,
    membershipTier: "Free",
    tier: "Free",
    joinDate: "2023-08-30",
    lastActive: "2024-01-17",
    verified: false,
    profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    services: [
      "Routine Cleanings",
      "Fillings",
      "Root Canals",
      "Teeth Whitening"
    ],
    certifications: [
      "Doctor of Dental Surgery",
      "CPR Certified"
    ],
    experience: "5 years",
    education: "DDS, University of California San Francisco",
    trialStatus: "Expired",
    activity: 120,
    churnRisk: true,
    first_name: "Kevin",
    last_name: "Park"
  },
  {
    id: "9",
    name: "Dr. Rachel Green",
    email: "rachel.green@example.com",
    phone: "(555) 789-0123",
    specialty: "Psychology",
    location: "Boston, MA",
    bio: "Clinical psychologist specializing in cognitive behavioral therapy and anxiety disorders.",
    profileScore: 83,
    membershipTier: "Preferred",
    tier: "Preferred",
    joinDate: "2022-12-05",
    lastActive: "2024-01-20",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1594824388853-e0c8b8b0b6e5?w=400&h=400&fit=crop&crop=face",
    website: "https://greenpsychology.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/drrachelgreen",
      twitter: "https://twitter.com/drrachelgreen"
    },
    services: [
      "Individual Therapy",
      "Cognitive Behavioral Therapy",
      "Anxiety Treatment",
      "Depression Counseling"
    ],
    certifications: [
      "Licensed Clinical Psychologist",
      "CBT Certification",
      "Trauma-Informed Care"
    ],
    experience: "11 years",
    education: "PhD in Clinical Psychology, Boston University",
    trialStatus: "Active",
    activity: 420,
    churnRisk: false,
    first_name: "Rachel",
    last_name: "Green"
  },
  {
    id: "10",
    name: "Dr. Thomas Lee",
    email: "thomas.lee@example.com",
    phone: "(555) 890-1234",
    specialty: "Ophthalmology",
    location: "Atlanta, GA",
    bio: "Ophthalmologist specializing in cataract surgery and retinal diseases.",
    profileScore: 89,
    membershipTier: "Premier",
    tier: "Premier",
    joinDate: "2021-07-18",
    lastActive: "2024-01-19",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    website: "https://leeeyecare.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/drthomaslee",
      facebook: "https://facebook.com/leeeyecare"
    },
    services: [
      "Cataract Surgery",
      "Retinal Treatments",
      "Glaucoma Management",
      "LASIK Surgery"
    ],
    certifications: [
      "Board Certified Ophthalmologist",
      "Retinal Surgery Fellowship",
      "LASIK Certification"
    ],
    experience: "13 years",
    education: "MD, Emory University School of Medicine",
    trialStatus: "N/A",
    activity: 1050,
    churnRisk: false,
    first_name: "Thomas",
    last_name: "Lee"
  },
  {
    id: "11",
    name: "Dr. Maria Gonzalez",
    email: "maria.gonzalez@example.com",
    phone: "(555) 901-2345",
    specialty: "Family Medicine",
    location: "Denver, CO",
    bio: "Family physician providing comprehensive primary care for patients of all ages.",
    profileScore: 76,
    membershipTier: "Preferred",
    tier: "Preferred",
    joinDate: "2023-02-14",
    lastActive: "2024-01-18",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    website: "https://gonzalezfamilymed.com",
    socialMedia: {
      facebook: "https://facebook.com/gonzalezfamilymed"
    },
    services: [
      "Annual Physicals",
      "Chronic Disease Management",
      "Preventive Care",
      "Minor Procedures"
    ],
    certifications: [
      "Board Certified Family Medicine",
      "Advanced Cardiac Life Support",
      "Diabetes Education"
    ],
    experience: "7 years",
    education: "MD, University of Colorado School of Medicine",
    trialStatus: "Active",
    activity: 380,
    churnRisk: false,
    first_name: "Maria",
    last_name: "Gonzalez"
  },
  {
    id: "12",
    name: "Dr. David Kim",
    email: "david.kim@example.com",
    phone: "(555) 012-3456",
    specialty: "Neurology",
    location: "Portland, OR",
    bio: "Neurologist specializing in movement disorders and epilepsy treatment.",
    profileScore: 94,
    membershipTier: "Premier",
    tier: "Premier",
    joinDate: "2020-10-22",
    lastActive: "2024-01-21",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    website: "https://kimneurology.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/drdavidkim",
      twitter: "https://twitter.com/drdavidkim"
    },
    services: [
      "Epilepsy Treatment",
      "Movement Disorder Care",
      "Neurological Consultations",
      "EEG Interpretation"
    ],
    certifications: [
      "Board Certified Neurologist",
      "Epilepsy Fellowship",
      "Movement Disorders Fellowship"
    ],
    experience: "16 years",
    education: "MD, Oregon Health & Science University",
    trialStatus: "N/A",
    activity: 1300,
    churnRisk: false,
    first_name: "David",
    last_name: "Kim"
  }
];

// Mock data for admin dashboard
export const mockMetrics = {
  totalProviders: 1247,
  activeProviders: 1089,
  newThisMonth: 23,
  churnRisk: 15,
  tierCounts: {
    premier: 456,
    preferred: 633,
    basic: 158
  }
};

// Mock leads data for testing
export const mockLeads = [
  {
    id: 1,
    first_name: "John",
    last_name: "Smith", 
    email: "john.smith@example.com",
    created_at: "2024-01-20T10:30:00Z"
  },
  {
    id: 2,
    first_name: "Maria",
    last_name: "Garcia",
    email: "maria.garcia@example.com", 
    created_at: "2024-01-19T14:15:00Z"
  },
  {
    id: 3,
    first_name: "David",
    last_name: "Wilson",
    email: "david.wilson@example.com",
    created_at: "2024-01-18T09:45:00Z"
  }
];