import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { instruments } from '@/data/grastonPageData';

const InstrumentsSection = () => {
  return (
    <section id="instruments" className="py-16 md:py-24 bg-muted/40 scroll-mt-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">The Patented Instruments</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Each of the six stainless steel instruments is uniquely designed to treat different areas of the body.
          </p>
        </div>
        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {instruments.map((instrument, index) => (
              <motion.div
                key={instrument.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="group text-center cursor-pointer">
                      <div className="p-4 bg-white rounded-lg shadow-sm group-hover:shadow-lg transition-shadow mb-4">
                        <img 
                          src={instrument.imageUrl} 
                          alt={instrument.name} 
                          className="h-40 mx-auto object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="font-semibold">{instrument.name}</h3>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{instrument.description}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default InstrumentsSection;