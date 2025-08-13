import { BookOpen, Bot, Edit, Mail, Share2, Star } from "lucide-react";

export const aiCoachTips = [
    {
        icon: Edit,
        text: "A complete profile is 7x more likely to be viewed. Have you updated your bio and services recently?"
    },
    {
        icon: Star,
        text: "Providers with 5+ reviews get 50% more inquiries. Use the Reputation Manager to request feedback from recent patients."
    },
    {
        icon: Share2,
        text: "Share your latest blog post on social media. Use the Content AI to generate a compelling caption."
    },
    {
        icon: Mail,
        text: "Consider running a 'New Patient Special' campaign for the upcoming season. Find templates in the Campaign-in-a-Box."
    },
    {
        icon: BookOpen,
        text: "Patient education builds trust. Share the 'Benefits of Graston Technique' PDF with your email list."
    }
];

export const brandAssets = {
    logos: [
        { id: 'logo-1', title: 'Graston Technique Logo (Color)', type: 'PNG', url: '/assets/logo-color.png', image: '/assets/logo-color.png' },
        { id: 'logo-2', title: 'Graston Technique Logo (White)', type: 'PNG', url: '/assets/logo-white.png', image: '/assets/logo-white.png' },
    ],
    badges: [
        { id: 'badge-1', title: 'Premier Provider Badge', type: 'PNG', url: '/images/PremierBadge_01-04.png', image: '/images/PremierBadge_01-04.png' },
        { id: 'badge-2', title: 'Preferred Provider Badge', type: 'PNG', url: '/images/PreferredBadge_01.webp', image: '/images/PreferredBadge_01.webp' },
    ],
    templates: [
        { id: 'template-1', title: 'Patient Intake Form', type: 'PDF', url: '#', image: '/images/template-placeholder.png' },
        { id: 'template-2', title: 'Clinic Brochure (Tri-fold)', type: 'AI', url: '#', image: '/images/template-placeholder.png' },
    ],
    stockPhotos: [
        { id: 'photo-1', title: 'Clinic Interior', type: 'JPG', url: '/images/AdobeStock_1106097284-Medium.jpeg', image: '/images/AdobeStock_1106097284-Medium.jpeg' },
        { id: 'photo-2', title: 'Practitioner with Patient', type: 'JPG', url: '/images/AdobeStock_622858237.jpeg', image: '/images/AdobeStock_622858237.jpeg' },
    ],
    emailSignatures: [
        { id: 'sig-1', title: 'Standard Email Signature', type: 'HTML', url: '#', image: '/images/template-placeholder.png' },
    ]
};

export const campaigns = [
    {
        id: 'campaign-1',
        title: 'Back Pain Relief Campaign',
        description: 'Target patients with chronic back pain using educational content and a special offer.',
        image: '/images/back-pain-campaign.jpg',
        assets: [
            { title: 'Social Media Post Templates', type: 'DOCX', url: '#' },
            { title: 'Email Newsletter Copy', type: 'DOCX', url: '#' },
            { title: 'Printable In-Clinic Flyer', type: 'PDF', url: '#' },
        ]
    },
    {
        id: 'campaign-2',
        title: 'Runner\'s Knee Recovery Campaign',
        description: 'Attract local runners by showcasing your expertise in treating common running injuries.',
        image: '/images/runners-knee-campaign.jpg',
        assets: [
            { title: 'Facebook Ad Creatives', type: 'ZIP', url: '#' },
            { title: 'Educational Blog Post', type: 'DOCX', url: '#' },
            { title: 'Video Script for Testimonials', type: 'DOCX', url: '#' },
        ]
    }
];

export const reputationTools = {
    reviewSites: [
        { value: 'google', label: 'Google' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'yelp', label: 'Yelp' },
        { value: 'healthgrades', label: 'Healthgrades' },
    ],
    communicationMethods: [
        { value: 'email', label: 'Email' },
        { value: 'sms', label: 'SMS Text Message' },
    ]
};

export const patientEducation = [
    { id: 'pe-1', title: 'Understanding Plantar Fasciitis', url: '#', image: '/images/patient-ed-1.jpg' },
    { id: 'pe-2', title: '5 Stretches for Lower Back Pain', url: '#', image: '/images/patient-ed-2.jpg' },
    { id: 'pe-3', title: 'What to Expect from Your GT Session', url: '#', image: '/images/patient-ed-3.jpg' },
];

export const contentGeneratorOptions = {
    types: [
        { value: 'social-media-post', label: 'Social Media Post' },
        { value: 'blog-post-idea', label: 'Blog Post Idea' },
        { value: 'email-newsletter-snippet', label: 'Email Newsletter Snippet' },
        { value: 'video-script-outline', label: 'Video Script Outline' },
    ],
    themes: [
        { value: 'patient-education', label: 'Patient Education' },
        { value: 'success-story', label: 'Success Story' },
        { value: 'service-highlight', label: 'Service Highlight' },
        { value: 'myth-busting', label: 'Myth Busting' },
    ],
    tones: [
        { value: 'professional', label: 'Professional' },
        { value: 'friendly', label: 'Friendly & Approachable' },
        { value: 'clinical', label: 'Clinical & Authoritative' },
        { value: 'inspirational', label: 'Inspirational' },
    ]
};