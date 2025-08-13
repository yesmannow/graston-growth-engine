import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Recovery Journey?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            The next step is to find a certified Graston Technique® clinician near you.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/directory">Find a Verified Provider Near You</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;