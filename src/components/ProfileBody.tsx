"use client";

import React from "react";
import { Provider } from "@/types/provider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface ProfileBodyProps {
  provider: Provider;
}

const ProfileBody: React.FC<ProfileBodyProps> = ({ provider }) => {
  return (
    <Tabs defaultValue="about" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="specialties">Specialties</TabsTrigger>
        <TabsTrigger value="training">Training & CEUs</TabsTrigger>
        <TabsTrigger value="hours">Office Hours</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="video">Video</TabsTrigger>
      </TabsList>

      <TabsContent value="about">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">About Our Clinic</h3>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: provider.media_content.about_clinic }} />
            <p>{provider.bio_experience.provider_bio}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>{provider.bio_experience.years_experience} years experience</strong><br/>
              {provider.bio_experience.associations_affiliations}
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specialties">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Conditions Treated</h3>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {provider.specialties.conditions_treated.map(c => (
              <span key={c.id} className="px-2 py-1 bg-secondary text-secondary-foreground rounded">{c.name}</span>
            ))}
          </CardContent>
          <Separator />
          <CardHeader>
            <h3 className="text-lg font-medium">Insurance Accepted</h3>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {provider.specialties.insurance_accepted.map(i => (
              <span key={i.id} className="px-2 py-1 bg-secondary text-secondary-foreground rounded">{i.name}</span>
            ))}
          </CardContent>
          <Separator />
          <CardHeader>
            <h3 className="text-lg font-medium">Payment Methods</h3>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {provider.specialties.payment_methods.map(m => (
              <span key={m} className="px-2 py-1 bg-secondary text-secondary-foreground rounded">{m}</span>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="training">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Training & CEUs</h3>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th>Course</th>
                  <th>Date</th>
                  <th>CEU</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {provider.training_and_ceus.training_completed.map((t, i) => (
                  <tr key={i} className="border-t">
                    <td>{t.training_name}</td>
                    <td>{t.training_date}</td>
                    <td>{t.ceu_value}</td>
                    <td>
                      <a href={t.certificate_upload.url} className="text-blue-600 hover:underline">
                        {t.certificate_upload.filename}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="hours">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Office Hours</h3>
          </CardHeader>
          <CardContent className="space-y-2">
            {provider.availability.office_hours.map((h, i) => (
              <div key={i} className="flex justify-between">
                <span>{h.day_of_week}</span>
                <span>{h.open_time} – {h.close_time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Testimonials (Avg. {provider.reviews_and_faqs.avg_rating})</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {provider.reviews_and_faqs.testimonials.map((r, i) => (
              <div key={i}>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{r.patient_name_initials}</span>
                  <span className="text-sm">{"★".repeat(r.testimonial_rating)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{r.testimonial_text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="faqs">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">FAQs</h3>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {provider.reviews_and_faqs.faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: f.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="gallery">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {provider.media_content.clinic_gallery.map((img, i) => (
            <img key={i} src={img.url} alt={img.alt} className="w-full h-40 object-cover rounded" />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="video">
        <div className="aspect-video">
          <iframe
            title="intro-video"
            src={provider.media_content.video_intro.replace("watch?v=", "embed/")}
            width="100%" height="100%" allowFullScreen
            className="rounded"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileBody;