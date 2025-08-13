import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FullProviderProfile } from "@/types";
import { calculateProfileStrength } from "@/lib/profileScore";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProfileStrengthCardProps {
  provider: FullProviderProfile;
}

const ProfileStrengthCard = ({ provider }: ProfileStrengthCardProps) => {
  const { score, checklist } = calculateProfileStrength(provider);
  const data = [{ name: 'score', value: score }];

  return (
    <Card className="md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Profile Strength</CardTitle>
        <CardDescription>Complete these steps to improve your visibility.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: '#e5e7eb' }}
                dataKey="value"
                cornerRadius={10}
                fill="#3b82f6"
                angleAxisId={0}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">{score}%</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {checklist.filter(item => !item.isCompleted).slice(0, 3).map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button asChild variant="ghost" className="w-full justify-start h-auto p-2">
                <Link to={item.actionPath}>
                  <div className="flex items-center gap-3">
                    <Circle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-left">{item.text}</span>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                </Link>
              </Button>
            </motion.div>
          ))}
          {checklist.every(item => item.isCompleted) && (
            <div className="flex items-center gap-3 p-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Your profile is fully optimized!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStrengthCard;