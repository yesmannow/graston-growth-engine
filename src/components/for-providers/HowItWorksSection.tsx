import { motion } from 'framer-motion';
import { Award, UserPlus, Search, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: Award,
    title: 'Certification & Training',
    description: 'Providers complete rigorous Graston Technique® training to become certified experts.',
  },
  {
    icon: UserPlus,
    title: 'Profile Activation',
    description: 'Certified clinicians activate their profile, showcasing their credentials, specialties, and practice details.',
  },
  {
    icon: Search,
    title: 'Patient Discovery',
    description: 'Patients search the directory to find verified providers in their area who meet their specific needs.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Connection',
    description: 'Patients connect directly with their chosen provider to book appointments and begin their recovery journey.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A seamless journey from certification to connection.
          </p>
        </div>
        <div className="relative">
          {/* The connecting line */}
          <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}
              >
                <div className={`absolute top-0 ${index % 2 === 1 ? 'md:right-[-3.7rem]' : 'md:left-[-3.7rem]'} left-1/2 -translate-x-1/2 md:translate-x-0 bg-white p-2 rounded-full border-4 border-primary hidden md:block`}>
                  <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="md:hidden bg-primary text-primary-foreground p-3 rounded-full flex-shrink-0">
                   <step.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;