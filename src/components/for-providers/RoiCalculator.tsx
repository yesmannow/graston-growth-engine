import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

const RoiCalculator = () => {
  const [patientValue, setPatientValue] = useState(450);
  const premierCost = 299;

  const calculateRevenue = (patientsPerMonth: number) => {
    return patientValue * patientsPerMonth * 12;
  };

  const revenueScenarios = [
    { patients: 1, revenue: calculateRevenue(1) },
    { patients: 2, revenue: calculateRevenue(2) },
    { patients: 5, revenue: calculateRevenue(5) },
  ];

  const isPaidOff = patientValue >= premierCost;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-muted/40">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Calculate Your Potential ROI</CardTitle>
                <p className="text-muted-foreground">See how quickly a Premier membership pays for itself.</p>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="patientValue" className="text-lg">
                    What is the average value of a new patient?
                  </Label>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-primary">$</span>
                    <Input
                      id="patientValue"
                      type="number"
                      value={patientValue}
                      onChange={(e) => setPatientValue(Number(e.target.value))}
                      className="text-2xl font-bold h-12"
                    />
                  </div>
                  <Slider
                    value={[patientValue]}
                    onValueChange={(value) => setPatientValue(value[0])}
                    max={2000}
                    step={10}
                  />
                </div>
                <motion.div
                  key={isPaidOff ? 'paid' : 'not-paid'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center font-semibold ${
                    isPaidOff
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isPaidOff
                    ? `A $${premierCost} Premier membership pays for itself with just one new patient!`
                    : `A $${premierCost} Premier membership is an investment in your growth.`}
                </motion.div>
              </CardContent>
            </div>
            <div className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-xl font-semibold mb-4">Estimated Annual Revenue</h3>
              <div className="space-y-4">
                {revenueScenarios.map((scenario, index) => (
                  <motion.div
                    key={scenario.patients}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-primary-foreground/10 rounded-lg"
                  >
                    <p className="text-sm">
                      With just <span className="font-bold">{scenario.patients} new patient{scenario.patients > 1 ? 's' : ''}</span> per month:
                    </p>
                    <p className="text-3xl font-bold">
                      ${scenario.revenue.toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default RoiCalculator;