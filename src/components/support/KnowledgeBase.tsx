import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  ThumbsUp, 
  ThumbsDown,
  Star,
  TrendingUp,
  Filter,
  Save,
  X
} from 'lucide-react';
import { KnowledgeBaseArticle } from '@/types/support';

const KnowledgeBase = () => {
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeBaseArticle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  // Mock data
  React.useEffect(() => {
    const mockArticles: KnowledgeBaseArticle[] = [
      {
        id: 'kb-1',
        title: 'How to Upgrade Your Provider Tier',
        content: `# How to Upgrade Your Provider Tier

Upgrading your provider tier gives you access to enhanced features and better visibility in our directory.

## Steps to Upgrade:

1. **Log into your account** - Visit your provider dashboard
2. **Navigate to Billing** - Click on the "Billing & Subscription" tab
3. **Choose your tier** - Select from Preferred or Premier options
4. **Complete payment** - Use our secure payment system
5. **Enjoy new features** - Your upgrade is instant!

## Tier Benefits:

### Preferred Tier
- Enhanced profile visibility
- Priority customer support
- Advanced analytics

### Premier Tier
- Maximum visibility
- Featured placement
- White-label reports
- Dedicated account manager

Need help? Contact our support team at support@example.com`,
        category: 'Billing',
        tags: ['upgrade', 'tier', 'billing', 'premium'],
        author: {
          id: 'agent-1',
          name: 'Sarah Wilson',
          email: 'sarah@company.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          status: 'Online',
          department: 'Support',
          activeChats: 0,
          maxChats: 5,
          skills: ['Billing', 'Technical']
        },
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-14T15:30:00Z',
        version: 2,
        isPublished: true,
        views: 1247,
        helpfulVotes: 89,
        unhelpfulVotes: 12,
        relatedArticles: ['kb-2', 'kb-3']
      },
      {
        id: 'kb-2',
        title: 'Provider Profile Verification Process',
        content: `# Provider Profile Verification Process

Getting verified builds trust with potential patients and improves your profile ranking.

## Verification Requirements:

- Valid professional license
- Proof of Graston Technique certification
- Business registration documents
- Professional headshot photo

## Submission Process:

1. Gather required documents
2. Upload through your dashboard
3. Wait for review (2-3 business days)
4. Receive verification badge

Contact us if you need assistance with the verification process.`,
        category: 'Account',
        tags: ['verification', 'profile', 'trust', 'certification'],
        author: {
          id: 'agent-2',
          name: 'Mike Johnson',
          email: 'mike@company.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          status: 'Online',
          department: 'Support',
          activeChats: 0,
          maxChats: 5,
          skills: ['Account Management']
        },
        createdAt: '2024-01-08T14:20:00Z',
        updatedAt: '2024-01-08T14:20:00Z',
        version: 1,
        isPublished: true,
        views: 892,
        helpfulVotes: 76,
        unhelpfulVotes: 8,
        relatedArticles: ['kb-1']
      }
    ];
    setArticles(mockArticles);
  }, []);

  const categories = ['All', 'Billing', 'Account', 'Technical', 'Getting Started'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleCreateArticle = () => {
    setEditForm({ title: '', content: '', category: '', tags: '' });
    setSelectedArticle(null);
    setIsEditing(true);
  };

  const handleEditArticle = (article: KnowledgeBaseArticle) => {
    setEditForm({
      title: article.title,
      content: article.content,
      category: article.category,
      tags: article.tags.join(', ')
    });
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const handleSaveArticle = () => {
    // In real app, this would save via API
    setIsEditing(false);
    setSelectedArticle(null);
  };

  const handleVote = (articleId: string, isHelpful: boolean) => {
    setArticles(prev => prev.map(article => {
      if (article.id === articleId) {
        return {
          ...article,
          helpfulVotes: isHelpful ? article.helpfulVotes + 1 : article.helpfulVotes,
          unhelpfulVotes: !isHelpful ? article.unhelpfulVotes + 1 : article.unhelpfulVotes
        };
      }
      return article;
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Articles List */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Knowledge Base</CardTitle>
              <Button onClick={handleCreateArticle}>
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Articles List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                    selectedArticle?.id === article.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm line-clamp-2">{article.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{article.helpfulVotes}</span>
                      </div>
                    </div>
                    <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {article.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{article.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Article Detail/Editor */}
      <div className="lg:col-span-2">
        {isEditing ? (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {selectedArticle ? 'Edit Article' : 'Create New Article'}
                </CardTitle>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveArticle}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Article
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Article title..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={editForm.category} onValueChange={(value) => setEditForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                <Input
                  value={editForm.tags}
                  onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="tag1, tag2, tag3..."
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Content (Markdown supported)</label>
                <Textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your article content here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        ) : selectedArticle ? (
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{selectedArticle.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>By {selectedArticle.author.name}</span>
                    <span>•</span>
                    <span>Updated {new Date(selectedArticle.updatedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{selectedArticle.views} views</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => handleEditArticle(selectedArticle)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Article Content */}
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{selectedArticle.content}</div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Feedback */}
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Was this article helpful?</h4>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(selectedArticle.id, true)}
                    className="flex items-center space-x-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Yes ({selectedArticle.helpfulVotes})</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(selectedArticle.id, false)}
                    className="flex items-center space-x-2"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>No ({selectedArticle.unhelpfulVotes})</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an article</h3>
              <p className="text-gray-600">Choose an article to view or create a new one</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;