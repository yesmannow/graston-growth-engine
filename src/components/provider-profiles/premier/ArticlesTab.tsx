import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface ArticlesTabProps {
  provider: ProviderProfile;
}

const ArticlesTab = ({ provider }: ArticlesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Published Articles
        </CardTitle>
      </CardHeader>
      <CardContent>
        {provider.published_articles && provider.published_articles.length > 0 ? (
          <div className="space-y-4">
            {provider.published_articles.map((article) => (
              <div key={article.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>{new Date(article.published_date).toLocaleDateString()} • {article.read_time} min read</p>
                  </div>
                  <Button variant="link" className="p-0 h-auto">
                    Read More →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No articles published yet</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticlesTab;