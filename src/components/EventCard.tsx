import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import type { ScheduleItem } from '../types/events';

interface EventCardProps {
  event: ScheduleItem;
  mainEvent: string;
  onSelect: (event: ScheduleItem, mainEvent: string) => void;
}

const getSportImage = (sport: string = '') => {
  const sportLower = sport.toLowerCase();
  if (sportLower.includes('football')) {
    return 'https://source.unsplash.com/featured/?football,stadium';
  } else if (sportLower.includes('basketball')) {
    return 'https://source.unsplash.com/featured/?basketball,court';
  } else if (sportLower.includes('tennis')) {
    return 'https://source.unsplash.com/featured/?tennis,court';
  } else if (sportLower.includes('soccer')) {
    return 'https://source.unsplash.com/featured/?soccer,field';
  } else if (sportLower.includes('cricket')) {
    return 'https://source.unsplash.com/featured/?cricket,field';
  } else if (sportLower.includes('volleyball')) {
    return 'https://source.unsplash.com/featured/?volleyball,court';
  } else {
    return 'https://source.unsplash.com/featured/?sports,stadium';
  }
};

export function EventCard({ event, mainEvent, onSelect }: EventCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-[1.02] transition-transform"
      onClick={() => onSelect(event, mainEvent)}
    >
      <div className="relative">
        <img 
          src={getSportImage(event.sport)}
          alt={event.sport || event.event || 'Event'} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm">
          {event.category || 'General'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {event.sport || event.event || mainEvent}
        </h3>
        
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
          
          {(event.team1 || event.team2) && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="line-clamp-1">
                {event.team1} {event.team2 ? 'vs ' + event.team2 : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}