import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FaqItem from './FaqItem';
import { FaqData } from './FaqContainer';

interface FaqCategoryProps {
  title: string;
  faqs: FaqData[];
  openItems: Set<string>;
  onItemToggle: (id: string) => void;
  onFeedback: (faqId: string, helpful: boolean) => void;
  searchTerm?: string;
}

const FaqCategory: React.FC<FaqCategoryProps> = ({
  title,
  faqs,
  openItems,
  onItemToggle,
  onFeedback,
  searchTerm
}) => {
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'About the Directory': '🏥',
      'Membership Tiers': '⭐',
      'Billing & Account Management': '💳',
      'Analytics & ROI': '📊',
      'Profile Management': '👤',
      'Technical Support': '🔧',
      'Getting Started': '🚀',
      'Marketing Tools': '📈'
    };
    return icons[category] || '❓';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id={title.toLowerCase().replace(/\s+/g, '-')}
    >
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <span className="text-2xl">{getCategoryIcon(title)}</span>
              {title}
              <Badge variant="secondary" className="ml-2">
                {faqs.length} question{faqs.length !== 1 ? 's' : ''}
              </Badge>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.has(faq.id)}
              onToggle={() => onItemToggle(faq.id)}
              onFeedback={onFeedback}
              searchTerm={searchTerm}
              index={index}
            />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FaqCategory;