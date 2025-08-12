import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FaqCategory from './FaqCategory';
import FaqItem from './FaqItem';
import { cn } from '@/lib/utils';

export interface FaqData {
  id: string;
  question: string;
  answer: string;
  category: string;
  views?: number;
  helpful?: number;
  notHelpful?: number;
}

interface FaqContainerProps {
  faqs: FaqData[];
  className?: string;
}

const FaqContainer: React.FC<FaqContainerProps> = ({ faqs, className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Group FAQs by category
  const categories = useMemo(() => {
    const categoryMap = new Map<string, FaqData[]>();
    faqs.forEach(faq => {
      if (!categoryMap.has(faq.category)) {
        categoryMap.set(faq.category, []);
      }
      categoryMap.get(faq.category)!.push(faq);
    });
    return categoryMap;
  }, [faqs]);

  // Filter FAQs based on search term and selected category
  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    return filtered;
  }, [faqs, searchTerm, selectedCategory]);

  // Get top questions (most viewed)
  const topQuestions = useMemo(() => {
    return [...faqs]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);
  }, [faqs]);

  const handleItemToggle = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const handleFeedback = (faqId: string, helpful: boolean) => {
    // In a real app, this would update the database
    console.log(`FAQ ${faqId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <div className={cn("max-w-6xl mx-auto p-6", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-2">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to frequently asked questions about our provider directory
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All Categories
          </Button>
          {Array.from(categories.keys()).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
              <Badge variant="secondary" className="ml-2">
                {categories.get(category)?.length}
              </Badge>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Active Filters */}
      {(searchTerm || selectedCategory) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Active filters:</span>
            {searchTerm && (
              <Badge variant="outline">
                Search: "{searchTerm}"
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="outline">
                Category: {selectedCategory}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 px-2"
            >
              Clear all
            </Button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Top Questions */}
            {!searchTerm && !selectedCategory && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Most Popular</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topQuestions.map((faq, index) => (
                    <button
                      key={faq.id}
                      onClick={() => handleItemToggle(faq.id)}
                      className="text-left w-full p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="text-xs">
                          {index + 1}
                        </Badge>
                        <span className="text-sm font-medium line-clamp-2">
                          {faq.question}
                        </span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/support">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/onboarding">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Getting Started Guide
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any questions matching your search. Try different keywords or browse our categories.
              </p>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </motion.div>
          ) : selectedCategory ? (
            <FaqCategory
              title={selectedCategory}
              faqs={filteredFaqs}
              openItems={openItems}
              onItemToggle={handleItemToggle}
              onFeedback={handleFeedback}
              searchTerm={searchTerm}
            />
          ) : (
            <div className="space-y-8">
              {Array.from(categories.entries()).map(([category, categoryFaqs]) => {
                const visibleFaqs = categoryFaqs.filter(faq =>
                  !searchTerm || 
                  faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (visibleFaqs.length === 0) return null;

                return (
                  <FaqCategory
                    key={category}
                    title={category}
                    faqs={visibleFaqs}
                    openItems={openItems}
                    onItemToggle={handleItemToggle}
                    onFeedback={handleFeedback}
                    searchTerm={searchTerm}
                  />
                );
              })}
            </div>
          )}

          {/* Support CTA */}
          {filteredFaqs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <Separator className="mb-8" />
              <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-semibold mb-2">Still have questions?</h3>
                  <p className="text-muted-foreground mb-6">
                    Our support team is here to help you succeed. Get personalized assistance with your account.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <a href="/support">Contact Support</a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="mailto:support@example.com">Email Us</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqContainer;