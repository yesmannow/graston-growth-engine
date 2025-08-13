import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Shield, 
  CheckCircle, 
  XCircle,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink
} from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface PreferredProfileProps {
  provider: ProviderProfile;
}

const PreferredProfile = ({ provider }: PreferredProfileProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSocialIcon = (platform: string) => {
    const icons = {
      facebook: Facebook,
      twitter: Twitter,
      linkedin: Linkedin,
      instagram: Instagram
    };
    return icons[platform as keyof typeof icons] || Globe;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32"></div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-12">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={provider.profile_photo} alt={provider.provider_name} />
              <AvatarFallback className="text-2xl bg-blue-100">
                {provider.provider_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {provider.provider_name}
                </h1>
                <Badge className="bg-blue-100 text-blue-800 w-fit">
                  <Shield className="h-4 w-4 mr-1" />
                  {provider.tier_badge}
                </Badge>
              </div>
              
              <p className="text-lg text-gray-600 mb-2">{provider.credentials}</p>
              <p className="text-xl font-medium text-gray-800">{provider.practitioner_type}</p>
              
              {provider.avg_rating && (
                <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                  <div className="flex">{renderStars(provider.avg_rating)}</div>
                  <span className="text-sm text-gray-600">
                    {provider.avg_rating} ({provider.total_reviews} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          {provider.provider_bio && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{provider.provider_bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Specialties & Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(provider.specialties || []).map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conditions Treated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(provider.conditions_treated || []).map((condition, index) => (
                    <Badge key={index} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Office Hours */}
          {provider.office_hours && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.office_hours.map((hours, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-gray-700">{hours.day}</span>
                      <span className="text-gray-600">
                        {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map */}
          {provider.location_map && (
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Component</p>
                  <p className="text-xs text-gray-400 ml-2">
                    ({provider.location_map.lat}, {provider.location_map.lng})
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
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

          {/* Availability Status */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                {provider.accepting_new_patients ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-700">
                  {provider.accepting_new_patients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {provider.telehealth_available ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm text-gray-700">
                  {provider.telehealth_available ? 'Telehealth Available' : 'In-Person Only'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Accreditations */}
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

          {/* Insurance */}
          <Card>
            <CardHeader>
              <CardTitle>Insurance Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(provider.insurance_accepted || []).map((insurance, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • {insurance}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {provider.social_media && (
            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {Object.entries(provider.social_media).map(([platform, url]) => {
                    if (!url) return null;
                    const Icon = getSocialIcon(platform);
                    return (
                      <Button key={platform} variant="outline" size="sm" asChild>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <Icon className="h-4 w-4" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreferredProfile;