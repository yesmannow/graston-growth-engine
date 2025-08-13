import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ThumbsUp } from 'lucide-react';

interface Article {
  title: string;
  views: number;
  helpfulness: number;
}

interface KnowledgeBaseTabProps {
  topArticles: Article[];
}

const KnowledgeBaseTab = ({ topArticles }: KnowledgeBaseTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topArticles.map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{article.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{article.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{article.helpfulness}% helpful</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={article.helpfulness > 80 ? 'default' : 'secondary'}>
                    {article.helpfulness > 80 ? 'High Impact' : 'Needs Review'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBaseTab;