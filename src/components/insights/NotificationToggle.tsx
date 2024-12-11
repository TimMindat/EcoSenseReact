import React from 'react';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { useNotificationService } from '../../lib/notifications/hooks/useNotificationService';

export function NotificationToggle() {
  const { supported, permission, loading, requestPermission } = useNotificationService();

  if (!supported) {
    return null;
  }

  const isEnabled = permission === 'granted';

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
              ? 'You will receive daily and hourly air quality updates'
              : 'Get real-time updates about air quality changes'}
          </p>
        </div>
      </div>
      
      <Button
        onClick={requestPermission}
        disabled={loading || isEnabled}
        variant={isEnabled ? 'secondary' : 'primary'}
        className="ml-4"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isEnabled ? (
          'Enabled'
        ) : (
          'Enable'
        )}
      </Button>
    </div>
  );
}