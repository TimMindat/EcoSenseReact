import { useState, useEffect } from 'react';
import { Location } from '../types/location';
import { DEFAULT_LOCATION } from '../constants/locations';

interface GeolocationState {
  location: Location;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: DEFAULT_LOCATION,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: DEFAULT_LOCATION,
        error: 'Geolocation is not supported by your browser',
        loading: false
      });
      return;
    }

    const timeoutId = setTimeout(() => {
      setState(prev => ({
        ...prev,
        location: DEFAULT_LOCATION,
        loading: false,
        error: 'Location request timed out. Using default location.'
      }));
    }, 10000); // 10 second timeout

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        setState({
          location: {
            name: 'Current Location',
            coordinates: {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            }
          },
          error: null,
          loading: false
        });
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error('Geolocation error:', error);
        setState({
          location: DEFAULT_LOCATION,
          error: 'Unable to retrieve your location. Using default location.',
          loading: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
      }
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return state;
}