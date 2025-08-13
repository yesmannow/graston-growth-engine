import React from 'react';
import { ChevronDown, ThumbsUp, ThumbsDown, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaqItem } from '@/data/faqData';

interface FaqAccordionProps {
  item: FaqItem;
  isExpanded: boolean;
  onToggle: () => void;
  onCopyLink: () => void;
  searchTerm?: string;
  categoryColor?: string;
}

const FaqAccordion = ({ 
  item, 
  isExpanded, 
  onToggle, 
  onCopyLink, 
  searchTerm,
}: FaqAccordionProps) => {
  const [feedback, setFeedback] = React.useState<'helpful' | 'not-helpful' | null>(null);
  const [linkCopied, setLinkCopied] = React.useState(false);

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    setFeedback(type);
    // Here you would typically send this feedback to your analytics service
    console.log(`Feedback for ${item.id}: ${type}`);
  };

  const handleCopyLink = () => {
    onCopyLink();
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <Card 
      id={item.id}
      className={`transition-all duration-300 hover:shadow-md ${
        isExpanded ? 'ring-2 ring-blue-200 shadow-lg' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-t-lg"
        aria-expanded={isExpanded}
        aria-controls={`answer-${item.id}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
              {highlightText(item.question, searchTerm || '')}
            </h3>
            {item.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyLink();
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {linkCopied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
            </Button>
            <ChevronDown 
              className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </button>

      <div
        id={`answer-${item.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <CardContent className="pt-0 pb-6 px-6">
          <div className="prose prose-gray max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(item.answer, searchTerm || '') as any
              }}
            />
          </div>

          {/* Feedback Section */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Was this helpful?</span>
              <div className="flex items-center gap-2">
                <Button
                  variant={feedback === 'helpful' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFeedback('helpful')}
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-3 w-3" />
                  Yes
                </Button>
                <Button
                  variant={feedback === 'not-helpful' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => handleFeedback('not-helpful')}
                  className="flex items-center gap-1"
                >
                  <ThumbsDown className="h-3 w-3" />
                  No
                </Button>
              </div>
            </div>
            {feedback && (
              <div className="mt-2 text-sm text-gray-500">
                Thank you for your feedback!
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default FaqAccordion;