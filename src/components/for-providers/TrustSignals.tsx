import { motion } from 'framer-motion';
import { trustLogos } from '@/data/forProvidersPageData';

const TrustSignals = () => {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Trusted by Leading Professional Organizations
          </h3>
          <div className="mt-8 flex justify-center items-center gap-12">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={logo.logoUrl} alt={logo.name} className="h-12 grayscale opacity-60" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;