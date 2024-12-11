import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Location } from '../../lib/types/location';

interface LocationInfoProps {
  location: Location;
  error: string | null;
}

export function LocationInfo({ location, error }: LocationInfoProps) {
  return (
    <div className="flex items-center text-sm text-gray-600 mt-1">
      {error ? (
        <>
          <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
          <span className="text-yellow-600">{error}</span>
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location.name}</span>
        </>
      )}
    </div>
  );
}