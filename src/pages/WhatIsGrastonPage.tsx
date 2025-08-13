import StickyNav from '@/components/graston/StickyNav';
import HeroSection from '@/components/graston/HeroSection';
import DeeperDiveSection from '@/components/graston/DeeperDiveSection';
import BenefitsSection from '@/components/graston/BenefitsSection';
import ConditionsSection from '@/components/graston/ConditionsSection';
import SessionTimeline from '@/components/graston/SessionTimeline';
import TestimonialsSection from '@/components/graston/TestimonialsSection';
import CtaSection from '@/components/graston/CtaSection';

const WhatIsGrastonPage = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <StickyNav />
      <main>
        <DeeperDiveSection />
        <BenefitsSection />
        <ConditionsSection />
        <SessionTimeline />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </div>
  );
};

export default WhatIsGrastonPage;