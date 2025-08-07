"use client";

import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileHero from '@/components/provider/ProfileHero';
import ProfileSidebar from '@/components/provider/ProfileSidebar';
import { mockProviders } from '@/lib/mockData';
import { FullProviderProfile } from '@/types';

const PublicProviderProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const provider = mockProviders.find((p) => p.id === id) as FullProviderProfile;

  if (!provider) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Provider not found</h1>
      </div>
    );
  }

  return (
    <div>
      <ProfileHero provider={provider} />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
        {/* Sidebar */}
        <ProfileSidebar provider={provider} />

        {/* Main content */}
        <div className="lg:col-span-3 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">{provider.bio}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Specialties</h2>
            <ul className="list-disc list-inside">
              {provider.servicesOffered?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
          {/* Add further sections (languages, gallery, reviews, etc.) here */}
        </div>
      </div>
    </div>
  );
};

export default PublicProviderProfilePage;