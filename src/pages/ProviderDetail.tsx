"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProviderById } from "@/api/providers";
import { Provider } from "@/types/provider";
import ProfileHeader from "@/components/ProfileHeader";
import ContactCard from "@/components/ContactCard";
import LocationCard from "@/components/LocationCard";
import ProfileBody from "@/components/ProfileBody";

const ProviderDetail = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!providerId) return;
    setLoading(true);
    getProviderById(Number(providerId)).then(data => {
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
        </div>
        <ProfileBody provider={provider} />
      </div>
    </>
  );
};

export default ProviderDetail;