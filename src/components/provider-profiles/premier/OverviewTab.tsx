import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Users, TrendingUp } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface OverviewTabProps {
  provider: ProviderProfile;
}

const OverviewTab = ({ provider }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      {provider.video_intro && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Introduction Video
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Video Player Component</p>
                <p className="text-xs text-gray-400">{provider.video_intro}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About Dr. {provider.provider_name.split(' ').pop()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-lg">{provider.provider_bio}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Areas of Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(provider.specialties || []).map((specialty, index) => (
                <div key={index} className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700">{specialty}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conditions Treated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(provider.conditions_treated || []).map((condition, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {condition}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {provider.community_activity && provider.community_activity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {provider.community_activity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">
                      {activity.type === 'topic' ? 'Started discussion' : 'Replied to discussion'} • {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary">{activity.engagement} interactions</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OverviewTab;