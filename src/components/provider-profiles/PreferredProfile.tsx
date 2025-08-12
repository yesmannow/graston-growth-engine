import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, Shield, CheckCircle, Phone, Mail, Globe, Clock,
  Facebook, Twitter, Linkedin, Instagram, ExternalLink, Star
} from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface PreferredProfileProps {
  provider: ProviderProfile;
}

const PreferredProfile = ({ provider }: PreferredProfileProps) => {
  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Photo */}
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={provider.profile_photo} alt={provider.provider_name} />
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                  {provider.provider_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {/* Provider Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {provider.provider_name}
                  </h1>
                  <Badge className="bg-green-100 text-green-800 w-fit">
                    <Shield className="h-4 w-4 mr-2" />
                    {provider.tier_badge}
                  </Badge>
                </div>

                <p className="text-xl text-gray-600 mb-2">
                  {provider.practitioner_type}
                  {provider.credentials && (
                    <span className="text-gray-500 ml-2">• {provider.credentials}</span>
                  )}
                </p>

                {provider.clinic_name && (
                  <p className="text-lg text-gray-700 mb-4">{provider.clinic_name}</p>
                )}

                {/* Location */}
                <div className="flex items-center justify-center md:justify-start text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>
                    {provider.clinic_street && `${provider.clinic_street}, `}
                    {provider.clinic_city}, {provider.clinic_state} {provider.clinic_zip}
                  </span>
                </div>

                {/* Status Indicators */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${provider.accepting_new_patients ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${provider.accepting_new_patients ? 'text-green-700' : 'text-gray-500'}`}>
                      {provider.accepting_new_patients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                    </span>
                  </div>
                  
                  {provider.telehealth_available && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="text-sm text-blue-700">Telehealth Available</span>
                    </div>
                  )}
                </div>

                {/* Experience */}
                {provider.years_experience && (
                  <p className="text-gray-600 mb-4">
                    <strong>{provider.years_experience}</strong> years of experience
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{provider.provider_bio}</p>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accreditations */}
            {provider.provider_accreditations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Professional Accreditations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {provider.provider_accreditations.map((accreditation, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{accreditation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Insurance */}
            {provider.insurance_accepted.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Accepted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {provider.insurance_accepted.map((insurance, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{insurance}</span>
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
                    <div className="text-center text-gray-600">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive Map</p>
                      <p className="text-sm">Lat: {provider.location_map.lat}, Lng: {provider.location_map.lng}</p>
                    </div>
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
                {provider.clinic_phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <a href={`tel:${provider.clinic_phone}`} className="text-blue-600 hover:underline">
                      {provider.clinic_phone}
                    </a>
                  </div>
                )}
                
                {provider.provider_email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <a href={`mailto:${provider.provider_email}`} className="text-blue-600 hover:underline">
                      {provider.provider_email}
                    </a>
                  </div>
                )}
                
                {provider.clinic_website_url && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <a 
                      href={provider.clinic_website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Office Hours */}
            {provider.office_hours && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(provider.office_hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium text-gray-700">{day}</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Languages */}
            {provider.languages_spoken.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Languages Spoken</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages_spoken.map((language, index) => (
                      <Badge key={index} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Media */}
            {Object.keys(provider.social_media).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-3">
                    {Object.entries(provider.social_media).map(([platform, url]) => {
                      if (!url) return null;
                      const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upgrade CTA */}
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Unlock Premier Features
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Add photo galleries, testimonials, FAQs, and more with Premier.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Upgrade to Premier
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferredProfile;