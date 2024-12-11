import React from 'react';
import { Bell, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../Button';

interface NotificationPromptProps {
  onDismiss: () => void;
  onEnable: () => Promise<boolean>;
}

export function NotificationPrompt({ onDismiss, onEnable }: NotificationPromptProps) {
  const handleEnable = async () => {
    const granted = await onEnable();
    if (granted) {
      onDismiss();
    }
  };

  return (
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
            Stay Updated!
          </h3>
          <p className="mt-1 text-sm text-green-700">
            Enable notifications to receive real-time updates about air quality and weather conditions.
          </p>
          <div className="mt-4">
            <Button
              onClick={handleEnable}
              className="text-sm"
            >
              Enable Notifications
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}