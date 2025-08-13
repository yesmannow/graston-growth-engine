import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { showSuccess } from '@/utils/toast';

interface CalendarEvent {
  id: number;
  date: Date;
  title: string;
}

const ContentCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newEventTitle, setNewEventTitle] = useState('');

  const handleAddEvent = () => {
    if (newEventTitle && selectedDate) {
      const newEvent: CalendarEvent = {
        id: Date.now(),
        date: selectedDate,
        title: newEventTitle,
      };
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      showSuccess('Event added to your calendar!');
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
    showSuccess('Event removed from your calendar.');
  };

  const eventsForSelectedDay = selectedDate
    ? events.filter(event => format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Calendar</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: events.map(event => event.date),
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: 'bold',
                textDecoration: 'underline',
                color: 'hsl(var(--primary))',
              },
            }}
          />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">
            Schedule for {selectedDate ? format(selectedDate, 'PPP') : '...'}
          </h3>
          <div className="space-y-2">
            <Label htmlFor="new-event">New Event</Label>
            <div className="flex gap-2">
              <Input
                id="new-event"
                placeholder="e.g., Post on Facebook"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
              <Button onClick={handleAddEvent} size="icon">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {eventsForSelectedDay.length > 0 ? (
              eventsForSelectedDay.map(event => (
                <div key={event.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <p className="text-sm">{event.title}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No events scheduled for this day.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCalendar;