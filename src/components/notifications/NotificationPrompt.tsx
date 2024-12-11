import React from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button';
import { useNotificationService } from '../../lib/notifications/hooks/useNotificationService';

interface NotificationPromptProps {
  onDismiss: () => void;
}

export function NotificationPrompt({ onDismiss }: NotificationPromptProps) {
  const { supported, permission, loading, error, requestPermission } = useNotificationService();

  if (!supported || permission === 'granted') {
    return null;
  }

  const handleEnable = async () => {
    const granted = await requestPermission();
    if (granted) {
      onDismiss();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-green-50 border border-green-100 rounded-lg p-4 relative"
      >
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-start space-x-3">
          <Bell className="h-6 w-6 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-green-800">
              Stay Updated with Air Quality Alerts
            </h3>
            <p className="mt-1 text-sm text-green-700">
              Enable notifications to receive real-time updates about air quality changes and daily insights.
            </p>
            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <div className="mt-4">
              <Button
                onClick={handleEnable}
                loading={loading}
                className="text-sm"
              >
                Enable Notifications
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}