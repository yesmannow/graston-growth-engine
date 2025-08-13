import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { testimonials } from '@/data/grastonPageData';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Real Stories, Real Results</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear from patients who have experienced the benefits of Graston Technique® firsthand.
          </p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col">
                    <CardContent className="flex flex-col items-center text-center p-6 flex-grow">
                      <div className="flex mb-4">
                        {Array(5).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                      </div>
                      <p className="text-muted-foreground italic mb-4 flex-grow">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.condition}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;