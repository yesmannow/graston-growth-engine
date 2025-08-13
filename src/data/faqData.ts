import { 
  CreditCard,
  Settings, 
  Zap,
  Star,
  BarChart2,
  LucideIcon
} from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

export interface FaqCategoryData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  items: FaqItem[];
}

export const faqData: FaqCategoryData[] = [
    {
        id: 'membership',
        title: 'Membership & Billing',
        description: 'Questions about plans, payments, and account status.',
        icon: CreditCard,
        color: 'blue',
        items: [
            {
                id: 'upgrade-membership',
                question: 'How do I upgrade my membership tier?',
                answer: 'You can upgrade your membership at any time from your provider dashboard. Navigate to the "Billing & Subscription" tab, select your desired tier (Preferred or Premier), and follow the prompts to complete the payment. Your new features will be unlocked instantly.',
                tags: ['upgrade', 'billing', 'tier']
            },
            {
                id: 'billing-questions',
                question: 'How does billing work for different membership tiers?',
                answer: 'Billing is handled on an annual basis. You will be charged once per year on the anniversary of your subscription. You can manage your payment methods and view invoices in the "Billing & Subscription" section of your dashboard.',
                tags: ['payment', 'subscription', 'invoice']
            }
        ]
    },
    {
        id: 'profile-management',
        title: 'Profile Management',
        description: 'Managing your public-facing provider profile.',
        icon: Settings,
        color: 'purple',
        items: [
            {
                id: 'profile-visibility',
                question: 'Why isn\'t my profile showing up in search results?',
                answer: 'There are a few common reasons: 1) Your profile may be incomplete. Ensure all required fields are filled out. 2) Your verification may be pending. Our team typically verifies new profiles within 2-3 business days. 3) Your subscription may have lapsed. Please check your billing status.',
                tags: ['search', 'visibility', 'incomplete']
            }
        ]
    },
    {
        id: 'analytics',
        title: 'Analytics & ROI',
        description: 'Understanding your profile performance.',
        icon: BarChart2,
        color: 'green',
        items: [
            {
                id: 'analytics-tracking',
                question: 'How can I track my profile analytics and ROI?',
                answer: 'Your provider dashboard includes a comprehensive analytics section. Here you can see profile views, website clicks, form submissions, and more. Use our ROI calculator to estimate the value these leads bring to your practice.',
                tags: ['analytics', 'dashboard', 'roi']
            }
        ]
    },
    {
        id: 'general',
        title: 'General Questions',
        description: 'General inquiries about the directory.',
        icon: Star,
        color: 'yellow',
        items: [
            {
                id: 'directory-benefits',
                question: 'What are the benefits of being listed in the directory?',
                answer: 'Being listed in the official Graston Technique® directory enhances your credibility, increases your online visibility to patients actively seeking GT care, and provides you with marketing tools to grow your practice.',
                tags: ['benefits', 'value', 'marketing']
            }
        ]
    }
];