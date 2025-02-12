import React, { useState } from 'react';
import { EventCard } from './EventCard';
import { EventModal } from './EventModal';
import type { Event, ScheduleItem } from '../types/events';

interface EventGridProps {
  events: Event[];
  loading: boolean;
}

export function EventGrid({ events, loading }: EventGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<{
    event: ScheduleItem;
    mainEvent: string;
  } | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-lg"></div>
            <div className="bg-white p-4 rounded-b-lg space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-xl font-semibold">No events found</p>
        <p className="mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  const allScheduleItems: { item: ScheduleItem; mainEvent: string }[] = events.flatMap(
    event => event.schedule.map(item => ({ item, mainEvent: event.event }))
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allScheduleItems.map((scheduleItem, index) => (
          <EventCard 
            key={`${scheduleItem.mainEvent}-${index}`}
            event={scheduleItem.item}
            mainEvent={scheduleItem.mainEvent}
            onSelect={(event, mainEvent) => setSelectedEvent({ event, mainEvent })}
          />
        ))}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent.event}
          mainEvent={selectedEvent.mainEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}