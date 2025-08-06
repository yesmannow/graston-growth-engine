export type MembershipTier = 'Free' | 'Preferred' | 'Premier';

// Mock user profile data structure
export interface UserProfile {
  tier: MembershipTier;
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_image?: string;
  bio?: string;
  website_url?: string;
  booking_url?: string; // Preferred+
  video_url?: string; // Premier only
  social_media_links?: object; // Premier only
}

// Define required fields for each tier
export const tierFields: Record<MembershipTier, (keyof UserProfile)[] > = {
  Free: [
    'first_name',
    'last_name',
    'email',
    'profile_image',
    'bio',
  ],
  Preferred: [
    'first_name',
    'last_name',
    'email',
    'profile_image',
    'bio',
    'website_url',
    'booking_url',
  ],
  Premier: [
    'first_name',
    'last_name',
    'email',
    'profile_image',
    'bio',
    'website_url',
    'booking_url',
    'video_url',
    'social_media_links',
  ],
};

// Helper function to calculate profile completion
export const calculateProfileScore = (user: UserProfile) => {
  const requiredFields = tierFields[user.tier];
  if (!requiredFields) return { score: 0, nextAction: 'Select a membership tier.' };

  let completedFields = 0;
  let nextAction = 'Your profile is complete!';

  for (const field of requiredFields) {
    // Check if the field exists and is not empty/null/undefined
    if (user[field] && (typeof user[field] !== 'string' || (user[field] as string).trim() !== '')) {
      completedFields++;
    } else if (nextAction === 'Your profile is complete!') {
      // Found the first incomplete field
      nextAction = `Add your ${field.replace(/_/g, ' ')} to improve your score.`;
    }
  }

  const score = Math.round((completedFields / requiredFields.length) * 100);
  return { score, nextAction };
};