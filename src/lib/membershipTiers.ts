import { FullProviderProfile, Tier } from "@/types";

// Helper to get nested property
function getNestedProperty(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Define required fields for each tier using dot notation for nested properties
const requiredProfileFields: Record<Tier, string[]> = {
  Free: ['name', 'email', 'profileImage', 'bio', 'specialty', 'location'],
  Preferred: ['name', 'email', 'profileImage', 'bio', 'specialty', 'location', 'contactInfo.phone', 'contactInfo.website', 'services'],
  Premier: ['name', 'email', 'profileImage', 'bio', 'specialty', 'location', 'contactInfo.phone', 'contactInfo.website', 'services', 'socialMedia', 'certifications'],
};

// Labels for profile fields, using dot notation for nested properties
const fieldLabels: Record<string, string> = {
  name: 'Full Name',
  email: 'Email',
  profileImage: 'Profile Image',
  bio: 'Professional Bio',
  specialty: 'Specialty',
  location: 'Location',
  'contactInfo.phone': 'Phone Number',
  'contactInfo.website': 'Website URL',
  services: 'Services Offered',
  socialMedia: 'Social Media Links',
  certifications: 'Certifications',
};

export const calculateProfileScore = (user: FullProviderProfile) => {
  let completedFields = 0;
  const requiredFields = requiredProfileFields[user.tier];

  const missingFields: string[] = [];

  requiredFields.forEach(fieldPath => {
    const value = getNestedProperty(user, fieldPath);
    
    // Check if the value is defined, not null, not an empty string, not an empty array, and not an empty object
    if (value !== undefined && value !== null && value !== '' &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && Object.keys(value).length === 0)) {
      completedFields++;
    } else {
      missingFields.push(fieldLabels[fieldPath] || fieldPath);
    }
  });

  const score = Math.round((completedFields / requiredFields.length) * 100);

  let nextAction = '';
  if (score < 100) {
    nextAction = `Complete your profile to reach 100%. Missing: ${missingFields.join(', ')}.`;
  } else {
    nextAction = 'Your profile is 100% complete!';
  }

  return { score, nextAction };
};