"use client";

import React from "react";
import { useParams } from "react-router-dom";
import { useProvider } from "@/hooks/useProvider";
import type { FullProviderProfile } from "@/types";
import ProfileHeader from "@/components/ProfileHeader";
import ContactCard from "@/components/ContactCard";
import LocationCard from "@/components/LocationCard";
import ProfileBody from "@/components/ProfileBody";
import { Skeleton } from "@/components/ui/skeleton";

const ProviderDetail = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const id = providerId ? parseInt(providerId, 10) : null;
  const { data: provider, isLoading, isError } = useProvider(id);

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  if (isError || !provider) return <p className="text-center p-8">Profile Not Found</p>;

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