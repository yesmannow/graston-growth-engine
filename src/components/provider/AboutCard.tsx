import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

interface AboutCardProps {
  bio?: string;
}

const AboutCard = ({ bio }: AboutCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          About
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed text-muted-foreground">
          {bio || 'No biography provided.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default AboutCard;