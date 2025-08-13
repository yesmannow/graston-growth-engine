import { FullProviderProfile, Tier } from '@/types';
import { mockProviderData } from '@/lib/mockData';
import smallProvidersRaw from '@/lib/smallProviderData.json';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mapMockToFullProfile } from '@/lib/dataMapping';

const smallProviders: FullProviderProfile[] = (smallProvidersRaw as any[]).map(mapMockToFullProfile);

const ComparePage = () => {
  const [providersToCompare, setProvidersToCompare] = useState<FullProviderProfile[]>([]);

  const handleAddProvider = (provider: FullProviderProfile) => {
    if (providersToCompare.length < 3 && !providersToCompare.find(p => p.id === provider.id)) {
      setProvidersToCompare([...providersToCompare, provider]);
    }
  };

  const handleRemoveProvider = (providerId: string) => {
    setProvidersToCompare(providersToCompare.filter(p => p.id !== providerId));
  };

  const features = [
    { key: 'tier', label: 'Membership Tier' },
    { key: 'grastonLevel', label: 'Graston Level' },
    { key: 'rating', label: 'Rating' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'services', label: 'Services Offered' },
  ];

  const renderFeature = (provider: FullProviderProfile, featureKey: keyof FullProviderProfile) => {
    const value = provider[featureKey];
    if (Array.isArray(value)) {
      return value.length > 0 ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />;
    }
    if (typeof value === 'number') {
      return <span className="font-semibold">{value}</span>;
    }
    if (typeof value === 'string') {
      return <Badge variant={featureKey === 'tier' ? 'default' : 'secondary'}>{value}</Badge>;
    }
    return <XCircle className="text-red-500" />;
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Compare Providers</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Providers to Compare (up to 3)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {smallProviders.map(provider => (
            <Button 
              key={provider.id} 
              onClick={() => handleAddProvider(provider)}
              disabled={providersToCompare.length >= 3 || !!providersToCompare.find(p => p.id === provider.id)}
              variant="outline"
            >
              {provider.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {providersToCompare.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 font-semibold w-1/4">Feature</th>
                    {providersToCompare.map(provider => (
                      <th key={provider.id} className="p-4 font-semibold w-1/4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={provider.profileImage} />
                              <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{provider.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveProvider(provider.id)}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map(feature => (
                    <tr key={feature.key} className="border-b last:border-0">
                      <td className="p-4 font-medium">{feature.label}</td>
                      {providersToCompare.map(provider => (
                        <td key={provider.id} className="p-4">
                          {renderFeature(provider, feature.key as keyof FullProviderProfile)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComparePage;