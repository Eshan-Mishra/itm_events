import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import type { ScheduleItem } from '../types/events';

interface EventCardProps {
  event: ScheduleItem;
  mainEvent: string;
  onSelect: (event: ScheduleItem, mainEvent: string) => void;
}

// Sport images mapping
const sportImages = {
  'football': 'src/public/sports/football.jpg',
  'basketball': 'src/public/sports/Basket-Ball.jpg',
  'volleyball': 'src/public/sports/VOLLEYBALL.jpg',
  'cricket': 'src/public/sports/cricket.jpg',
  'long jump': 'src/public/sports/longjump.jpg',
  '100 meter': 'src/public/sports/race.png',
  'powerlifting': 'src/public/sports/POWER-LIFTING.jpg',
  'taekwondo': 'src/public/sports/TAEKWONDO-01.jpg',
  'box cricket': 'src/public/sports/cricket.jpg',
  'kabaddi': 'src/public/sports/kabaddi.jpg',      // use all lowercase here
  'chess': 'src/public/sports/Chess.jpg',
  'badminton': 'src/public/sports/badminton.jpg', // also lowercase
};

// Event images mapping
const eventImages = {
  'robo soccer': 'src/public/event/robo-soccer.webp',
  'cryptors': 'src/public/event/New-Cryptors-01.webp',
  'chem-o-car': 'src/public/event/New-Chem-o-car-01.webp',
  'gamejam': 'src/public/event/New-Game-Jam-01.webp',
  'short film': 'src/public/event/New-Short-Film-Making-Competition-01.webp',
  'shark tank': 'src/public/event/New-Shark-Tank-01.webp',
  'clinical case': 'src/public/event/New-Clinical-Case-Study-01.webp',
  'hackathon': 'src/public/event/New-Hackathon-01.webp',
  'code clash': 'src/public/event/New-Codeclash-01.webp',
  'open mic': 'src/public/event/openmic.png',
  'war of the bands': 'src/public/event/battel of bands.png',
  'illuminati roadies': 'src/public/event/roadies.jpg',
  'vyapar mela': 'src/public/event/mela.JPG',
  'calligraphy':'src/public/event/Calligraphy Workshop.png',
  'workshop': 'src/public/event/jewllery.jpg',
  'cultural': 'src/public/event/cultural-events.jpg',
  'inauguration':"src/public/event/inaugration.png",
  'sci-tech innovators':"src/public/event/scitechinovation.jpg",
  'mysteries in anatomy':"src/public/event/New-Mysteries-of-Anatomy-01.webp",
  'jewellery making workshop':"src/public/event/jewllery.jpg",
  'kalamkaar':"src/public/event/kalamkaar.png",
  'fastest line follower':"src/public/event/Fastest-Line-Follower.webp",
  'investment wizard':"src/public/event/New-Investment-Wizard-01.webp",
  'pharma snakes & ladders':"src/public/event/New-Pharma-Snakes-Ladders-01.webp",
  'pharma catalyst':"src/public/event/New-Pharma-Catalyst-01.webp",
  'rj hunt':"src/public/event/rjhunt.jpg",
  'halla bol':"src/public/event/halla bol.jpg",
  'pharma blend battle':"src/public/event/New-Pharma-Blend-Battle-01.webp",
  'snakes & ladders 3.0':"src/public/event/New-Snake-and-Ladders-3.0-01.webp",
  'reel making competition':"src/public/event/New-Reel-making-Challenge-01.webp",
  'robo race':"src/public/event/Roborace.webp",
  'healthcare puzzle':"src/public/event/New-Healthcare-Puzzle-01.webp",
  'health science model making competition':"src/public/event/New-Health-Science-Model-01.webp",
  '':"",
  '':"",
  '':"",
};

const getEventImage = (event: ScheduleItem): string => {
  const searchTerm = (event.sport || event.event || '').toLowerCase();
  
  // Check for sports first
  for (const [sport, url] of Object.entries(sportImages)) {
    if (searchTerm.includes(sport)) {
      return url;
    }
  }
  
  // Then check for events
  for (const [eventName, url] of Object.entries(eventImages)) {
    if (searchTerm.includes(eventName)) {
      return url;
    }
  }
  
  // Default fallback image
  return 'https://source.unsplash.com/featured/?event,university';
};

export function EventCard({ event, mainEvent, onSelect }: EventCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-[1.02] transition-transform"
      onClick={() => onSelect(event, mainEvent)}
    >
      <div className="relative">
        <img 
          src={getEventImage(event)}
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