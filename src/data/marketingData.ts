import { BookOpen, Bot, Download, Edit, Mail, Share2, Star } from "lucide-react";

export const brandAssets = {
  logos: [
    { id: 'logo-1', title: 'Primary Logo (Color)', type: 'PNG', url: '/assets/logo-color.png', image: '/assets/logo-color.png' },
    { id: 'logo-2', title: 'Primary Logo (White)', type: 'PNG', url: '/assets/logo-white.png', image: '/assets/logo-white.png' },
    { id: 'logo-3', title: 'Icon Only', type: 'SVG', url: '/assets/logo-icon.svg', image: '/assets/logo-icon.svg' },
  ],
  badges: [
    { id: 'badge-1', title: 'Verified Provider Badge', type: 'PNG', url: '/assets/verified-badge.png', image: '/assets/verified-badge.png' },
  ],
  templates: [
    { id: 'template-1', title: 'Clinic Brochure Template', type: 'PDF', url: '/assets/brochure.pdf', image: '/assets/brochure-thumb.png' },
    { id: 'template-2', title: 'Patient Flyer Template', type: 'PDF', url: '/assets/flyer.pdf', image: '/assets/flyer-thumb.png' },
  ],
  stockPhotos: [
    { id: 'photo-1', title: 'Clinic Interior', type: 'JPG', url: '/assets/stock-1.jpg', image: '/assets/stock-1.jpg' },
    { id: 'photo-2', title: 'Practitioner with Patient', type: 'JPG', url: '/assets/stock-2.jpg', image: '/assets/stock-2.jpg' },
    { id: 'photo-3', title: 'Physical Therapy Session', type: 'JPG', url: '/assets/stock-3.jpg', image: '/assets/stock-3.jpg' },
  ],
  emailSignatures: [
    { id: 'sig-1', title: 'Standard Signature', type: 'HTML', content: '<div>Your Name | Your Clinic<br><a href="[Profile Link]">View My Profile</a></div>', image: '/assets/signature-thumb.png' },
  ]
};

export const campaigns = [
  {
    id: 'campaign-1',
    title: 'Back to School Sports Physicals',
    description: 'Attract young athletes and their parents before the school sports season begins.',
    image: '/assets/campaign-sports.jpg',
    assets: [
      { title: 'Facebook Post Graphic', type: 'PNG', url: '#' },
      { title: 'Instagram Story Graphic', type: 'PNG', url: '#' },
      { title: 'Email Header', type: 'PNG', url: '#' },
      { title: 'Suggested Post Copy', type: 'DOCX', url: '#' },
    ]
  },
  {
    id: 'campaign-2',
    title: 'National Physical Therapy Month',
    description: 'Engage your community and raise awareness during this key industry event in October.',
    image: '/assets/campaign-pt-month.jpg',
    assets: [
      { title: 'Social Media Graphics (Set of 3)', type: 'PNG', url: '#' },
      { title: 'Email Newsletter Template', type: 'HTML', url: '#' },
    ]
  },
];

export const patientEducation = [
  { id: 'edu-1', title: 'Understanding Plantar Fasciitis', url: '#', image: '/assets/edu-plantar.jpg' },
  { id: 'edu-2', title: '5 Stretches for Lower Back Pain', url: '#', image: '/assets/edu-back-pain.jpg' },
  { id: 'edu-3', title: 'Recovering from a Sprained Ankle', url: '#', image: '/assets/edu-ankle.jpg' },
];

export const contentGeneratorOptions = {
  types: [
    { value: 'social-post', label: 'Social Media Post', icon: Share2 },
    { value: 'blog-idea', label: 'Blog/Newsletter Idea', icon: Edit },
    { value: 'email-campaign', label: 'Email Campaign Copy', icon: Mail },
  ],
  themes: [
    { value: 'patient-education', label: 'Patient Education' },
    { value: 'service-promotion', label: 'Service Promotion' },
    { value: 'community-engagement', label: 'Community Engagement' },
    { value: 'thought-leadership', label: 'Thought Leadership' },
  ],
  tones: [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly & Approachable' },
    { value: 'authoritative', label: 'Authoritative & Expert' },
    { value: 'inspirational', label: 'Inspirational & Motivational' },
  ]
};

export const reputationTools = {
  reviewSites: [
    { value: 'google', label: 'Google Reviews' },
    { value: 'yelp', label: 'Yelp' },
    { value: 'facebook', label: 'Facebook Recommendations' },
  ],
  communicationMethods: [
    { value: 'email', label: 'Email Template' },
    { value: 'sms', label: 'SMS Template' },
  ]
};

export const aiCoachTips = [
    {
        id: 'tip-1',
        icon: Bot,
        text: "Your profile analytics show high engagement from Facebook. Try generating a few Facebook posts to capitalize on this trend."
    },
    {
        id: 'tip-2',
        icon: Star,
        text: "You've received 5 new positive reviews this month! Use the Reputation Manager to ask more happy patients for feedback."
    },
    {
        id: 'tip-3',
        icon: BookOpen,
        text: "It's National Physical Therapy month. Launch the pre-built campaign to engage your local community."
    }
];