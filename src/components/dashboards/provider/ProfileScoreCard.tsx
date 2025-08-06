import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserProfile, calculateProfileScore } from "@/lib/membershipTiers";

interface ProfileScoreCardProps {
  user: UserProfile;
}

const ProfileScoreCard = ({ user }: ProfileScoreCardProps) => {
  const { score, nextAction } = calculateProfileScore(user);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Score</CardTitle>
        <CardDescription>Your profile completion status for the <strong>{user.tier}</strong> tier.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{score}%</span>
          <Progress value={score} className="w-2/3" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">{nextAction}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileScoreCard;