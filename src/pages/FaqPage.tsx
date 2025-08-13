import { useState, useEffect, useMemo } from 'react';
import { Search, HelpCircle, MessageCircle, ChevronRight, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FaqCategory from '@/components/faq/FaqCategory';
import TopQuestions from '@/components/faq/TopQuestions';
import EscalationCta from '@/components/faq/EscalationCta';
import { faqData } from '@/data/faqData';

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Handle deep linking
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setExpandedItems(prev => new Set([...prev, hash]));
      }
    }
  }, []);

  // Filter FAQs based on search term
  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqData;
    
    return faqData.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [searchTerm]);

  const totalQuestions = faqData.reduce((acc, category) => acc + category.items.length, 0);
  const filteredCount = filteredFaqs.reduce((acc, category) => acc + category.items.length, 0);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuestionClick = (questionId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const copyLinkToClipboard = (questionId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${questionId}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.flatMap(category =>
              category.items.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            )
          })
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about the Graston Technique® Certified Provider Directory. 
            Can't find what you're looking for? We're here to help.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span>{totalQuestions} questions</span>
            <span>•</span>
            <span>Updated regularly</span>
            <span>•</span>
            <span>Searchable content</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
            />
          </div>
          {searchTerm && (
            <div className="mt-3 text-center">
              <Badge variant="secondary" className="text-sm">
                {filteredCount} result{filteredCount !== 1 ? 's' : ''} found
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {faqData.map((category) => {
                    const categoryCount = searchTerm 
                      ? filteredFaqs.find(c => c.id === category.id)?.items.length || 0
                      : category.items.length;
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                          activeCategory === category.id
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <category.icon className="h-4 w-4" />
                          <span className="font-medium">{category.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryCount}
                          </Badge>
                          <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/support">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Support
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => window.print()}>
                    <Hash className="h-4 w-4 mr-2" />
                    Print FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 prose max-w-none">
            {!searchTerm && <TopQuestions />}
            
            {filteredFaqs.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any questions matching "{searchTerm}". 
                    Try searching for a different term or contact our support team.
                  </p>
                  <Button asChild>
                    <a href="/support">Contact Support</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {filteredFaqs.map((category, index) => (
                  <div key={category.id}>
                    <FaqCategory
                      category={category}
                      searchTerm={searchTerm}
                      expandedItems={expandedItems}
                      onQuestionClick={handleQuestionClick}
                      onCopyLink={copyLinkToClipboard}
                    />
                    {index < filteredFaqs.length - 1 && <Separator className="my-8" />}
                  </div>
                ))}
              </div>
            )}

            <EscalationCta />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;