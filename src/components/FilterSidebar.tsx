import React from 'react';
import { Search, X } from 'lucide-react';
import type { FilterState } from '../types/events';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClearFilters: () => void;
  categories: string[];
  locations: string[];
}

export function FilterSidebar({ 
  filters, 
  setFilters, 
  onClearFilters,
  categories,
  locations 
}: FilterSidebarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Date Range</h3>
        <div className="space-y-2">
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            value={filters.dateRange.from}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              dateRange: { ...prev.dateRange, from: e.target.value }
            }))}
          />
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            value={filters.dateRange.to}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              dateRange: { ...prev.dateRange, to: e.target.value }
            }))}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          className="w-full p-2 border rounded-lg"
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Location</h3>
        <select
          className="w-full p-2 border rounded-lg"
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          className="w-full p-2 border rounded-lg"
          value={filters.sortBy}
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
        >
          <option value="date">Date</option>
          <option value="category">Category</option>
          <option value="location">Location</option>
        </select>
      </div>

      <button
        onClick={onClearFilters}
        className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
      >
        <X className="w-4 h-4" />
        Clear Filters
      </button>
    </div>
  );
}