import React, { useState } from "react";
import ProfileTabs from "./ProfileTabs";
import AboutCard from "./AboutCard";
import ServicesCard from "./ServicesCard";
import MediaCard from "./MediaCard";
import TestimonialsCard from "./TestimonialsCard";
import FaqCard from "./FaqCard";
import type { FullProviderProfile } from "@/types";

interface ProfileBodyProps {
  provider: FullProviderProfile;
}

const tabs = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "media", label: "Media" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
];

const ProfileBody = ({ provider }: ProfileBodyProps) => {
  const [activeTab, setActiveTab] = useState<string>("about");

  return (
    <div>
      <ProfileTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="mt-6 space-y-6">
        {activeTab === "about" && (
          <AboutCard bio={provider.bio_experience.provider_bio} />
        )}
        {activeTab === "services" && (
          <ServicesCard
            services={provider.specialties.conditions_treated.map(
              (c) => c.name
            )}
          />
        )}
        {activeTab === "media" && (
          <MediaCard media={provider.media_content.clinic_gallery} />
        )}
        {activeTab === "testimonials" && (
          <TestimonialsCard
            testimonials={provider.reviews_and_faqs.testimonials.map(
              (t) => ({
                avatar: "",
                author: t.patient_name_initials,
                rating: t.testimonial_rating,
                text: t.testimonial_text,
              })
            )}
          />
        )}
        {activeTab === "faq" && (
          <FaqCard faqs={provider.reviews_and_faqs.faqs} />
        )}
      </div>
    </div>
  );
};

export default ProfileBody;