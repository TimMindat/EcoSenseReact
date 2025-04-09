import React, { useState, useEffect } from 'react';
import { getAirQualityData } from '../lib/api/airQuality';
import { EGYPT_GOVERNORATES } from '../lib/config/locations';
import { AQICalculator } from '../lib/aqi/calculator';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Wind, Droplet, RefreshCw, MapPin } from 'lucide-react';
import { Location } from '../lib/types/location';
import LocationSelector from './LocationSelector';

export default function AirQualityCard() {
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGovernorate, setSelectedGovernorate] = useState(EGYPT_GOVERNORATES[0]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);

  const fetchData = async (governorate) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching air quality data for:', governorate.name);
      const data = await getAirQualityData(governorate);
      
      if (!data || !data.list || !data.list[0]) {
        throw new Error('Invalid air quality data received');
      }
      
      console.log('Processing air quality data:', data);
      const components = data.list[0].components;
      
      // Calculate AQI using only O3 (Ozone)
      const o3Only = { 'o3': components.o3 };
      console.log('O3 value for AQI calculation:', components.o3, 'μg/m³');
      
      const aqi = AQICalculator.calculateO3Only(o3Only);
      console.log('Calculated AQI (O3 only):', aqi);
      
      if (!aqi) {
        throw new Error('Failed to calculate AQI from O3 data');
      }
      
      setAirQualityData({
        raw: data,
        processed: aqi,
        allComponents: components
      });
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching air quality data:', err);
      setError(err instanceof Error ? err.message : 'Error loading air quality data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedGovernorate);
  }, [selectedGovernorate]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData(selectedGovernorate || DEFAULT_LOCATION);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleGovernorateChange = (e) => {
    const selected = EGYPT_GOVERNORATES.find(gov => gov.name === e.target.value);
    if (selected) {
      setSelectedGovernorate(selected);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600">Loading air quality data for {selectedGovernorate.name}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Unable to Load Air Quality Data</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={handleRefresh} 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!airQualityData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full">
        <div className="text-center">
          <p className="text-gray-600">No air quality data available</p>
        </div>
      </div>
    );
  }

  const { processed: aqi, allComponents } = airQualityData;
  const aqiColor = AQICalculator.getAQIColor(aqi.aqi);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold">Air Quality in Egypt</h2>
        
        <div className="mt-3 md:mt-0">
          <select
            value={selectedGovernorate.name}
            onChange={handleGovernorateChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            {EGYPT_GOVERNORATES.map((governorate) => (
              <option key={governorate.name} value={governorate.name}>
                {governorate.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center rounded-full w-20 h-20 mr-4"
            style={{ backgroundColor: `${aqiColor}20`, border: `3px solid ${aqiColor}` }}
          >
            <span className="text-3xl font-bold" style={{ color: aqiColor }}>{aqi.aqi}</span>
          </motion.div>
          <div>
            <div className="text-xl font-semibold" style={{ color: aqiColor }}>{aqi.category}</div>
            <div className="text-sm text-gray-600">
              Based on Ozone (O₃) concentration
            </div>
            <div className="text-sm font-medium mt-1">
              O₃: {allComponents.o3.toFixed(2)} μg/m³
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
          {lastUpdated && (
            <div className="text-xs text-gray-500 mt-2 text-center">
              Last updated: {format(lastUpdated, 'MMM d, yyyy HH:mm:ss')}
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">All Pollutant Levels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(allComponents)
            .filter(([name]) => name !== 'no') // Remove NO pollutant
            .map(([name, value]) => {
              const whoGuideline = AQICalculator.getWHOGuideline(name);
              const exceedsGuideline = whoGuideline && value > whoGuideline;
              const percentOfGuideline = whoGuideline ? Math.min(value / whoGuideline * 100, 200) : 100;
              const barColor = getBarColor(percentOfGuideline);
              
              // For NH3, use a default guideline if not available
              const displayGuideline = name === 'nh3' && !whoGuideline ? 100 : whoGuideline;
              const displayPercent = name === 'nh3' && !whoGuideline ? 
                Math.min(value / 100 * 100, 200) : percentOfGuideline;
              
              return (
                <div key={name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">{formatPollutantName(name)}</div>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold mr-1">{typeof value === 'number' ? value.toFixed(2) : 'N/A'}</span>
                      <span className="text-xs text-gray-500">{getPollutantUnit(name)}</span>
                    </div>
                  </div>
                  
                  {/* Always show a bar for all pollutants including NH3 */}
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${displayPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ backgroundColor: barColor }}
                    />
                    {displayGuideline && (
                      <div 
                        className="absolute top-0 h-full w-px bg-gray-800" 
                        style={{ left: '100%', transform: 'translateX(-100%)' }}
                      />
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-1">
                    {displayGuideline ? (
                      <div className="text-xs text-gray-600">
                        {name === 'nh3' && !whoGuideline ? 'Reference Level:' : 'WHO Guideline:'} <span className="font-semibold">{displayGuideline} {getPollutantUnit(name)}</span>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-600">No guideline available</div>
                    )}
                    {exceedsGuideline && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="text-xs text-red-500 font-semibold"
                      >
                        Exceeded
                      </motion.span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <span>Data provided by OpenWeather Air Pollution API</span>
          <a 
            href="https://openweathermap.org/api/air-pollution" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800 hover:underline"
          >
            API Documentation
          </a>
        </div>
      </div>
    </div>
  );
}

function formatPollutantName(name) {
  const names = {
    'co': 'Carbon Monoxide (CO)',
    'no2': 'Nitrogen Dioxide (NO₂)',
    'o3': 'Ozone (O₃)',
    'so2': 'Sulfur Dioxide (SO₂)',
    'pm2_5': 'Fine Particles (PM2.5)',
    'pm10': 'Coarse Particles (PM10)',
    'nh3': 'Ammonia (NH₃)'
  };
  return names[name] || name;
}

function getPollutantUnit(name) {
  if (name === 'co') return 'mg/m³';
  return 'μg/m³';
}

function getBarColor(percentOfGuideline) {
  if (percentOfGuideline <= 50) return '#00e400'; // Good
  if (percentOfGuideline <= 100) return '#ffff00'; // Moderate
  if (percentOfGuideline <= 150) return '#ff7e00'; // Unhealthy for Sensitive Groups
  if (percentOfGuideline <= 200) return '#ff0000'; // Unhealthy
  return '#99004c'; // Very Unhealthy or Hazardous
}