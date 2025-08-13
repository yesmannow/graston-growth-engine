import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Gem } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    icon: Check,
    features: ['Basic Listing', 'Verified Badge', 'Location Search'],
    cta: 'Get Listed',
    variant: 'outline',
  },
  {
    name: 'Preferred',
    icon: Star,
    features: ['Enhanced Profile', 'Contact Info', 'Higher Search Rank', 'Social Links'],
    cta: 'Upgrade Now',
    variant: 'secondary',
  },
  {
    name: 'Premier',
    icon: Gem,
    features: ['Top Placement', 'Photo & Video Gallery', 'Testimonials', 'AI Marketing Tools'],
    cta: 'Go Premier',
    variant: 'default',
  },
];

const TierComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">The Premier Difference</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the plan that best fits your practice's growth goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col ${tier.name === 'Premier' ? 'border-primary ring-2 ring-primary' : ''}`}>
                <CardHeader className="text-center">
                  <tier.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full" variant={tier.variant as any}>
                    {tier.cta}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TierComparisonSection;