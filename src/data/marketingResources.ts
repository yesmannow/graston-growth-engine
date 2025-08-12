import { MarketingResource } from "@/types";

export const marketingResources: MarketingResource[] = [
  {
    id: "res_001",
    title: "Patient Education Brochure",
    description: "Comprehensive brochure explaining the Graston Technique benefits",
    category: "Patient Education",
    tier: "Free",
    image: "https://picsum.photos/400/300?random=1",
    filePath: "/resources/patient-brochure.pdf"
  },
  {
    id: "res_002",
    title: "Social Media Kit",
    description: "Ready-to-use social media posts and graphics",
    category: "Marketing Materials",
    tier: "Preferred",
    image: "https://picsum.photos/400/300?random=2",
    filePath: "/resources/social-media-kit.zip"
  },
  {
    id: "res_003",
    title: "Treatment Protocol Guide",
    description: "Step-by-step treatment protocols for common conditions",
    category: "Clinical Resources",
    tier: "Premier",
    image: "https://picsum.photos/400/300?random=3",
    filePath: "/resources/treatment-protocols.pdf"
  }
];