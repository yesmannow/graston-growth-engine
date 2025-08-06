import { MarketingResource } from "@/types";

// IMPORTANT: Replace 'YOUR_PROJECT_REF' with your actual Supabase project reference.
const supabaseStorageBaseUrl = 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/resources';

export const marketingResources: MarketingResource[] = [
  {
    id: 'res_001',
    title: 'Social Media Strategy',
    description: 'A complete guide to building and executing a successful social media plan.',
    category: 'Social Media',
    image: '/images/resources/social-media.png',
    tier: 'Free',
    filePath: `${supabaseStorageBaseUrl}/Social-Media-Strategy.pdf`,
  },
  {
    id: 'res_002',
    title: 'Paid Advertising Guide',
    description: 'Learn how to set up and optimize paid ad campaigns on Google and Facebook.',
    category: 'Paid Ads',
    image: '/images/resources/paid-ads.png',
    tier: 'Preferred',
    filePath: `${supabaseStorageBaseUrl}/Paid-Advertising-Guide.pdf`,
  },
  {
    id: 'res_003',
    title: 'Market Understanding Guide',
    description: 'Identify your target audience and understand the competitive landscape.',
    category: 'General',
    image: '/images/resources/market-understanding.png',
    tier: 'Free',
    filePath: `${supabaseStorageBaseUrl}/Market-Understanding-Guide.pdf`,
  },
  {
    id: 'res_004',
    title: 'Google My Business Optimization',
    description: 'Maximize your local visibility with a fully optimized GMB profile.',
    category: 'SEO',
    image: '/images/resources/gmb.png',
    tier: 'Preferred',
    filePath: `${supabaseStorageBaseUrl}/Google-My-Business-Optimization.pdf`,
  },
  {
    id: 'res_005',
    title: 'Email Marketing Automation',
    description: 'Set up automated email sequences to nurture leads and retain patients.',
    category: 'Email',
    image: '/images/resources/email-marketing.png',
    tier: 'Premier',
    filePath: `${supabaseStorageBaseUrl}/Email-Marketing-Automation.pdf`,
  },
  {
    id: 'res_006',
    title: 'In-Clinic Marketing',
    description: 'Strategies to promote your services and increase patient loyalty within your clinic.',
    category: 'In-Clinic',
    image: '/images/resources/in-clinic.png',
    tier: 'Free',
    filePath: `${supabaseStorageBaseUrl}/In-Clinic-Marketing.pdf`,
  },
];