import { mockProviders } from "@/lib/mockData";
import FeaturedProviderCard from "./FeaturedProviderCard";

const FeaturedProviders = () => {
  // Get the first 3 Premier providers as featured
  const featured = mockProviders.filter(p => p.tier === 'Premier').slice(0, 3);

  return (
    <div className="w-full py-12 md:py-20">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Featured Providers</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover top-rated Premier providers who are experts in the Graston Technique®.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(provider => (
            <FeaturedProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProviders;