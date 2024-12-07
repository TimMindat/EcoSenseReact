import React from 'react';
import { Wind, MapPin, ExternalLink } from 'lucide-react';
import { useAirQuality } from '../../lib/hooks/useAirQuality';
import { AirQualityHeader } from './AirQualityHeader';
import { AirQualityStatus } from './AirQualityStatus';
import { PollutantGrid } from './PollutantGrid';
import { CardFooter } from './CardFooter';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export function AirQualityCard() {
  const { data, location, isLoading, error, refresh } = useAirQuality();

  if (error) {
    return <ErrorState onRetry={refresh} />;
  }

  if (isLoading || !data) {
    return <LoadingState />;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-xl">
      <AirQualityHeader location={location} />
      <AirQualityStatus aqi={data.main.aqi} className="mt-6" />
      <PollutantGrid pollutants={data.components} className="mt-8" />
      <CardFooter 
        timestamp={data.dt} 
        location={location}
        onRefresh={refresh}
      />
    </div>
  );
}