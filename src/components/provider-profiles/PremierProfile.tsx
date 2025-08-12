import React from 'react';
import { ProviderProfile } from '@/types/provider-profile';
import PremierHero from './premier/PremierHero';
import PremierContentTabs from './premier/PremierContentTabs';
import ContactFormCard from './premier/ContactFormCard';
import ContactInfoCard from './premier/ContactInfoCard';
import OfficeHoursCard from './premier/OfficeHoursCard';
import AvailabilityCard from './premier/AvailabilityCard';
import CertificationsCard from './premier/CertificationsCard';
import InsuranceCard from './premier/InsuranceCard';
import SocialMediaCard from './premier/SocialMediaCard';
import LocationMapCard from './premier/LocationMapCard';

interface PremierProfileProps {
  provider: ProviderProfile;
}

const PremierProfile = ({ provider }: PremierProfileProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PremierHero provider={provider} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <PremierContentTabs provider={provider} />
          </div>

          <div className="space-y-6">
            <ContactFormCard />
            <ContactInfoCard provider={provider} />
            <OfficeHoursCard provider={provider} />
            <AvailabilityCard provider={provider} />
            <CertificationsCard provider={provider} />
            <InsuranceCard provider={provider} />
            <SocialMediaCard provider={provider} />
            <LocationMapCard provider={provider} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremierProfile;