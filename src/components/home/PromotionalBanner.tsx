import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wind, CloudSun, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../Button';

export function PromotionalBanner() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative px-6 py-16 sm:px-12 sm:py-20">
        <div className="max-w-3xl">
          <motion.div 
            className="flex items-center space-x-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1">
              <Activity className="h-4 w-4 text-green-200" />
              <span className="text-sm font-medium text-green-100">Live Updates</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-3xl font-bold text-white sm:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Real-Time Environmental Monitoring
          </motion.h2>

          <motion.p 
            className="text-lg text-green-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Get instant access to live air quality and weather data. Make informed decisions about your outdoor activities with up-to-the-minute environmental insights.
          </motion.p>

          <motion.div 
            className="flex items-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="secondary"
              onClick={() => navigate('/air-quality')}
              className="group"
            >
              <span>View Live Data</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="hidden sm:flex items-center space-x-8 text-green-100">
              <div className="flex items-center space-x-2">
                <Wind className="h-5 w-5" />
                <span>Air Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudSun className="h-5 w-5" />
                <span>Weather</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative icons */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
          <motion.div 
            className="relative w-48 h-48"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {[Wind, CloudSun, Activity].map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  transform: `rotate(${index * 120}deg) translateX(80px)`,
                }}
              >
                <Icon className="h-8 w-8 text-green-200/40" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}