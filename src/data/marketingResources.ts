export type ResourceCategory = 'Logo' | 'Badge' | 'Poster' | 'Handout' | 'Social Media' | 'Banner' | 'Business' | 'Video' | 'Success Story' | 'News Release' | 'Clinician Material';

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: 'PNG' | 'SVG' | 'PDF' | 'DOCX' | 'AI' | 'JPG' | 'MP4' | 'ZIP';
  tags: string[];
  thumbnailUrl: string;
  fileUrl: string;
  tier: 'Free' | 'Preferred' | 'Premier';
}

export const marketingResources: MarketingResource[] = [
  // From original BrandAssetLibrary
  {
    id: 'logo-1',
    title: 'Graston Technique Logo (Color)',
    description: 'The official full-color GT logo for digital and print use.',
    category: 'Logo',
    type: 'PNG',
    tags: ['logo', 'brand', 'official'],
    thumbnailUrl: '/images/asset-placeholders/logo-color.png',
    fileUrl: '/resources/brand-assets/logo-color.png',
    tier: 'Free',
  },
  {
    id: 'badge-1',
    title: 'Premier Provider Badge',
    description: 'Official badge for Premier tier providers to use on their websites and marketing materials.',
    category: 'Badge',
    type: 'PNG',
    tags: ['badge', 'premier', 'certification'],
    thumbnailUrl: '/images/PremierBadge_01-04.png',
    fileUrl: '/images/PremierBadge_01-04.png',
    tier: 'Premier',
  },
  {
    id: 'badge-2',
    title: 'Preferred Provider Badge',
    description: 'Official badge for Preferred tier providers.',
    category: 'Badge',
    type: 'PNG',
    tags: ['badge', 'preferred', 'certification'],
    thumbnailUrl: '/images/PreferredBadge_01.webp',
    fileUrl: '/images/PreferredBadge_01.webp',
    tier: 'Preferred',
  },
  // New Resources from Zip files
  {
    id: 'banner-1',
    title: 'Facebook Cover Banner',
    description: 'A professionally designed banner for your clinic\'s Facebook page.',
    category: 'Banner',
    type: 'JPG',
    tags: ['social media', 'facebook', 'banner'],
    thumbnailUrl: '/images/asset-placeholders/facebook-banner.jpg',
    fileUrl: '#',
    tier: 'Preferred',
  },
  {
    id: 'poster-1',
    title: '"Got Pain?" Clinic Poster',
    description: 'An eye-catching poster to display in your clinic waiting room.',
    category: 'Poster',
    type: 'PDF',
    tags: ['print', 'poster', 'clinic', 'decor'],
    thumbnailUrl: '/images/asset-placeholders/poster-placeholder.png',
    fileUrl: '#',
    tier: 'Preferred',
  },
  {
    id: 'handout-1',
    title: 'Patient Handout: What is GT?',
    description: 'A simple, easy-to-understand handout for new patients.',
    category: 'Handout',
    type: 'PDF',
    tags: ['patient education', 'handout', 'printable'],
    thumbnailUrl: '/images/asset-placeholders/handout-placeholder.png',
    fileUrl: '#',
    tier: 'Free',
  },
  {
    id: 'handout-custom-1',
    title: 'Customizable Handout (Back Pain)',
    description: 'A DOCX template you can customize with your clinic\'s logo and contact info.',
    category: 'Handout',
    type: 'DOCX',
    tags: ['customizable', 'patient education', 'back pain'],
    thumbnailUrl: '/images/asset-placeholders/handout-placeholder.png',
    fileUrl: '#',
    tier: 'Premier',
  },
  {
    id: 'success-story-1',
    title: 'Marketing Success Story: Dr. Smith',
    description: 'Learn how Dr. Smith doubled her new patient inquiries using the directory.',
    category: 'Success Story',
    type: 'PDF',
    tags: ['case study', 'success story', 'marketing'],
    thumbnailUrl: '/images/asset-placeholders/success-story-placeholder.png',
    fileUrl: '#',
    tier: 'Free',
  },
  {
    id: 'business-1',
    title: 'Making Your GT Investment Pay Off',
    description: 'A guide to maximizing the return on your Graston Technique certification.',
    category: 'Business',
    type: 'PDF',
    tags: ['roi', 'business', 'investment', 'guide'],
    thumbnailUrl: '/images/asset-placeholders/roi-guide-placeholder.png',
    fileUrl: '#',
    tier: 'Preferred',
  },
  {
    id: 'news-release-1',
    title: 'New Provider News Release Template',
    description: 'A press release template to announce your GT certification to local media.',
    category: 'News Release',
    type: 'DOCX',
    tags: ['pr', 'press release', 'media', 'marketing'],
    thumbnailUrl: '/images/asset-placeholders/news-release-placeholder.png',
    fileUrl: '#',
    tier: 'Premier',
  },
  {
    id: 'clinician-material-1',
    title: 'SOAP Note Template',
    description: 'A standardized SOAP note template for Graston Technique sessions.',
    category: 'Clinician Material',
    type: 'PDF',
    tags: ['clinical', 'documentation', 'soap note'],
    thumbnailUrl: '/images/asset-placeholders/template-placeholder.png',
    fileUrl: '#',
    tier: 'Free',
  },
  {
    id: 'social-1',
    title: 'Instagram Post Template Pack',
    description: 'A pack of 10 customizable Instagram post templates in Canva.',
    category: 'Social Media',
    type: 'ZIP',
    tags: ['instagram', 'social media', 'canva', 'template'],
    thumbnailUrl: '/images/asset-placeholders/social-media-placeholder.png',
    fileUrl: '#',
    tier: 'Premier',
  },
];