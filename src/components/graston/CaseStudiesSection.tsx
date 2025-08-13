import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/grastonPageData';

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Visualizing Success: Case Studies</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tangible proof of the technique's effectiveness in real-world scenarios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{study.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{study.patient}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="grid grid-cols-3 items-center gap-4 mb-4 text-center">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <study.before.icon className="h-8 w-8 mx-auto text-red-500 mb-2" />
                      <h4 className="font-semibold">{study.before.label}</h4>
                      <p className="text-xs text-muted-foreground">{study.before.description}</p>
                    </div>
                    <ArrowRight className="h-8 w-8 text-muted-foreground mx-auto" />
                    <div className="p-4 bg-green-50 rounded-lg">
                      <study.after.icon className="h-8 w-8 mx-auto text-green-500 mb-2" />
                      <h4 className="font-semibold">{study.after.label}</h4>
                      <p className="text-xs text-muted-foreground">{study.after.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground flex-grow">
                    <p><strong>Problem:</strong> {study.problem}</p>
                    <p><strong>Approach:</strong> {study.approach}</p>
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="font-semibold text-primary">Outcome: {study.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;