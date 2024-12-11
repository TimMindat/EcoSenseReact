export interface NotificationPayload {
  title: string;
  body: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  options?: Partial<NotificationOptions>;
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