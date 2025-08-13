import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface ContactInfoCardProps {
  provider: ProviderProfile;
}

const ContactInfoCard = ({ provider }: ContactInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {provider.clinic_name && (
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{provider.clinic_name}</h4>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="text-sm text-gray-700">
              {provider.clinic_street && <div>{provider.clinic_street}</div>}
              <div>{provider.clinic_city}, {provider.clinic_state} {provider.clinic_zip}</div>
            </div>
          </div>
          
          {provider.clinic_phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <a href={`tel:${provider.clinic_phone}`} className="text-sm text-blue-600 hover:underline">
                {provider.clinic_phone}
              </a>
            </div>
          )}
          
          {provider.provider_email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <a href={`mailto:${provider.provider_email}`} className="text-sm text-blue-600 hover:underline">
                {provider.provider_email}
              </a>
            </div>
          )}
          
          {provider.clinic_website_url && (
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-500" />
              <a 
                href={provider.clinic_website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                Visit Website
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;