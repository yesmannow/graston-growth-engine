import { MarketingResource } from "@/types";

export const marketingResources: MarketingResource[] = [
  {
    id: "res_001",
    title: "Social Media Post Templates",
    description: "Ready-to-use templates for Facebook, Instagram, and Twitter to promote your practice.",
    category: "Social Media",
    tier: "Free",
    image: "/images/resource-social.jpg",
    filePath: "/docs/social-media-templates.zip",
  },
  {
    id: "res_002",
    title: "Guide to Getting More Reviews",
    description: "A comprehensive guide on how to ethically and effectively encourage patients to leave positive reviews.",
    category: "Reputation Management",
    tier: "Preferred",
    image: "/images/resource-reviews.jpg",
    filePath: "/docs/review-guide.pdf",
  },
  {
    id: "res_003",
    title: "Local SEO for Clinicians",
    description: "Learn how to optimize your Google Business Profile and website to attract local patients.",
    category: "SEO",
    tier: "Premier",
    image: "/images/resource-seo.jpg",
    filePath: "/docs/local-seo-guide.pdf",
  },
  {
    id: "res_004",
    title: "Email Newsletter Templates",
    description: "Engage your patient base with these professionally designed email newsletter templates.",
    category: "Email Marketing",
    tier: "Preferred",
    image: "/images/resource-email.jpg",
    filePath: "/docs/email-templates.zip",
  },
];