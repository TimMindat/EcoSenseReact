import React, { Suspense } from 'react';
import { Info, Loader2 } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Lazy load components with proper error handling
const AirQualityCard = React.lazy(() => 
  import('../components/AirQualityCard').catch(() => ({
    default: () => <div>Failed to load Air Quality Card</div>
  }))
);

const WeatherCard = React.lazy(() => 
  import('../components/weather/WeatherCard').catch(() => ({
    default: () => <div>Failed to load Weather Card</div>
  }))
);

const QualityGuide = React.lazy(() => 
  import('../components/QualityGuide').catch(() => ({
    default: () => <div>Failed to load Quality Guide</div>
  }))
);

const UserInsights = React.lazy(() => 
  import('../components/insights/UserInsights').catch(() => ({
    default: () => <div>Failed to load User Insights</div>
  }))
);

// Fallback component for loading states
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px] bg-white rounded-lg shadow-lg p-6">
    <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
  </div>
);

export function AirQuality() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Load immediately */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Info className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Environmental Monitoring
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Real-time air quality and weather data to help you make informed decisions.
          </p>
        </div>

        {/* User Insights Section */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <div className="mb-8">
              <UserInsights />
            </div>
          </Suspense>
        </ErrorBoundary>

        {/* Monitoring Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <AirQualityCard />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <WeatherCard />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Quality Guide Section */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <div className="mt-16">
              <QualityGuide />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}