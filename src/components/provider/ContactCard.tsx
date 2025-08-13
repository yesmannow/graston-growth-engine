import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FullProviderProfile } from '@/types';
import { Mail, Phone, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';

interface ContactCardProps {
  provider: FullProviderProfile;
}

const ContactCard = ({ provider }: ContactCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <a href={`mailto:${provider.email}`} className="flex items-center gap-3 hover:text-primary transition-colors">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{provider.email}</span>
          </a>
          <a href={`tel:${provider.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{provider.phone}</span>
          </a>
          <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span>{provider.website}</span>
          </a>
        </div>
        <div className="flex gap-2 pt-2 border-t">
          <Button variant="ghost" size="icon" asChild>
            <a href={provider.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={provider.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={provider.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
              <Instagram className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;