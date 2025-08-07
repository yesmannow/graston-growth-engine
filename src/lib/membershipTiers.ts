import { FullProviderProfile, Tier } from "@/types";

// Define which fields are required for each tier to be considered "complete"
const tierRequirements: Record<Tier, (keyof FullProviderProfile)[]> = {
  Free: ['name', 'email', 'profileImage', 'bio', 'specialty', 'location'],
  Preferred: ['name', 'email', 'profileImage', 'bio', 'specialty', 'location', 'phone', 'website', 'services'],
  Premier: ['name', 'email', 'profileImage', 'bio', 'specialty', 'location', 'phone', 'website', 'services', 'socialMedia', 'certifications'],
};

// User-friendly labels for profile fields
const fieldLabels: Partial<Record<keyof FullProviderProfile, string>> = {
  name: 'Full Name',
  email: 'Email Address',
  profileImage: 'Profile Image',
  bio: 'Professional Bio',
  specialty: 'Specialty',
  location: 'Location',
  phone: 'Phone Number',
  website: 'Website URL',
  services: 'Services Offered',
  socialMedia: 'Social Media Links',
  certifications: 'Certifications',
};

/**
 * Checks if a value is considered "filled"
 * @param value The value to check
 * @returns True if the value is not empty, false otherwise
 */
const isFieldFilled = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return false;
  }
  return true;
};

/**
 * Calculates the profile completion score based on the user's tier.
 * @param user The full provider profile object.
 * @returns An object containing the score and the next recommended action.
 */
export const calculateProfileScore = (user: FullProviderProfile) => {
  const requirements = tierRequirements[user.tier];
  if (!requirements) {
    return { score: 0, nextAction: "Invalid membership tier." };
  }

  let completedFields = 0;
  const missingFields: (keyof FullProviderProfile)[] = [];

  for (const field of requirements) {
    if (isFieldFilled(user[field])) {
      completedFields++;
    } else {
      missingFields.push(field);
    }
  }

  const score = Math.round((completedFields / requirements.length) * 100);

  let nextAction = "Your profile is complete for your tier!";
  if (missingFields.length > 0) {
    const fieldName = fieldLabels[missingFields[0]] || missingFields[0];
    nextAction = `Add your ${fieldName} to improve your score.`;
  }

  return { score, nextAction };
};