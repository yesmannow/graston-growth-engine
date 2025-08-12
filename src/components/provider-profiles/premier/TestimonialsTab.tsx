import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface TestimonialsTabProps {
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

const TestimonialsTab = ({ provider }: TestimonialsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Patient Testimonials
        </CardTitle>
      </CardHeader>
      <CardContent>
        {provider.testimonials && provider.testimonials.length > 0 ? (
          <div className="space-y-6">
            {provider.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{testimonial.patient_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.patient_name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(testimonial.rating)}</div>
                        {testimonial.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No testimonials available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialsTab;