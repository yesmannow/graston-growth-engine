import { MarketingResource } from "@/types/index";

export const marketingResources: MarketingResource[] = [
  {
    id: "resource-1",
    title: "Patient Education Brochure",
    description: "Professional brochure explaining the Graston Technique benefits",
    category: "Patient Education",
    tier: "Free",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    filePath: "/resources/patient-education-brochure.pdf"
  },
  {
    id: "resource-2",
    title: "Social Media Templates",
    description: "Ready-to-use social media post templates",
    category: "Social Media",
    tier: "Preferred",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    filePath: "/resources/social-media-templates.zip"
  },
  {
    id: "resource-3",
    title: "Practice Marketing Guide",
    description: "Comprehensive guide to marketing your practice",
    category: "Marketing",
    tier: "Premier",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    filePath: "/resources/practice-marketing-guide.pdf"
  }
];