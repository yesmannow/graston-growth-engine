export type Tier = "Free" | "Preferred" | "Premier";

export interface FullProviderProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialty?: string;
  location?: string;
  bio?: string;
  profileScore?: number;
  membershipTier: Tier;
  tier: Tier; // Legacy alias for membershipTier
  joinDate?: string;
  lastActive?: string;
  verified?: boolean;
  profileImage?: string;
  website?: string;
  socialMedia?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  services?: string[];
  certifications?: string[];
  experience?: string;
  education?: string;
  // Additional properties for admin/staff views
  trialStatus?: "Active" | "Expired" | "N/A";
  activity?: number;
  churnRisk?: boolean;
  first_name?: string;
  last_name?: string;
}

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: Tier;
  image: string;
  filePath: string;
}

export interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export interface AdminMetrics {
  totalProviders: number;
  activeProviders: number;
  newThisMonth: number;
  churnRisk: number;
  tierCounts: {
    premier: number;
    preferred: number;
    basic: number;
  };
}