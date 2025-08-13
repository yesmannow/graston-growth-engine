import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { symptomCheckerQuestions } from '@/data/grastonPageData';
import { Link } from 'react-router-dom';

const SymptomChecker = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);

  const totalSteps = symptomCheckerQuestions.length;
  const isQuizFinished = step > totalSteps;

  const handleNext = () => {
    if (currentAnswer) {
      setAnswers([...answers, currentAnswer]);
      setStep(step + 1);
      setCurrentAnswer(null);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setCurrentAnswer(null);
  };

  const progress = isQuizFinished ? 100 : (step / totalSteps) * 100;

  return (
    <section id="symptom-checker" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="container mx-auto max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Is Graston Technique® Right For You?</CardTitle>
            <p className="text-muted-foreground">Answer a few questions to see if GT could be a good fit.</p>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {step <= totalSteps && !isQuizFinished && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {step < totalSteps ? (
                      <>
                        <Progress value={progress} className="w-full" />
                        <h3 className="text-xl font-semibold text-center">
                          {symptomCheckerQuestions[step].question}
                        </h3>
                        <RadioGroup
                          onValueChange={setCurrentAnswer}
                          className="space-y-2"
                        >
                          {symptomCheckerQuestions[step].options.map((option) => (
                            <Label
                              key={option}
                              className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
                            >
                              <RadioGroupItem value={option} id={option} />
                              <span>{option}</span>
                            </Label>
                          ))}
                        </RadioGroup>
                        <div className="text-center">
                          <Button onClick={handleNext} disabled={!currentAnswer}>
                            Next <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center space-y-4">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                        <h3 className="text-2xl font-bold">Analysis Complete!</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Based on your answers, it sounds like you're dealing with a persistent soft tissue issue where Graston Technique® is often effective.
                        </p>
                        <p className="font-semibold">
                          The next step is to consult with a certified provider for a proper diagnosis.
                        </p>
                        <div className="flex justify-center gap-4">
                          <Button size="lg" asChild>
                            <Link to="/directory">Find a Certified Provider</Link>
                          </Button>
                          <Button variant="outline" onClick={handleRestart}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Start Over
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SymptomChecker;