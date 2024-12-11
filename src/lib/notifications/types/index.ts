export interface NotificationPayload {
  title: string;
  body: string;
  tag?: string;
  data?: {
    url?: string;
    [key: string]: any;
  };
  requireInteraction?: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  topics: string[];
  schedule: {
    daily: boolean;
    hourly: boolean;
    emergencyOnly: boolean;
  };
}

export interface TokenData {
  token: string;
  createdAt: string;
  platform: string;
  userAgent: string;
}