import { useParams } from "react-router-dom";
import { mockProviders } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star } from "lucide-react"; // Removed Input from lucide-react
import { Input } from "@/components/ui/input"; // Added Input from shadcn/ui
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
    // In a real app, you'd update this in your backend/local storage
    // For now, just a local state update
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Sticky Hero Section */}
      <div className="bg-card p-6 rounded-lg shadow-sm mb-6 sticky top-0 z-10 border-b md:border-none md:shadow-none md:rounded-none">
        <div className="flex flex-col md:flex-row items-center gap-6">
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
              {provider.tier && (
                <Badge className={tierColors[provider.tier]}>
                  <Star className="h-3 w-3 mr-1" />
                  {provider.tier}
                </Badge>
              )}
            </div>
            {provider.gtCertifications && provider.gtCertifications.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                {provider.gtCertifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs">GT {cert}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Left Column: Main Profile Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Accordion type="multiple" defaultValue={["about", "specialties", "languages", "patient-types"]}>
                <AccordionItem value="about">
                  <AccordionTrigger className="text-xl font-semibold">About {provider.name}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {provider.bio || "No bio provided yet."}
                    {provider.experience && <p className="mt-2"><strong>Experience:</strong> {provider.experience}</p>}
                    {provider.education && <p><strong>Education:</strong> {provider.education}</p>}
                  </AccordionContent>
                </AccordionItem>

                {provider.services && provider.services.length > 0 && (
                  <AccordionItem value="specialties">
                    <AccordionTrigger className="text-xl font-semibold">Specialties & Services</AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="flex flex-wrap gap-2">
                        {provider.services.map((service: string, index: number) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {provider.languagesSpoken && provider.languagesSpoken.length > 0 && (
                  <AccordionItem value="languages">
                    <AccordionTrigger className="text-xl font-semibold">Languages Spoken</AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="flex flex-wrap gap-2">
                        {provider.languagesSpoken.map((language: string, index: number) => (
                          <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {provider.patientTypes && provider.patientTypes.length > 0 && (
                  <AccordionItem value="patient-types">
                    <AccordionTrigger className="text-xl font-semibold">Patient Types</AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="flex flex-wrap gap-2">
                        {provider.patientTypes.map((type: string, index: number) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>

          {/* Gallery Section */}
          {(provider.galleryImages && provider.galleryImages.length > 0) || (provider.galleryVideos && provider.galleryVideos.length > 0) ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Gallery</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Carousel className="w-full max-w-lg mx-auto">
                  <CarouselContent>
                    {provider.galleryImages?.map((image: string, index: number) => (
                      <CarouselItem key={`img-${index}`}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-video items-center justify-center p-2">
                              <img src={image} alt={`Gallery image ${index + 1}`} className="object-cover w-full h-full rounded-md" />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                    {provider.galleryVideos?.map((videoUrl: string, index: number) => (
                      <CarouselItem key={`vid-${index}`}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-video items-center justify-center p-2">
                              <iframe
                                className="w-full h-full rounded-md"
                                src={videoUrl.includes("youtube.com") ? videoUrl.replace("watch?v=", "embed/") : videoUrl}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={`Embedded video ${index + 1}`}
                              ></iframe>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          ) : null}

          {/* Contact Form (Premier Only) - Placeholder */}
          {provider.tier === 'Premier' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Contact {provider.name}</CardTitle>
                <CardDescription>Send a direct message to {provider.name}.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <Button className="w-full">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews Section */}
          {provider.testimonials && provider.testimonials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Reviews</CardTitle>
                <CardDescription>What patients are saying about {provider.name}.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {provider.testimonials.map((testimonial: Testimonial, index: number) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
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
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {provider.faqs.map((faq: FAQ, index: number) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="font-medium">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
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
          <ProfileSidebar provider={provider} onToggleFavorite={handleToggleFavorite} />
        </div>
      </div>
    </div>
  );
};

export default PublicProviderProfilePage;