import React from "react";
import { Provider } from "@/types/provider";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface ContactCardProps {
  provider: Provider;
}

const icons: Record<string, React.ReactNode> = {
  facebook: <Facebook />, instagram: <Instagram />,
  linkedin: <Linkedin />, twitter: <Twitter />
};

const ContactCard: React.FC<ContactCardProps> = ({ provider }) => (
  <Card>
    <CardHeader>
      <h2 className="text-lg font-medium">Contact & Links</h2>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-2">
        <Phone className="h-5 w-5" />
        <a href={`tel:${provider.contact.clinic_phone}`}>{provider.contact.clinic_phone}</a>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5" />
        <a href={`mailto:${provider.contact.provider_email}`}>{provider.contact.provider_email}</a>
      </div>
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5" />
        <a href={provider.contact.clinic_website_url} target="_blank" rel="noopener noreferrer">
          Website
        </a>
      </div>
      <div className="flex items-center gap-4 mt-2">
        {Object.entries(provider.social_media).map(([key, url]) => (
          <Button key={key} variant="ghost" size="icon" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {icons[key]}
            </a>
          </Button>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ContactCard;