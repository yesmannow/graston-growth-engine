import { useParams } from "react-router-dom";
import { mockProviders } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FullProviderProfile, Testimonial, FAQ } from "@/types";
import ProfileSidebar from "@/components/provider/ProfileSidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const tierColors: { [key: string]: string } = {
  Premier: "bg-purple-600 hover:bg-purple-700 text-white",
  Preferred: "bg-blue-500 hover:bg-blue-600 text-white",
  Free: "bg-gray-500 hover:bg-gray-600 text-white",
};

const PublicProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<FullProviderProfile | undefined>(
    mockProviders.find((p) => p.id === id)
  );

  if (!provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Provider not found</h1>
        <p>The provider you are looking for does not exist.</p>
      </div>
    );
  }

  const handleToggleFavorite = (providerId: string) => {
    setProvider(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        isFavorite: !prev.isFavorite,
      };
    });
  };

  return (
    <div className="bg-muted/20">
      <div className="container mx-auto p-4 md:p-8">
        {/* Sticky Hero Section */}
        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src={provider.profileImage} alt={provider.name} />
                <AvatarFallback className="text-4xl">
                  {provider.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <h1 className="text-3xl font-bold text-foreground">{provider.name}</h1>
                  {provider.tier && (
                    <Badge className={`${tierColors[provider.tier]} px-3 py-1 text-sm`}>
                      <Star className="h-4 w-4 mr-1.5" />
                      {provider.tier} Member
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-muted-foreground mt-1">{provider.specialty}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.location}</span>
                </div>
                {provider.gtCertifications && provider.gtCertifications.length > 0 && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    {provider.gtCertifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">GT {cert}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">About {provider.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p className="leading-relaxed">{provider.bio || "No bio provided yet."}</p>
                <div>
                  {provider.experience && <p><strong>Experience:</strong> {provider.experience}</p>}
                  {provider.education && <p><strong>Education:</strong> {provider.education}</p>}
                </div>
              </CardContent>
            </Card>

            {provider.services && provider.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Specialties & Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.services.map((service: string, index: number) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 text-base">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gallery Section */}
            {(provider.galleryImages && provider.galleryImages.length > 0) || (provider.galleryVideos && provider.galleryVideos.length > 0) ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Clinic Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <Carousel className="w-full max-w-full mx-auto">
                    <CarouselContent>
                      {provider.galleryImages?.map((image: string, index: number) => (
                        <CarouselItem key={`img-${index}`} className="md:basis-1/2">
                          <img src={image} alt={`Gallery image ${index + 1}`} className="object-cover w-full h-64 rounded-lg border" />
                        </CarouselItem>
                      ))}
                      {provider.galleryVideos?.map((videoUrl: string, index: number) => (
                        <CarouselItem key={`vid-${index}`} className="md:basis-1/2">
                          <iframe
                            className="w-full h-64 rounded-lg border"
                            src={videoUrl.includes("youtube.com") ? videoUrl.replace("watch?v=", "embed/") : videoUrl}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={`Embedded video ${index + 1}`}
                          ></iframe>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>
              </Card>
            ) : null}

            {/* Reviews Section */}
            {provider.testimonials && provider.testimonials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">What Patients Are Saying</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {provider.testimonials.map((testimonial: Testimonial, index: number) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <p className="text-muted-foreground text-lg italic">"{testimonial.quote}"</p>
                      <p className="text-sm font-semibold mt-2">- {testimonial.author}</p>
                      {testimonial.source && <p className="text-xs text-muted-foreground">Source: {testimonial.source}</p>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* FAQs Section */}
            {provider.faqs && provider.faqs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {provider.faqs.map((faq: FAQ, index: number) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="font-medium text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2 text-base">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {provider.tier === 'Premier' && (
                <Card className="shadow-lg border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Request an Appointment</CardTitle>
                    <CardDescription>Send a direct message to {provider.name}.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Input placeholder="Your Name" />
                      <Input type="email" placeholder="Your Email" />
                      <Textarea placeholder="Your Message" rows={4} />
                      <Button className="w-full" size="lg">Send Message</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              <ProfileSidebar provider={provider} onToggleFavorite={handleToggleFavorite} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProviderProfilePage;