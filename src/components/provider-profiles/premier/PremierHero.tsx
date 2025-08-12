import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Calendar, MessageSquare, Award } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface PremierHeroProps {
  provider: ProviderProfile;
}

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

const PremierHero = ({ provider }: PremierHeroProps) => {
  return (
    <div className="relative">
      <div className="h-80 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {provider.clinic_gallery && provider.clinic_gallery[0] && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${provider.clinic_gallery[0].url})` }}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end gap-8 -mt-32">
          <Avatar className="h-40 w-40 border-6 border-white shadow-2xl">
            <AvatarImage src={provider.profile_photo} alt={provider.provider_name} />
            <AvatarFallback className="text-3xl bg-blue-100">
              {provider.provider_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center lg:text-left pb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {provider.provider_name}
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">{provider.credentials}</p>
                  <p className="text-lg font-medium text-gray-800">{provider.practitioner_type}</p>
                </div>
                
                <div className="flex flex-col items-center lg:items-end gap-3">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
                    <Award className="h-4 w-4 mr-2" />
                    {provider.tier_badge}
                  </Badge>
                  
                  {provider.avg_rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(provider.avg_rating)}</div>
                      <span className="text-sm font-medium text-gray-700">
                        {provider.avg_rating} ({provider.total_reviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {provider.booking_url && (
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                    <a href={provider.booking_url} target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment
                    </a>
                  </Button>
                )}
                <Button size="lg" variant="outline">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremierHero;