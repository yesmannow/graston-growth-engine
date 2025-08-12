"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProviderById } from "@/api/providers";
import { Provider } from "@/types/provider";
import ProfileHeader from "@/components/ProfileHeader";
import ContactCard from "@/components/ContactCard";
import LocationCard from "@/components/LocationCard";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ProviderDetail = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!providerId) return;
    setLoading(true);
    getProviderById(Number(providerId)).then((data: Provider | null) => {
      setProvider(data);
      setLoading(false);
    });
  }, [providerId]);

  if (loading) return <p>Loading…</p>;
  if (!provider) return <p className="text-center p-8">Profile Not Found</p>;

  return (
    <>
      <ProfileHeader provider={provider} />
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContactCard provider={provider} />
          <LocationCard provider={provider} />
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader><h2 className="text-lg font-medium">About</h2></CardHeader>
            <CardContent>
              <div
                dangerouslySetInnerHTML={{ __html: provider.media_content.about_clinic }}
              />
              <p className="mt-4">{provider.bio_experience.provider_bio}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {provider.bio_experience.years_experience} years’ experience<br />
                {provider.bio_experience.associations_affiliations}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProviderDetail;