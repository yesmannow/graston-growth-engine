import { FullProviderProfile, Tier } from "@/types";

// Define which fields are required for each tier
const tierRequirements: Record<Tier, (keyof FullProviderProfile)[]> = {
  Free: ['name', 'email', 'profileImage', 'bio'],
  Preferred: ['name', 'email', 'profileImage', 'bio', 'website'],
  Premier: ['name', 'email', 'profileImage', 'bio', 'website', 'socialMedia'],
};

// Labels for fields in the UI
const fieldLabels: Partial<Record<keyof FullProviderProfile, string>> = {
  id: 'ID',
  name: 'Full Name',
  tier: 'Tier',
  membershipTier: 'Membership Tier',
  specialty: 'Specialty',
  location: 'Location',
  bio: 'Bio',
  profileImage: 'Profile Image',
  email: 'Email',
  website: 'Website',
  socialMedia: 'Social Media',
  trainingLevel: 'Training Level',
  coordinates: 'Location Coordinates',
  contactInfo: 'Contact Information',
  servicesOffered: 'Services Offered',
  services: 'Services',
  galleryImages: 'Gallery Images',
  testimonials: 'Testimonials',
  faqs: 'FAQs',
  phone: 'Phone',
  experience: 'Experience',
  education: 'Education',
  churnRisk: 'Churn Risk',
  trialStatus: 'Trial Status',
  certifications: 'Certifications',
  // Add the missing properties
  state: 'State',
  city: 'City',
  zipCode: 'Zip Code',
  clinicianType: 'Clinician Type',
  languagesSpoken: 'Languages Spoken',
  rating: 'Rating',
  reviewCount: 'Review Count',
  activityScore: 'Activity Score'
};

// Calculate profile completion score based on tier requirements
export const calculateProfileScore = (user: FullProviderProfile) => {
  const requirements = tierRequirements[user.membershipTier || user.tier];
  let completedFields = 0;

  requirements.forEach((field: keyof FullProviderProfile) => {
    if (user[field]) {
      completedFields++;
    }
  });

  const score = Math.round((completedFields / requirements.length) * 100);
  let nextAction = '';
  let status = '';

  if (score === 100) {
    status = 'Complete';
    nextAction = 'Your profile is complete!';
  } else if (score >= 80) {
    status = 'Almost Complete';
    nextAction = 'Just a few more fields to complete your profile.';
  } else if (score >= 50) {
    status = 'In Progress';
    nextAction = 'Keep going! Your profile is taking shape.';
  } else {
    const missingFields = requirements.filter((field: keyof FullProviderProfile) => !user[field]);
    if (missingFields.length > 0) {
      const fieldName = fieldLabels[missingFields[0]] || missingFields[0];
      nextAction = `Add your ${fieldName} to improve your score.`;
    } else {
      nextAction = 'Start filling out your profile.';
    }
    status = 'Just Started';
  }

  return {
    score,
    status,
    nextAction
  };
};