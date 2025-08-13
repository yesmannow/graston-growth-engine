import { Check, Gem, Star } from 'lucide-react';

export const providerTestimonials = [
  {
    name: "Dr. Jane Doe, DPT",
    location: "San Diego, CA",
    quote: "Upgrading to Premier was the best business decision I've made. The ROI was immediate. I saw a 40% increase in new patient inquiries within the first three months.",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=250&h=250&auto=format&fit=crop",
    metric: "40% Increase in Inquiries"
  },
  {
    name: "Dr. John Smith, DC",
    location: "Austin, TX",
    quote: "The Premier analytics dashboard is a game-changer. For the first time, I can clearly see the direct link between my directory presence and new revenue. It's incredibly motivating.",
    imageUrl: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=250&h=250&auto=format&fit=crop",
    metric: "12x Return on Investment"
  },
];

export const featureComparison = [
  {
    feature: "Verified Directory Listing",
    free: true,
    preferred: true,
    premier: true,
    tooltip: "Appear in the directory as an officially verified Graston Technique® provider."
  },
  {
    feature: "Profile Photo & Bio",
    free: false,
    preferred: true,
    premier: true,
    tooltip: "Build trust and connect with patients by showing who you are."
  },
  {
    feature: "Contact Info & Website Link",
    free: false,
    preferred: true,
    premier: true,
    tooltip: "Allow patients to contact you directly from your profile."
  },
  {
    feature: "Higher Search Ranking",
    free: false,
    preferred: true,
    premier: true,
    tooltip: "Preferred and Premier members appear above Free listings in search results."
  },
  {
    feature: "Photo & Video Gallery",
    free: false,
    preferred: false,
    premier: true,
    tooltip: "Visually showcase your practice and build trust with patients before they even walk in the door."
  },
  {
    feature: "Patient Testimonials",
    free: false,
    preferred: false,
    premier: true,
    tooltip: "Leverage social proof to convert profile visitors into patients."
  },
  {
    feature: "AI Marketing Toolkit",
    free: false,
    preferred: false,
    premier: true,
    tooltip: "Access AI-powered tools to generate content, manage your reputation, and more."
  },
  {
    feature: "Premier Analytics Dashboard",
    free: false,
    preferred: false,
    premier: true,
    tooltip: "Get detailed insights into your profile's performance and ROI."
  }
];

export const trustLogos = [
  { name: "APTA", logoUrl: "/images/apta-logo.svg" },
  { name: "ACA", logoUrl: "/images/aca-logo.svg" },
  { name: "NATA", logoUrl: "/images/nata-logo.svg" },
];

export const getTierIcon = (tier: 'Free' | 'Preferred' | 'Premier') => {
    if (tier === 'Premier') return Gem;
    if (tier === 'Preferred') return Star;
    return Check;
}