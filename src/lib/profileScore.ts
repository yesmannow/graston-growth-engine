import { FullProviderProfile } from "@/types";

export interface StrengthChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
  points: number;
  actionPath: string;
}

export interface ProfileStrengthResult {
  score: number;
  checklist: StrengthChecklistItem[];
}

export const calculateProfileStrength = (provider: FullProviderProfile): ProfileStrengthResult => {
  const socialLinksCount = [provider.linkedin, provider.twitter, provider.instagram, provider.facebook].filter(Boolean).length;

  const checklist: StrengthChecklistItem[] = [
    { id: 'photo', text: 'Add a professional profile photo', isCompleted: !!provider.profileImage, points: 20, actionPath: `/provider/${provider.id}/update` },
    { id: 'bio', text: 'Write a bio of at least 150 words', isCompleted: (provider.bio?.length || 0) >= 150, points: 15, actionPath: `/provider/${provider.id}/update` },
    { id: 'socials', text: 'Add at least 3 social media links', isCompleted: socialLinksCount >= 3, points: 10, actionPath: `/provider/${provider.id}/update` },
    { id: 'services', text: 'List at least 5 services offered', isCompleted: (provider.services?.length || 0) >= 5, points: 15, actionPath: `/provider/${provider.id}/update` },
    { id: 'certs', text: 'Add your certifications', isCompleted: (provider.certifications?.length || 0) > 0, points: 10, actionPath: `/provider/${provider.id}/update` },
    { id: 'testimonials', text: 'Add at least 3 patient testimonials', isCompleted: (provider.testimonials?.length || 0) >= 3, points: 15, actionPath: `/provider/${provider.id}/update` },
    { id: 'media', text: 'Upload at least 3 photos to your gallery', isCompleted: (provider.media?.length || 0) >= 3, points: 15, actionPath: `/provider/${provider.id}/update` },
  ];

  const score = checklist.reduce((total, item) => {
    return total + (item.isCompleted ? item.points : 0);
  }, 0);

  return { score, checklist };
};