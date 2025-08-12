import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  MapPin, Shield, CheckCircle, Phone, Mail, Globe, Clock, Star,
  Facebook, Twitter, Linkedin, Instagram, ExternalLink, Calendar,
  FileText, Video, Award, Users, BookOpen, ChevronRight, Play
} from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface PremierProfileProps {
  provider: ProviderProfile;
}

const PremierProfile = ({ provider }: PremierProfileProps) => {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  
  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        {provider.clinic_gallery && provider.clinic_gallery[0] && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${provider.clinic_gallery[0]})` }}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative max-w-6xl mx-auto px-4 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <Avatar className="h-40 w-40 border-4 border-white shadow-2xl">
              <AvatarImage src={provider.profile_photo} alt={provider.provider_name} />
              <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                {provider.provider_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold">{provider.provider_name}</h1>
                <Badge className="bg-yellow-500 text-yellow-900 w-fit">
                  <Award className="h-4 w-4 mr-2" />
                  {provider.tier_badge}
                </Badge>
              </div>
              
              <p className="text-xl mb-2">
                {provider.practitioner_type}
                {provider.credentials && (
                  <span className="ml-2">• {provider.credentials}</span>
                )}
              </p>
              
              {provider.clinic_name && (
                <p className="text-lg mb-4">{provider.clinic_name}</p>
              )}
              
              {provider.avg_rating && (
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <div className="flex">{renderStars(provider.avg_rating)}</div>
                  <span className="text-lg font-semibold">{provider.avg_rating}</span>
                  <span className="text-sm opacity-90">
                    ({provider.testimonials?.length || 0} reviews)
                  </span>
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center">
                  <CheckCircle className={`h-5 w-5 mr-2 ${provider.accepting_new_patients ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className="text-sm">
                    {provider.accepting_new_patients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                  </span>
                </div>
                
                {provider.telehealth_available && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-400" />
                    <span className="text-sm">Telehealth Available</span>
                  </div>
                )}
                
                {provider.years_experience && (
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="text-sm">{provider.years_experience} Years Experience</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {provider.clinic_city}, {provider.clinic_state}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {provider.clinic_phone}
              </div>
            </div>
            
            <div className="flex gap-3">
              {provider.booking_url && (
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              )}
              <Button variant="outline" size="lg">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="testimonials">Reviews</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Video Introduction */}
                {provider.video_intro && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Video className="h-5 w-5 mr-2" />
                        Introduction Video
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Video Introduction</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Dr. {provider.provider_name.split(' ').pop()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-lg">{provider.provider_bio}</p>
                  </CardContent>
                </Card>

                {/* Specialties */}
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {provider.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="font-medium text-gray-800">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Accreditations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Professional Credentials & Accreditations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {provider.provider_accreditations.map((accreditation, index) => (
                        <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <Award className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                          <span className="font-medium text-gray-800">{accreditation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery">
                <Card>
                  <CardHeader>
                    <CardTitle>Clinic Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.clinic_gallery && provider.clinic_gallery.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {provider.clinic_gallery.map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedGalleryImage(image)}
                          >
                            <img src={image} alt={`Clinic ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No gallery images available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Patient Testimonials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.testimonials && provider.testimonials.length > 0 ? (
                      <div className="space-y-6">
                        {provider.testimonials.map((testimonial) => (
                          <div key={testimonial.id} className="border-l-4 border-blue-500 pl-6 py-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex">{renderStars(testimonial.rating)}</div>
                              <span className="font-semibold text-gray-800">{testimonial.patient_name}</span>
                              {testimonial.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
                            <p className="text-sm text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No testimonials available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="articles">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Published Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.published_articles && provider.published_articles.length > 0 ? (
                      <div className="space-y-4">
                        {provider.published_articles.map((article) => (
                          <div key={article.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                            <p className="text-gray-600 mb-3">{article.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{new Date(article.published_date).toLocaleDateString()}</span>
                              <span>{article.read_time} min read</span>
                            </div>
                            <Button variant="outline" className="mt-3">
                              Read Article <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No articles published yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {provider.faqs && provider.faqs.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {provider.faqs.map((faq) => (
                          <AccordionItem key={faq.id} value={faq.id}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No FAQs available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {provider.clinic_phone && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`tel:${provider.clinic_phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {provider.clinic_phone}
                    </a>
                  </Button>
                )}
                
                {provider.provider_email && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`mailto:${provider.provider_email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                )}
                
                {provider.clinic_website_url && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={provider.clinic_website_url} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}

                {provider.booking_url && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <a href={provider.booking_url} target="_blank" rel="noopener noreferrer">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Online
                    </a>
                  </Button>
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
                      <div key={day} className="flex justify-between py-1">
                        <span className="font-medium text-gray-700">{day}</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Events */}
            {provider.upcoming_events && provider.upcoming_events.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {provider.upcoming_events.map((event) => (
                      <div key={event.id} className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </div>
                        </div>
                        <Button size="sm" className="mt-2 w-full" asChild>
                          <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                            Register
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Insurance */}
            <Card>
              <CardHeader>
                <CardTitle>Insurance Accepted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {provider.insurance_accepted.map((insurance, index) => (
                    <div key={index} className="flex items-center p-2 bg-green-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">{insurance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
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

            {/* Social Media */}
            {Object.keys(provider.social_media).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
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
                          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img 
              src={selectedGalleryImage} 
              alt="Gallery" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PremierProfile;