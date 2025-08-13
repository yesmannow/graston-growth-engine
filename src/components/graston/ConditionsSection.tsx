import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { conditions } from '@/data/grastonPageData';

const ConditionsSection = () => {
  return (
    <section id="conditions" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Conditions We Treat</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            GT is successfully used to treat a wide range of acute and chronic soft tissue conditions.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <TooltipProvider>
            {conditions.map((condition, index) => (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-6 py-3 bg-muted/60 rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      <span className="font-medium">{condition.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{condition.description}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;