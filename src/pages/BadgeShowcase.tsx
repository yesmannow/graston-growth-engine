import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BadgeShowcase = () => {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Badge Showcase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Tier Badges</h3>
            <div className="flex gap-2">
              <Badge className="bg-purple-600">Premier</Badge>
              <Badge className="bg-blue-600">Preferred</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgeShowcase;