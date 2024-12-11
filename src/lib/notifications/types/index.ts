export interface NotificationOptions extends NotificationOptions {
  requireInteraction?: boolean;
  tag?: string;
}

export interface NotificationPreferences {
  enabled: boolean;
  dailyUpdates: boolean;
  hourlyAlerts: boolean;
  schedule: {
    hour: number;
    minute: number;
  };
}