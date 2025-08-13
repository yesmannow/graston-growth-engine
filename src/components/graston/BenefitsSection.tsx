import { motion } from 'framer-motion';
import { benefits } from '@/data/grastonPageData';

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-muted/40 scroll-mt-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Graston Technique®?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover the key advantages that make GT a preferred choice for patients and clinicians.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-background rounded-lg shadow-sm"
            >
              <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;