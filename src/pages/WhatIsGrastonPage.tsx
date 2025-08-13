import StickyNav from '@/components/graston/StickyNav';
import HeroSection from '@/components/graston/HeroSection';
import SymptomChecker from '@/components/graston/SymptomChecker';
import DeeperDiveSection from '@/components/graston/DeeperDiveSection';
import InstrumentsSection from '@/components/graston/InstrumentsSection';
import BenefitsSection from '@/components/graston/BenefitsSection';
import ConditionsSection from '@/components/graston/ConditionsSection';
import CaseStudiesSection from '@/components/graston/CaseStudiesSection';
import SessionTimeline from '@/components/graston/SessionTimeline';
import TestimonialsSection from '@/components/graston/TestimonialsSection';
import CtaSection from '@/components/graston/CtaSection';

const WhatIsGrastonPage = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <StickyNav />
      <main>
        <SymptomChecker />
        <DeeperDiveSection />
        <InstrumentsSection />
        <BenefitsSection />
        <ConditionsSection />
        <CaseStudiesSection />
        <SessionTimeline />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </div>
  );
};

export default WhatIsGrastonPage;