import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Shield, CheckCircle, XCircle } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface FreeProfileProps {
  provider: ProviderProfile;
}

const FreeProfile = ({ provider }: FreeProfileProps) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {provider.provider_name}
          </h1>
          <p className="text-lg text-gray-600 mb-3">
            {provider.credentials}
          </p>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Shield className="h-4 w-4 mr-1" />
            {provider.tier_badge}
          </Badge>
        </div>
        
        <div className="text-gray-700">
          <p className="text-xl font-medium mb-2">{provider.practitioner_type}</p>
        </div>
      </div>

      {/* Location */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-lg text-gray-700">
              {provider.clinic_city}, {provider.clinic_state}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Specialties */}
      {provider.specialties && provider.specialties.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
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

      {/* Availability Status */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              {provider.accepting_new_patients ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mr-3" />
              )}
              <span className="text-gray-700">
                {provider.accepting_new_patients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
              </span>
            </div>
            
            <div className="flex items-center">
              {provider.telehealth_available ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400 mr-3" />
              )}
              <span className="text-gray-700">
                {provider.telehealth_available ? 'Telehealth Available' : 'In-Person Only'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accreditations */}
      {provider.provider_accreditations && provider.provider_accreditations.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
            <div className="space-y-2">
              {provider.provider_accreditations.map((accreditation, index) => (
                <div key={index} className="flex items-center">
                  <Shield className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-700">{accreditation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Verified Graston Technique® Provider
        </p>
      </div>
    </div>
  );
};

export default FreeProfile;