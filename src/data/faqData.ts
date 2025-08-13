import { 
  HelpCircle, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Shield, 
  Zap,
  Building,
  Star,
  Globe
} from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  popularity?: number;
}

export interface FaqCategoryData {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  items: FaqItem[];
}

export const faqData: FaqCategoryData[] = [
  {
    id: 'about-directory',
    title: 'About the Directory',
    description: 'Learn about the Graston Technique® Certified Provider Directory',
    icon: Globe,
    color: 'blue',
    items: [
      {
        id: 'what-is-directory',
        question: 'What is the Graston Technique® Certified Provider Directory?',
        answer: 'The Graston Technique® Certified Provider Directory is a comprehensive online platform that connects patients with certified Graston Technique® practitioners. It serves as the official directory for healthcare providers who have completed certification in the Graston Technique®, helping patients find qualified practitioners in their area.',
        tags: ['general', 'overview'],
        popularity: 95
      },
      {
        id: 'directory-benefits',
        question: 'What are the benefits of being listed in the directory?',
        answer: 'Being listed in the directory provides numerous benefits including: increased visibility to potential patients, enhanced credibility through official certification display, access to marketing tools and resources, detailed analytics on profile performance, patient lead generation, and the ability to showcase your expertise in the Graston Technique®.',
        tags: ['benefits', 'marketing'],
        popularity: 89
      },
      {
        id: 'who-can-join',
        question: 'Who can be listed in the directory?',
        answer: 'Only healthcare providers who have successfully completed Graston Technique® certification through an approved training program are eligible for directory listing. This includes physical therapists, chiropractors, athletic trainers, occupational therapists, and other qualified healthcare professionals.',
        tags: ['eligibility', 'certification'],
        popularity: 78
      },
      {
        id: 'verification-process',
        question: 'How is provider certification verified?',
        answer: 'All providers undergo a thorough verification process where we confirm their Graston Technique® certification status, professional licenses, and credentials. This ensures that only legitimate, certified practitioners are listed in the directory, maintaining the integrity and trustworthiness of the platform.',
        tags: ['verification', 'security'],
        popularity: 72
      }
    ]
  },
  {
    id: 'membership-tiers',
    title: 'Membership Tiers',
    description: 'Understanding Free, Preferred, and Premier membership levels',
    icon: Star,
    color: 'purple',
    items: [
      {
        id: 'membership-tiers-overview',
        question: 'What are the different membership tiers available?',
        answer: 'We offer three membership tiers: <strong>Free</strong> - Basic directory listing with essential information; <strong>Preferred</strong> - Enhanced profile features, basic analytics, and marketing tools; <strong>Premier</strong> - Full-featured profile, advanced analytics, priority placement, marketing toolkit, and dedicated support.',
        tags: ['tiers', 'comparison'],
        popularity: 92
      },
      {
        id: 'upgrade-membership',
        question: 'How do I upgrade my membership tier?',
        answer: 'You can upgrade your membership at any time through your account dashboard. Simply navigate to the "Membership" section, select your desired tier, and complete the payment process. Upgrades take effect immediately, and you\'ll have access to all new features right away.',
        tags: ['upgrade', 'payment'],
        popularity: 88
      },
      {
        id: 'tier-differences',
        question: 'What\'s the difference between Preferred and Premier tiers?',
        answer: 'Preferred tier includes enhanced profile customization, basic analytics, and standard marketing tools. Premier tier adds advanced analytics with ROI tracking, priority search placement, comprehensive marketing toolkit, dedicated phone support, and exclusive networking opportunities.',
        tags: ['comparison', 'features'],
        popularity: 85
      },
      {
        id: 'downgrade-membership',
        question: 'Can I downgrade my membership?',
        answer: 'Yes, you can downgrade your membership at any time. However, downgrades take effect at the end of your current billing cycle to ensure you receive the full value of your paid subscription. You\'ll retain access to premium features until the downgrade becomes effective.',
        tags: ['downgrade', 'billing'],
        popularity: 65
      }
    ]
  },
  {
    id: 'billing-account',
    title: 'Billing & Account Management',
    description: 'Payment, billing, and account-related questions',
    icon: CreditCard,
    color: 'green',
    items: [
      {
        id: 'billing-cycle',
        question: 'How does billing work for different membership tiers?',
        answer: 'Free tier has no billing. Preferred and Premier tiers are billed monthly or annually (with annual plans offering a discount). Billing occurs automatically on your subscription date, and you\'ll receive an invoice via email. All payments are processed securely through our encrypted payment system.',
        tags: ['billing', 'payment'],
        popularity: 81
      },
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and ACH bank transfers for annual subscriptions. All payments are processed through secure, PCI-compliant payment processors to ensure your financial information is protected.',
        tags: ['payment', 'security'],
        popularity: 74
      },
      {
        id: 'refund-policy',
        question: 'What is your refund policy?',
        answer: 'We offer a 30-day money-back guarantee for new subscribers. If you\'re not satisfied with your membership within the first 30 days, contact our support team for a full refund. Refunds for subsequent billing periods are evaluated on a case-by-case basis.',
        tags: ['refund', 'policy'],
        popularity: 69
      },
      {
        id: 'update-billing-info',
        question: 'How do I update my billing information?',
        answer: 'You can update your billing information anytime in your account settings under the "Billing" section. Changes to payment methods take effect immediately for future billing cycles. We recommend updating your information before your next billing date to avoid service interruption.',
        tags: ['billing', 'account'],
        popularity: 67
      },
      {
        id: 'billing-issues',
        question: 'What should I do if I have billing issues?',
        answer: 'If you experience billing issues, first check your account dashboard for any error messages or failed payment notifications. If the issue persists, contact our support team with your account details and we\'ll resolve the matter promptly. Premier members have access to priority billing support.',
        tags: ['billing', 'support'],
        popularity: 58
      }
    ]
  },
  {
    id: 'analytics-roi',
    title: 'Analytics & ROI',
    description: 'Understanding your profile performance and return on investment',
    icon: BarChart3,
    color: 'orange',
    items: [
      {
        id: 'analytics-tracking',
        question: 'How can I track my profile analytics and ROI?',
        answer: 'Your analytics dashboard provides comprehensive insights including profile views, patient inquiries, conversion rates, and estimated ROI. Preferred members get basic analytics, while Premier members access advanced metrics, demographic data, and detailed performance reports with actionable insights.',
        tags: ['analytics', 'roi', 'dashboard'],
        popularity: 90
      },
      {
        id: 'roi-calculation',
        question: 'How is ROI calculated in the analytics?',
        answer: 'ROI is calculated based on the estimated value of patient inquiries generated through your directory profile compared to your membership cost. We use industry-standard patient lifetime value metrics and track conversion from profile views to actual patient contacts to provide accurate ROI estimates.',
        tags: ['roi', 'calculation'],
        popularity: 76
      },
      {
        id: 'improve-profile-performance',
        question: 'How can I improve my profile performance?',
        answer: 'To improve performance: complete all profile sections, add high-quality photos, regularly update your information, respond promptly to patient inquiries, encourage patient reviews, use relevant keywords in your description, and leverage the marketing tools available in your membership tier.',
        tags: ['optimization', 'performance'],
        popularity: 83
      },
      {
        id: 'analytics-frequency',
        question: 'How often are analytics updated?',
        answer: 'Basic analytics are updated daily, while detailed reports are generated weekly. Real-time metrics like profile views and inquiries are updated every few hours. Premier members receive weekly performance summaries and monthly detailed reports with trends and recommendations.',
        tags: ['analytics', 'updates'],
        popularity: 62
      }
    ]
  },
  {
    id: 'profile-management',
    title: 'Profile Management',
    description: 'Managing and optimizing your provider profile',
    icon: Settings,
    color: 'indigo',
    items: [
      {
        id: 'profile-visibility',
        question: 'Why isn\'t my profile showing up in search results?',
        answer: 'Profile visibility can be affected by several factors: incomplete profile information, pending verification status, search algorithm preferences, or account status issues. Ensure your profile is 100% complete, verified, and that your account is in good standing. Premier members receive priority placement in search results.',
        tags: ['visibility', 'search', 'troubleshooting'],
        popularity: 87
      },
      {
        id: 'update-profile-info',
        question: 'How do I update my profile information?',
        answer: 'Log into your account dashboard and navigate to "Profile Settings." You can update all information including contact details, services offered, bio, photos, and availability. Changes are typically reflected within 24 hours after our quality review process.',
        tags: ['profile', 'updates'],
        popularity: 79
      },
      {
        id: 'profile-photos',
        question: 'What are the requirements for profile photos?',
        answer: 'Profile photos should be high-resolution (minimum 800x600 pixels), professional in appearance, and clearly show your face or practice. Accepted formats include JPG, PNG, and WebP. Photos must comply with our professional standards and will be reviewed before publication.',
        tags: ['photos', 'requirements'],
        popularity: 71
      },
      {
        id: 'profile-verification',
        question: 'How long does profile verification take?',
        answer: 'Initial profile verification typically takes 2-3 business days. This includes confirming your Graston Technique® certification, professional licenses, and profile information accuracy. You\'ll receive email notifications throughout the verification process and when your profile goes live.',
        tags: ['verification', 'timeline'],
        popularity: 68
      },
      {
        id: 'multiple-locations',
        question: 'Can I list multiple practice locations?',
        answer: 'Yes, Preferred and Premier members can list multiple practice locations. Each location can have its own contact information, hours, and specific details. This helps patients find you at their most convenient location and improves your visibility in multiple geographic areas.',
        tags: ['locations', 'multiple'],
        popularity: 64
      }
    ]
  },
  {
    id: 'technical-support',
    title: 'Technical Support',
    description: 'Getting help with technical issues and platform usage',
    icon: Zap,
    color: 'red',
    items: [
      {
        id: 'login-issues',
        question: 'I\'m having trouble logging into my account. What should I do?',
        answer: 'First, try resetting your password using the "Forgot Password" link on the login page. Ensure you\'re using the correct email address associated with your account. Clear your browser cache and cookies, or try a different browser. If issues persist, contact our technical support team.',
        tags: ['login', 'troubleshooting'],
        popularity: 75
      },
      {
        id: 'browser-compatibility',
        question: 'Which browsers are supported?',
        answer: 'Our platform is optimized for modern browsers including Chrome (recommended), Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience. Internet Explorer is not supported due to security and performance limitations.',
        tags: ['browsers', 'compatibility'],
        popularity: 59
      },
      {
        id: 'mobile-access',
        question: 'Can I access my account from mobile devices?',
        answer: 'Yes, our platform is fully responsive and works on all mobile devices and tablets. You can manage your profile, view analytics, and respond to patient inquiries from any device. We also offer a mobile app for iOS and Android with enhanced features for on-the-go management.',
        tags: ['mobile', 'responsive'],
        popularity: 73
      },
      {
        id: 'data-security',
        question: 'How is my data protected?',
        answer: 'We employ enterprise-grade security measures including SSL encryption, secure data centers, regular security audits, and HIPAA-compliant data handling practices. Your personal and patient information is protected with the highest security standards in the healthcare industry.',
        tags: ['security', 'privacy'],
        popularity: 82
      },
      {
        id: 'technical-support-hours',
        question: 'What are your technical support hours?',
        answer: 'Email support is available 24/7 with responses within 24 hours. Live chat support is available Monday-Friday, 9 AM-5 PM EST. Premier members have access to priority phone support during business hours and emergency technical support for critical issues.',
        tags: ['support', 'hours'],
        popularity: 61
      }
    ]
  }
];