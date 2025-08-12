import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FreeProfile from '@/components/provider-profiles/FreeProfile';
import PreferredProfile from '@/components/provider-profiles/PreferredProfile';
import PremierProfile from '@/components/provider-profiles/PremierProfile';
import { mockProviders, providersByTier } from '@/data/mock-providers';
import { ProviderProfile } from '@/types/provider-profile';

const ProviderProfileShowcase = () => {
  const [selectedTier, setSelectedTier] = useState<'Free' | 'Preferred' | 'Premier'>('Free');
  const [selectedProvider, setSelectedProvider] = useState<ProviderProfile>(providersByTier.Free[0]);

  const handleTierChange = (tier: 'Free' | 'Preferred' | 'Premier') => {
    setSelectedTier(tier);
    setSelectedProvider(providersByTier[tier][0]);
  };

  const handleProviderChange = (providerId: string) => {
    const provider = mockProviders.find(p => p.id === providerId);
    if (provider) {
      setSelectedProvider(provider);
    }
  };

  const renderProfile = () => {
    switch (selectedTier) {
      case 'Free':
        return <FreeProfile provider={selectedProvider} />;
      case 'Preferred':
        return <PreferredProfile provider={selectedProvider} />;
      case 'Premier':
        return <PremierProfile provider={selectedProvider} />;
      default:
        return <FreeProfile provider={selectedProvider} />;
    }
  };

  const tierFeatures = {
    Free: [
      'Basic provider information',
      'Location (city/state only)',
      'Specialties and languages',
      'Availability status',
      'Professional verification badge'
    ],
    Preferred: [
      'Everything in Free, plus:',
      'Profile photo',
      'Full contact information',
      'Interactive map',
      'Office hours',
      'Social media links',
      'Extended bio (150 words)',
      'Insurance information',
      'Professional accreditations'
    ],
    Premier: [
      'Everything in Preferred, plus:',
      'Hero banner with clinic photos',
      'Photo gallery with lightbox',
      'Video introduction',
      'Patient testimonials & ratings',
      'Provider-managed FAQs',
      'Published articles showcase',
      'Upcoming events promotion',
      'Online booking integration',
      'Extended bio (300+ words)',
      'Custom content sections'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Provider Profile Showcase
              </h1>
              <p className="text-gray-600">
                Experience the power of tier-based digital identities
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Tier</label>
                <Tabs value={selectedTier} onValueChange={(value) => handleTierChange(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Free">Free</TabsTrigger>
                    <TabsTrigger value="Preferred">Preferred</TabsTrigger>
                    <TabsTrigger value="Premier">Premier</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Provider</label>
                <Select value={selectedProvider.id} onValueChange={handleProviderChange}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {providersByTier[selectedTier].map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.provider_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(tierFeatures).map(([tier, features]) => (
              <Card key={tier} className={`${selectedTier === tier ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {tier} Tier
                    <Badge variant={tier === selectedTier ? 'default' : 'secondary'}>
                      {tier === selectedTier ? 'Viewing' : 'Available'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className={feature.startsWith('Everything') ? 'font-medium text-blue-600' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Display */}
      <div className="relative">
        {renderProfile()}
      </div>
    </div>
  );
};

export default ProviderProfileShowcase;