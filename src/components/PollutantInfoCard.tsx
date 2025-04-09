import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Droplets, Wind, Factory, Car, CloudRain } from 'lucide-react';

const PollutantInfoCard = () => {
  const [expandedPollutant, setExpandedPollutant] = useState<string | null>(null);
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const pollutants = [
    {
      id: 'o3',
      name: 'Ozone (O₃)',
      icon: <Wind className="h-5 w-5" />,
      color: '#ff7e00',
      description: 'Ground-level ozone forms when pollutants from cars, power plants, and other sources react chemically with sunlight. It can trigger respiratory problems and worsen conditions like asthma and bronchitis.',
      sources: 'Vehicle exhaust, industrial emissions, chemical solvents, gasoline vapors',
      health: 'Breathing difficulties, throat irritation, congestion, chest pain, worsening of respiratory infections',
      environment: 'Damages vegetation and ecosystems, reduces crop yields'
    },
    {
      id: 'pm',
      name: 'Particulate Matter (PM2.5/PM10)',
      icon: <CloudRain className="h-5 w-5" />,
      color: '#ff0000',
      description: 'Tiny particles or droplets in the air that are 2.5 microns or less in width (PM2.5) or 10 microns or less (PM10). They can penetrate deep into the lungs and even enter the bloodstream.',
      sources: 'Vehicle emissions, power plants, wood burning, construction, dust, wildfires',
      health: 'Respiratory and cardiovascular issues, irregular heartbeat, aggravated asthma, decreased lung function',
      environment: 'Reduced visibility (haze), acidification of water bodies, soil nutrient depletion'
    },
    {
      id: 'co',
      name: 'Carbon Monoxide (CO)',
      icon: <Car className="h-5 w-5" />,
      color: '#99004c',
      description: 'A colorless, odorless gas that forms when carbon in fuel doesn\'t burn completely. It reduces oxygen delivery to the body\'s organs and can be fatal at high concentrations.',
      sources: 'Vehicle exhaust, fuel combustion, industrial processes, household appliances',
      health: 'Reduced oxygen delivery to organs, headaches, dizziness, confusion, unconsciousness at high levels',
      environment: 'Contributes to ground-level ozone formation'
    },
    {
      id: 'no2',
      name: 'Nitrogen Dioxide (NO₂)',
      icon: <Factory className="h-5 w-5" />,
      color: '#cc0000',
      description: 'A reddish-brown gas with a sharp odor that forms when fossil fuels are burned at high temperatures. It contributes to the formation of ground-level ozone and fine particle pollution.',
      sources: 'Vehicle emissions, power plants, industrial processes',
      health: 'Respiratory inflammation, worsened asthma symptoms, increased susceptibility to respiratory infections',
      environment: 'Contributes to acid rain, nutrient pollution in coastal waters'
    },
    {
      id: 'so2',
      name: 'Sulfur Dioxide (SO₂)',
      icon: <Factory className="h-5 w-5" />,
      color: '#8b4513',
      description: 'A colorless gas with a sharp odor that forms when sulfur-containing fuels are burned. It can harm the respiratory system and contribute to acid rain.',
      sources: 'Fossil fuel combustion, industrial processes, volcanic eruptions',
      health: 'Breathing difficulties, respiratory irritation, worsening of asthma and heart disease',
      environment: 'Contributes to acid rain, damages trees and plants, acidifies water bodies'
    },
    {
      id: 'nh3',
      name: 'Ammonia (NH₃)',
      icon: <Droplets className="h-5 w-5" />,
      color: '#006400',
      description: 'A colorless gas with a pungent odor. It is a common byproduct of agricultural activities and can contribute to particulate matter formation.',
      sources: 'Agricultural activities, livestock waste, fertilizer application, industrial processes',
      health: 'Eye, nose, and throat irritation, respiratory issues at high concentrations',
      environment: 'Contributes to nitrogen pollution in ecosystems, forms secondary particulate matter'
    }
  ];

  const toggleCard = () => {
    setIsCardExpanded(!isCardExpanded);
    if (isCardExpanded) {
      setExpandedPollutant(null);
    }
  };

  const togglePollutant = (id: string) => {
    setExpandedPollutant(expandedPollutant === id ? null : id);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer flex justify-between items-center"
        onClick={toggleCard}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center">
          <Info className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-bold">Understanding Air Pollutants</h2>
        </div>
        <motion.div
          animate={{ rotate: isCardExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isCardExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            <p className="text-gray-600 mb-4">
              Air quality is affected by various pollutants that can impact human health and the environment. 
              Below are the key pollutants monitored in our air quality index.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {pollutants.map((pollutant) => (
                <motion.div
                  key={pollutant.id}
                  className="border rounded-lg overflow-hidden bg-gray-50 hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => togglePollutant(pollutant.id)}
                >
                  <div 
                    className="p-3 flex justify-between items-center cursor-pointer"
                    style={{ backgroundColor: `${pollutant.color}20` }}
                  >
                    <div className="flex items-center">
                      <div className="mr-3 text-xl" style={{ color: pollutant.color }}>
                        {pollutant.icon}
                      </div>
                      <h3 className="font-medium">{pollutant.name}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedPollutant === pollutant.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expandedPollutant === pollutant.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 border-t"
                      >
                        <p className="text-sm text-gray-600 mb-2">{pollutant.description}</p>
                        
                        <div className="mt-3">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Sources</h4>
                          <p className="text-sm mb-2">{pollutant.sources}</p>
                          
                          <motion.div 
                            className="w-full h-1 mb-3 rounded-full overflow-hidden"
                            style={{ backgroundColor: `${pollutant.color}20` }}
                          >
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: pollutant.color }}
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </motion.div>
                          
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Health Effects</h4>
                          <p className="text-sm mb-2">{pollutant.health}</p>
                          
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Environmental Impact</h4>
                          <p className="text-sm">{pollutant.environment}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <div className="text-xs text-gray-500 mt-2">
              Source: Information compiled from the US EPA, WHO, and European Environment Agency guidelines.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PollutantInfoCard;