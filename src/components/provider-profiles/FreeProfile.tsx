import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Shield, CheckCircle, Phone, Globe } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface FreeProfileProps {
  provider: ProviderProfile;
}

const FreeProfile = ({ provider }: FreeProfileProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            {/* Verification Badge */}
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                <Shield className="h-4 w-4 mr-2" />
                {provider.tier_badge}
              </Badge>
            </div>

            {/* Provider Name & Credentials */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {provider.provider_name}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {provider.practitioner_type}
              {provider.credentials && (
                <span className="text-gray-500 ml-2">• {provider.credentials}</span>
              )}
            </p>

            {/* Location */}
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{provider.clinic_city}, {provider.clinic_state}</span>
            </div>

            {/* Bio */}
            <p className="text-gray-700 leading-relaxed max-w-lg mx-auto">
              {provider.provider_bio}
            </p>
          </CardContent>
        </Card>

        {/* Status Indicators */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className={`h-5 w-5 mr-3 ${provider.accepting_new_patients ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={provider.accepting_new_patients ? 'text-green-700' : 'text-gray-500'}>
                  {provider.accepting_new_patients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                </span>
              </div>
              
              {provider.telehealth_available && (
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-blue-500" />
                  <span className="text-blue-700">Telehealth Available</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Specialties */}
        {provider.specialties.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {provider.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Languages */}
        {provider.languages_spoken.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Languages Spoken</h2>
              <div className="flex flex-wrap gap-2">
                {provider.languages_spoken.map((language, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upgrade CTA */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Want to showcase more of your practice?
              </h3>
              <p className="text-gray-600 mb-4">
                Upgrade to Preferred or Premier to add contact information, photos, and more.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade Profile
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FreeProfile;