import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, X, ChevronDown, Navigation2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EGYPT_GOVERNORATES } from '../../lib/constants/locations';
import { useGeolocation } from '../../lib/hooks/useGeolocation';
import type { Location } from '../../lib/types/location';

interface LocationSelectorProps {
  selectedLocation: Location;
  onLocationChange: (location: Location) => void;
}

export function LocationSelector({ selectedLocation, onLocationChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { location: currentLocation, loading: geoLoading, error: geoError } = useGeolocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = EGYPT_GOVERNORATES.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrentLocationSelect = () => {
    onLocationChange(currentLocation);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <MapPin className="h-4 w-4" />
        <span>{selectedLocation.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto">
                <button
                  onClick={handleCurrentLocationSelect}
                  disabled={geoLoading || !!geoError}
                  className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md text-left mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Navigation2 className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="text-gray-900">Current Location</span>
                    {geoLoading && (
                      <span className="text-sm text-gray-500 block">Detecting...</span>
                    )}
                    {geoError && (
                      <span className="text-sm text-red-500 block">Location unavailable</span>
                    )}
                  </div>
                </button>

                <div className="border-t border-gray-100 my-2"></div>

                {filteredLocations.map((location) => (
                  <button
                    key={`${location.coordinates.lat}-${location.coordinates.lon}`}
                    onClick={() => {
                      onLocationChange(location);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md text-left"
                  >
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{location.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}