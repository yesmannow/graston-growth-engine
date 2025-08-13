import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero-section" className="relative bg-slate-900 text-white py-20 md:py-32 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        poster="/images/graston-hero-poster.jpeg"
      >
        {/* In a real app, use a more optimized video format */}
        <source src="https://grastontechnique.com/wp-content/uploads/2023/01/GT-Website-Banner-Video-V2-1.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            A Faster Path to Recovery Starts Here.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-200">
            Graston Technique® is a specialized form of therapy that uses patented instruments to detect and treat scar tissue and restrictions that affect normal function.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/directory">Find a Provider</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;