import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquareQuote } from 'lucide-react';
import { Testimonial } from '@/types/index';

interface TestimonialsCardProps {
  testimonials?: Testimonial[];
}

const TestimonialsCard = ({ testimonials }: TestimonialsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareQuote className="h-5 w-5" />
          Patient Testimonials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial, index) => (
            <div key={index} className="flex gap-4">
              <Avatar>
                <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{testimonial.author}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">"{testimonial.text}"</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No testimonials available yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialsCard;