import { motion, Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, ShieldCheck } from 'lucide-react';

const missionData = [
  {
    icon: Heart,
    title: 'For Patients',
    description: 'Find trusted, certified Graston Technique® clinicians with confidence. Our directory provides transparent profiles and direct access to the highest standard of care, ensuring you connect with the right expert for your needs.',
  },
  {
    icon: Users,
    title: 'For Providers',
    description: 'Enhance your visibility and credibility within an exclusive network of certified professionals. Leverage our data-driven tools to grow your practice, attract new patients, and showcase your expertise to a targeted audience.',
  },
  {
    icon: ShieldCheck,
    title: 'For the Practice',
    description: 'Uphold the integrity and prestige of the Graston Technique®. This directory serves as the single source of truth, reinforcing brand leadership and ensuring the GT promise of quality care is consistently delivered worldwide.',
  },
];

const MissionSection = () => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A commitment to excellence for everyone involved.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionData.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="h-full text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;