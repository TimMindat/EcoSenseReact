import React, { useState, useCallback } from 'react';
import { Download, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInstallPrompt } from '../lib/pwa/hooks/useInstallPrompt';
import { Button } from './Button';

export function InstallPrompt() {
  const { canShow, hasUserDeclined, setUserDeclined, promptInstall } = useInstallPrompt();
  const [showPrompt, setShowPrompt] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);

  // Don't render anything if we shouldn't show the prompt
  if (!canShow || hasUserDeclined || !showPrompt) {
    return null;
  }

  const handleInstall = async () => {
    try {
      setIsInstalling(true);
      const installed = await promptInstall();
      if (!installed) {
        setShowPrompt(false);
      }
    } finally {
      setIsInstalling(false);
    }
  };

  const handleRemindLater = () => {
    setShowPrompt(false);
    // Show again after 3 days
    const REMIND_DELAY = 3 * 24 * 60 * 60 * 1000;
    setTimeout(() => setShowPrompt(true), REMIND_DELAY);
  };

  const handleDecline = () => {
    setUserDeclined(true);
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-x-0 bottom-0 z-50"
      >
        <div className="bg-white shadow-lg border-t border-gray-200 p-4 pb-safe">
          <div className="max-w-xl mx-auto relative">
            <button
              onClick={handleDecline}
              className="absolute -top-2 -right-2 p-2 text-gray-400 hover:text-gray-600 rounded-full"
              aria-label="Close installation prompt"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Install EcoSense
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Get quick access to air quality data and receive instant alerts.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button 
                    onClick={handleInstall}
                    loading={isInstalling}
                  >
                    Install Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRemindLater}
                    className="inline-flex items-center"
                    disabled={isInstalling}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Remind Me Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}