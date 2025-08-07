import { FullProviderProfile, Tier, ClinicianType, Language, Condition, PatientDemographic, TrainingLevel } from "@/types";

export const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
export const clinicianTypes: ClinicianType[] = ["Chiropractor", "Physical Therapist", "Athletic Trainer", "Massage Therapist", "Other"];
export const languages: Language[] = ["English", "Spanish", "French", "German", "Mandarin"];
export const radiusOptions = [5, 10, 25, 50, 100];
export const sortOptions = [
  { value: "premier-first", label: "Premier Providers First" },
  { value: "top-rated", label: "Top Rated" },
  { value: "most-reviewed", label: "Most Reviewed" },
];
export const conditions: Condition[] = ["Back Pain", "Neck Pain", "Headaches", "Sports Injuries", "Post-Surgical Rehab"];
export const patientDemographics: PatientDemographic[] = ["Athletes", "Pediatrics", "Geriatrics", "General Population"];

export const mockProviders: FullProviderProfile[] = [
    {
        id: "1",
        name: "Dr. John Doe",
        email: "john.doe@example.com",
        specialty: "Sports Medicine",
        bio: "Dr. John Doe is a certified Graston Technique provider with over 10 years of experience in treating sports-related injuries. He is passionate about helping athletes return to their peak performance.",
        experience: "10 years",
        education: "D.C. from Palmer College of Chiropractic",
        profileImage: "https://i.pravatar.cc/150?u=1",
        phone: "123-456-7890",
        website: "johndoechiro.com",
        location: "San Diego, CA",
        clinicAddress: "123 Wellness Way, San Diego, CA 92101",
        coordinates: { lat: 32.7157, lng: -117.1611 },
        tier: "Premier",
        clinicianType: "Chiropractor",
        gtCertifications: ["GTS", "Advanced"],
        services: ["Spinal Adjustments", "Graston Technique", "Rehabilitation"],
        languagesSpoken: ["English", "Spanish"],
        rating: 4.9,
        reviewCount: 120,
        isFavorite: false,
        trialStatus: "N/A",
        activity: 95,
        churnRisk: false,
        views: 4500,
        engagementScore: 92,
        galleryImages: ["/images/gallery-1.jpg", "/images/gallery-2.jpg"],
        galleryVideos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
        testimonials: [{ quote: "Dr. Doe got me back on the field in record time!", author: "Pro Athlete" }],
        faqs: [{ question: "Do you take insurance?", answer: "Yes, we accept most major insurance plans." }],
    },
    {
        id: "2",
        name: "Dr. Jane Smith",
        email: "jane.smith@example.com",
        specialty: "Physical Therapy",
        bio: "Dr. Jane Smith specializes in post-surgical rehabilitation and chronic pain management. She integrates the Graston Technique to accelerate recovery and improve patient outcomes.",
        experience: "8 years",
        education: "D.P.T. from University of Southern California",
        profileImage: "https://i.pravatar.cc/150?u=2",
        phone: "987-654-3210",
        website: "janesmithpt.com",
        location: "New York, NY",
        clinicAddress: "456 Health Ave, New York, NY 10001",
        coordinates: { lat: 40.7128, lng: -74.0060 },
        tier: "Preferred",
        clinicianType: "Physical Therapist",
        gtCertifications: ["Essential"],
        services: ["Manual Therapy", "Graston Technique", "Therapeutic Exercise"],
        languagesSpoken: ["English"],
        rating: 4.8,
        reviewCount: 85,
        isFavorite: true,
        trialStatus: "Active",
        activity: 78,
        churnRisk: false,
        views: 2800,
        engagementScore: 75,
    },
    // Add more mock providers as needed
];

export const specialties = [...new Set(mockProviders.map(p => p.specialty).filter(Boolean))] as string[];