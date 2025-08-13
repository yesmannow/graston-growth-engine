import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FaqAccordion from './FaqAccordion';
import { FaqCategoryData } from '@/data/faqData';

interface FaqCategoryProps {
  category: FaqCategoryData;
  searchTerm?: string;
  expandedItems: Set<string>;
  onQuestionClick: (questionId: string) => void;
  onCopyLink: (questionId: string) => void;
}

const FaqCategory = ({ 
  category, 
  searchTerm, 
  expandedItems, 
  onQuestionClick, 
  onCopyLink 
}: FaqCategoryProps) => {
  return (
    <div id={`category-${category.id}`} className="scroll-mt-8">
      <Card className="shadow-sm border-l-4 border-l-blue-500">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <category.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">
                  {category.title}
                </CardTitle>
                <p className="text-gray-600 mt-1">{category.description}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {category.items.length} question{category.items.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {category.items.map((item) => (
            <div key={item.id} className="group">
              <FaqAccordion
                item={item}
                isExpanded={expandedItems.has(item.id)}
                onToggle={() => onQuestionClick(item.id)}
                onCopyLink={() => onCopyLink(item.id)}
                searchTerm={searchTerm}
                categoryColor={category.color}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqCategory;