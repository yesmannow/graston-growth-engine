import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { providerTestimonials } from '@/data/forProvidersPageData';
import { TrendingUp } from 'lucide-react';

const ProviderTestimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Provider Success Stories</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our Premier providers are saying.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {providerTestimonials.map((testimonial) => (
            <Card key={testimonial.name} className="shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {testimonial.metric}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProviderTestimonials;