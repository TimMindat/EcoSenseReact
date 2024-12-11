import React from 'react';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { useNotifications } from '../../lib/hooks/useNotifications';

export function NotificationToggle() {
  const { 
    isEnabled,
    loading,
    error,
    requestPermission,
    unsubscribe
  } = useNotifications();

  const handleToggle = async () => {
    if (isEnabled) {
      await unsubscribe();
    } else {
      await requestPermission();
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3">
        {isEnabled ? (
          <Bell className="h-5 w-5 text-green-600" />
        ) : (
          <BellOff className="h-5 w-5 text-gray-400" />
        )}
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {isEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
          </h3>
          <p className="text-sm text-gray-500">
            {isEnabled 
              ? 'You will receive real-time updates about air quality changes'
              : 'Get instant alerts about important environmental changes'}
          </p>
          {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
          )}
        </div>
      </div>
      
      <Button
        onClick={handleToggle}
        disabled={loading}
        variant={isEnabled ? 'secondary' : 'primary'}
        className="ml-4"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isEnabled ? (
          'Disable'
        ) : (
          'Enable'
        )}
      </Button>
    </div>
  );
}