import React from 'react';
import { X, Calendar, Clock, MapPin, Users, Info } from 'lucide-react';
import type { ScheduleItem } from '../types/events';

interface EventModalProps {
  event: ScheduleItem;
  mainEvent: string;
  onClose: () => void;
}

export function EventModal({ event, mainEvent, onClose }: EventModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {event.sport || event.event || mainEvent}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{event.time}</span>
                </div>

                {event.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {(event.team1 || event.team2) && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>
                      {event.team1} {event.team2 ? 'vs ' + event.team2 : ''}
                    </span>
                  </div>
                )}

                {event.category && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Info className="w-5 h-5" />
                    <span>{event.category}</span>
                  </div>
                )}
              </div>
            </div>

            {event.details && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Additional Information</h4>
                <p className="text-gray-600">{event.details}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}