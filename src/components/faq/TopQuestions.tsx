import { TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const topQuestions = [
  {
    id: 'upgrade-membership',
    question: 'How do I upgrade my membership tier?',
    category: 'Membership',
    views: 1247,
    trending: true
  },
  {
    id: 'analytics-tracking',
    question: 'How can I track my profile analytics and ROI?',
    category: 'Analytics',
    views: 892,
    trending: true
  },
  {
    id: 'profile-visibility',
    question: 'Why isn\'t my profile showing up in search results?',
    category: 'Profile Management',
    views: 756,
    trending: false
  },
  {
    id: 'billing-questions',
    question: 'How does billing work for different membership tiers?',
    category: 'Billing',
    views: 634,
    trending: false
  },
  {
    id: 'directory-benefits',
    question: 'What are the benefits of being listed in the directory?',
    category: 'General',
    views: 589,
    trending: true
  }
];

const TopQuestions = () => {
  const handleQuestionClick = (questionId: string) => {
    const element = document.getElementById(questionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Trigger expansion
      const button = element.querySelector('button');
      if (button) {
        button.click();
      }
    }
  };

  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900">
              Most Popular Questions
            </CardTitle>
            <p className="text-gray-600 mt-1">
              Quick access to the most frequently viewed questions
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {topQuestions.map((item, index) => (
            <Button
              key={item.id}
              variant="ghost"
              className="h-auto p-4 justify-start text-left hover:bg-white/80 transition-all duration-200"
              onClick={() => handleQuestionClick(item.id)}
            >
              <div className="flex items-start gap-4 w-full">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-medium text-gray-900 leading-relaxed">
                      {item.question}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.trending && (
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                          Trending
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye className="h-3 w-3" />
                        {item.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopQuestions;