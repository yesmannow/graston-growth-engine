import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { id: 'symptom-checker', label: 'Is It For You?' },
  { id: 'instruments', label: 'The Instruments' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'conditions', label: 'Conditions' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'session', label: 'Your Visit' },
  { id: 'testimonials', label: 'Testimonials' },
];

const StickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        setIsVisible(window.scrollY > heroSection.offsetHeight);
      }

      let currentSection = '';
      navLinks.forEach(link => {
        const section = document.getElementById(link.id);
        if (section && window.scrollY >= section.offsetTop - 100) {
          currentSection = link.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="sticky top-16 z-40 w-full bg-background/80 backdrop-blur-sm border-b"
        >
          <div className="container mx-auto flex justify-center items-center h-14">
            <div className="flex space-x-6 overflow-x-auto">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    'text-sm font-medium transition-colors relative shrink-0',
                    activeSection === link.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-primary"
                      layoutId="underline"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default StickyNav;