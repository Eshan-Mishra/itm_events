import React, { useState, useEffect, useMemo } from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { EventGrid } from './components/EventGrid';
import eventsData from './events.json';
import type { Event, FilterState } from './types/events';

function App() {
  const [loading, setLoading] = useState(true);
  const today = new Date().toLocaleDateString('en-CA'); // Output: "2024-05-21"

  const [filters, setFilters] = useState<FilterState>({
    dateRange : {
    from: today,
    to: today,
    },
    category: '',
    location: '',
    priceRange: {
      min: 0,
      max: 1000,
    },
    status: '',
    search: '',
    sortBy: 'date',
  });

  // Extract unique categories and locations
  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    eventsData.events?.forEach(event => {
      event.schedule?.forEach(item => {
        if (item.category) allCategories.add(item.category);
        if (item.sport) allCategories.add(item.sport);
      });
    });
    return Array.from(allCategories);
  }, []);

  const locations = useMemo(() => {
    const allLocations = new Set<string>();
    eventsData.events?.forEach(event => {
      if (event.location) allLocations.add(event.location);
      event.schedule?.forEach(item => {
        if (item.location) allLocations.add(item.location);
      });
    });
    return Array.from(allLocations);
  }, []);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    if (!eventsData.events) return [];
    
    let filtered = [...eventsData.events];

    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      filtered = filtered.map(event => ({
        ...event,
        schedule: event.schedule?.filter(item => {
          const itemDate = new Date(item.date);
          const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
          const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;

          return (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate);
        }) || [],
      }));
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.map(event => ({
        ...event,
        schedule: event.schedule?.filter(item => 
          item.category === filters.category || item.sport === filters.category
        ) || [],
      }));
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.map(event => ({
        ...event,
        schedule: event.schedule?.filter(item => 
          item.location === filters.location || event.location === filters.location
        ) || [],
      }));
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.map(event => ({
        ...event,
        schedule: event.schedule?.filter(item => 
          item.sport?.toLowerCase().includes(searchLower) ||
          item.event?.toLowerCase().includes(searchLower) ||
          item.team1?.toLowerCase().includes(searchLower) ||
          item.team2?.toLowerCase().includes(searchLower) ||
          event.event.toLowerCase().includes(searchLower)
        ) || [],
      }));
    }

    // Remove events with empty schedules
    filtered = filtered.filter(event => event.schedule && event.schedule.length > 0);

    // Sort events
    if (filters.sortBy === 'date') {
      filtered.forEach(event => {
        if (event.schedule) {
          event.schedule.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
      });
    } else if (filters.sortBy === 'category') {
      filtered.forEach(event => {
        if (event.schedule) {
          event.schedule.sort((a, b) => {
            const catA = a.category || a.sport || '';
            const catB = b.category || b.sport || '';
            return catA.localeCompare(catB);
          });
        }
      });
    } else if (filters.sortBy === 'location') {
      filtered.forEach(event => {
        if (event.schedule) {
          event.schedule.sort((a, b) => {
            const locA = a.location || event.location || '';
            const locB = b.location || event.location || '';
            return locA.localeCompare(locB);
          });
        }
      });
    }

    return filtered;
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      dateRange: {
        from: today,
        to: today,
      },
      category: '',
      location: '',
      priceRange: {
        min: 0,
        max: 1000,
      },
      status: '',
      search: '',
      sortBy: 'date',
    });
  };

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Event Listings</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onClearFilters={handleClearFilters}
              categories={categories}
              locations={locations}
            />
          </aside>

          <div className="flex-grow">
            <EventGrid events={filteredEvents} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
