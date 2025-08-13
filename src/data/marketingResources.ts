import { MarketingResource } from "@/types/index";

export const marketingResources: MarketingResource[] = [
  {
    id: "1",
    title: "Social Media Content Calendar",
    description: "A 30-day content plan to boost your online presence.",
    category: "Social Media",
    tier: "Preferred",
    image: "https://placehold.co/600x400/a5b4fc/ffffff?text=Calendar",
    filePath: "/docs/social-media-calendar.pdf",
  },
  {
    id: "2",
    title: "Email Marketing Templates",
    description: "Professionally written email templates for patient newsletters.",
    category: "Email Marketing",
    tier: "Preferred",
    image: "https://placehold.co/600x400/818cf8/ffffff?text=Emails",
    filePath: "/docs/email-templates.zip",
  },
  {
    id: "3",
    title: "Advanced SEO Guide for Clinics",
    description: "An in-depth guide to ranking your clinic's website on Google.",
    category: "SEO",
    tier: "Premier",
    image: "https://placehold.co/600x400/c4b5fd/ffffff?text=SEO",
    filePath: "/docs/seo-guide.pdf",
  },
  {
    id: "4",
    title: "Patient Testimonial Video Guide",
    description: "Learn how to create compelling patient testimonial videos.",
    category: "Video Marketing",
    tier: "Premier",
    image: "https://placehold.co/600x400/a78bfa/ffffff?text=Video",
    filePath: "/docs/video-guide.pdf",
  },
];