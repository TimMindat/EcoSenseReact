import React from 'react';
import { Bell, AlertTriangle, CloudRain, Activity } from 'lucide-react';
import { useNotifications } from '../../lib/hooks/useNotifications';
import { fcmService } from '../../lib/firebase/messaging';

const NOTIFICATION_TOPICS = [
  {
    id: 'air-quality',
    name: 'Air Quality Alerts',
    description: 'Get notified when air quality changes significantly',
    icon: Activity
  },
  {
    id: 'weather',
    name: 'Weather Updates',
    description: 'Receive updates about weather conditions',
    icon: CloudRain
  },
  {
    id: 'alerts',
    name: 'Emergency Alerts',
    description: 'Important notifications about environmental hazards',
    icon: AlertTriangle
  }
];

export function NotificationPreferences() {
  const { isEnabled } = useNotifications();
  const [subscribedTopics, setSubscribedTopics] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleTopicToggle = async (topicId: string) => {
    if (!isEnabled) return;

    setLoading(topicId);
    try {
      if (subscribedTopics.includes(topicId)) {
        await fcmService.unsubscribeFromTopic(topicId);
        setSubscribedTopics(prev => prev.filter(id => id !== topicId));
      } else {
        await fcmService.subscribeToTopic(topicId);
        setSubscribedTopics(prev => [...prev, topicId]);
      }
    } catch (error) {
      console.error('Failed to toggle topic subscription:', error);
    } finally {
      setLoading(null);
    }
  };

  if (!isEnabled) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <Bell className="h-6 w-6 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">
          Enable notifications to manage your preferences
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        Notification Preferences
      </h3>
      
      <div className="space-y-3">
        {NOTIFICATION_TOPICS.map(topic => {
          const Icon = topic.icon;
          const isSubscribed = subscribedTopics.includes(topic.id);
          const isLoading = loading === topic.id;

          return (
            <div
              key={topic.id}
              className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${isSubscribed ? 'text-green-600' : 'text-gray-400'}`} />
                <div>
                  <p className="font-medium text-gray-900">{topic.name}</p>
                  <p className="text-sm text-gray-500">{topic.description}</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isSubscribed}
                  disabled={isLoading}
                  onChange={() => handleTopicToggle(topic.id)}
                />
                <div className={`
                  w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-green-300 rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600
                  ${isLoading ? 'opacity-50' : ''}
                `} />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}