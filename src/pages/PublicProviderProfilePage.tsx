"use client";

import { useParams } from "react-router-dom";
import { mockProviders } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Globe, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FullProviderProfile, ContactInfo, Testimonial, FAQ } from "@/types"; // All types now correctly imported

const tierColors: { [key: string]: string } = {
  Premier: "bg-purple-600 hover:bg-purple-700 text-white",
  Preferred: "bg-blue-500 hover:bg-blue-600 text-white",
  Free: "bg-gray-500 hover:bg-gray-600 text-white",
};

const PublicProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const provider = mockProviders.find((p) => p.id === id);

  if (!provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Provider not found</h1>
        <p>The provider you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="mb-6">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 p-6">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={provider.profileImage} alt={provider.name} />
            <AvatarFallback className="text-4xl">
              {provider.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-foreground">{provider.name}</h1>
            <p className="text-lg text-muted-foreground mt-1">{provider.specialty}</p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mt-2">
              <MapPin className="h-4 w-4" />
              <span>{provider.location}</span>
              <Badge className={tierColors[provider.tier]}>
                <Star className="h-3 w-3 mr-1" />
                {provider.tier}
              </Badge>
            </div>
          </div>
          {provider.contactInfo && (
            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              {provider.contactInfo.phone && (
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {provider.contactInfo.phone}
                </Button>
              )}
              {provider.contactInfo.website && (
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <a href={provider.contactInfo.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardHeader>
        <Separator />
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-3">About {provider.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{provider.bio}</p>

          {provider.servicesOffered && provider.servicesOffered.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-6 mb-3">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {provider.servicesOffered.map((service: string, index: number) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                    {service}
                  </Badge>
                ))}
              </div>
            </>
          )}

          {provider.galleryImages && provider.galleryImages.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-6 mb-3">Gallery</h2>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {provider.galleryImages.map((image: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <img src={image} alt={`Gallery image ${index + 1}`} className="object-cover w-full h-full rounded-md" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </>
          )}

          {provider.testimonials && provider.testimonials.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-6 mb-3">Testimonials</h2>
              <div className="grid gap-4">
                {provider.testimonials.map((testimonial: Testimonial, index: number) => (
                  <Card key={index} className="p-4">
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    <p className="text-sm font-semibold mt-2">- {testimonial.author}</p>
                  </Card>
                ))}
              </div>
            </>
          )}

          {provider.faqs && provider.faqs.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-6 mb-3">FAQs</h2>
              <div className="grid gap-4">
                {provider.faqs.map((faq: FAQ, index: number) => (
                  <Card key={index} className="p-4">
                    <CardTitle className="text-lg mb-2">{faq.question}</CardTitle>
                    <CardContent className="p-0 text-muted-foreground">{faq.answer}</CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicProviderProfilePage;