import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface CertificationsCardProps {
  provider: ProviderProfile;
}

const CertificationsCard = ({ provider }: CertificationsCardProps) => {
  if (!provider.provider_accreditations || provider.provider_accreditations.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certifications & Accreditations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {(provider.provider_accreditations || []).map((accreditation, index) => (
            <div key={index} className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-700">{accreditation}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationsCard;