import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ThumbsUp, ThumbsDown, Link, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { FaqData } from './FaqContainer';

interface FaqItemProps {
  faq: FaqData;
  isOpen: boolean;
  onToggle: () => void;
  onFeedback: (faqId: string, helpful: boolean) => void;
  searchTerm?: string;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({
  faq,
  isOpen,
  onToggle,
  onFeedback,
  searchTerm,
  index
}) => {
  const highlightText = (text: string, term?: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${faq.id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border rounded-lg overflow-hidden"
      id={faq.id}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-content-${faq.id}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-lg leading-relaxed">
              {highlightText(faq.question, searchTerm)}
            </h3>
            {faq.views && (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>{faq.views} views</span>
              </div>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-content-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <Separator className="mb-4" />
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {highlightText(faq.answer, searchTerm)}
                </div>
              </div>

              {/* Feedback Section */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Was this helpful?</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFeedback(faq.id, true)}
                        className="h-8 px-3 hover:bg-green-50 hover:text-green-600"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Yes
                        {faq.helpful && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {faq.helpful}
                          </Badge>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFeedback(faq.id, false)}
                        className="h-8 px-3 hover:bg-red-50 hover:text-red-600"
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        No
                        {faq.notHelpful && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {faq.notHelpful}
                          </Badge>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyLink}
                    className="h-8 px-3"
                  >
                    <Link className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqItem;