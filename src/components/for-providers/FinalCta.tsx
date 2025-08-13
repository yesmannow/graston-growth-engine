import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FinalCta = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Grow Your Practice?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Join an exclusive network of certified professionals and start connecting with new patients today.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link to="/onboarding">Start Your Membership Trial</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;