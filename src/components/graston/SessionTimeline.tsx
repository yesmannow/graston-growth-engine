import { motion } from 'framer-motion';
import { timelineSteps } from '@/data/grastonPageData';

const SessionTimeline = () => {
  return (
    <section id="session" className="py-16 md:py-24 bg-muted/40 scroll-mt-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What to Expect During a Session</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A look at the typical steps involved in a Graston Technique® treatment.
          </p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
          <div className="space-y-12">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionTimeline;