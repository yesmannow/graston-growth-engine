import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProviderProfile } from '@/types/provider-profile';

interface InsuranceCardProps {
  provider: ProviderProfile;
}

const InsuranceCard = ({ provider }: InsuranceCardProps) => {
  if (!provider.insurance_accepted || provider.insurance_accepted.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance Accepted</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {(provider.insurance_accepted || []).map((insurance, index) => (
            <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded text-center">
              {insurance}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceCard;