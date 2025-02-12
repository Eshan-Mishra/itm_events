export interface Event {
  event: string;
  location: string;
  event_id?: string;
  dates?: string;
  schedule: ScheduleItem[];
  tournament?: string;
  format?: string;
  teams?: string[];
  on_the_spot_events?: OnTheSpotEvent[];
  highlights?: string[];
  organizers?: string[];
  sponsors?: string[];
  other?: string[];
}

export interface ScheduleItem {
  date: string;
  time: string;
  sport?: string;
  category?: string;
  match?: number | string;
  team1?: string;
  team2?: string;
  details?: string;
  location?: string;
  event?: string;
  sr_no?: number;
}

export interface OnTheSpotEvent {
  date: string;
  event: string;
  location: string;
  time: string;
}

export interface FilterState {
  dateRange: {
    from: string;
    to: string;
  };
  category: string;
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  status: string;
  search: string;
  sortBy: string;
}