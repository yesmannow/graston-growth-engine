import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { ProviderProfile } from '@/types/provider-profile';

interface EventsTabProps {
  provider: ProviderProfile;
}

const EventsTab = ({ provider }: EventsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        {provider.upcoming_events && provider.upcoming_events.length > 0 ? (
          <div className="space-y-4">
            {provider.upcoming_events.map((event) => (
              <Card key={event.id} className="border-l-4 border-green-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
                    <Badge variant="outline">{new Date(event.date).toLocaleDateString()}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p>{event.time} • {event.location}</p>
                    </div>
                    <Button size="sm" asChild>
                      <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                        Register
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No upcoming events</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EventsTab;