import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Connect With More Patients. Grow Your Practice.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
            Join the sole GT-verified platform that transforms your certification into measurable patient engagement and revenue.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/onboarding">Start Your Free Trial</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="#comparison">Compare Plans</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;