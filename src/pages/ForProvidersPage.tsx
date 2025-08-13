import HeroSection from '@/components/for-providers/HeroSection';
import RoiCalculator from '@/components/for-providers/RoiCalculator';
import DashboardPreview from '@/components/for-providers/DashboardPreview';
import ProviderTestimonials from '@/components/for-providers/ProviderTestimonials';
import FeatureComparisonTable from '@/components/for-providers/FeatureComparisonTable';
import FinalCta from '@/components/for-providers/FinalCta';

const ForProvidersPage = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <RoiCalculator />
      <DashboardPreview />
      <ProviderTestimonials />
      <FeatureComparisonTable />
      <FinalCta />
    </div>
  );
};

export default ForProvidersPage;