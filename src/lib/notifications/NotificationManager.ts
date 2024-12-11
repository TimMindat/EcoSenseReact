import { formatAQIMessage } from '../utils/formatting';
import { getAQIStatus } from '../utils/airQuality';
import { AirQualityData } from '../types/airQuality';

export class NotificationManager {
  private static instance: NotificationManager;
  private notificationQueue: Array<{ message: string; options: NotificationOptions }> = [];
  private retryAttempts = 3;
  private retryDelay = 5000; // 5 seconds

  private constructor() {
    this.processQueue();
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  async requestPermission(): Promise<boolean> {
    try {
      if (!('Notification' in window)) {
        console.error('Notifications not supported');
        return false;
      }

      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  async sendWelcomeNotification(airQuality: AirQualityData): Promise<void> {
    const { label, color } = getAQIStatus(airQuality.list[0].main.aqi);
    
    const message = `Welcome to EcoPulse! Current air quality is ${label}.`;
    const options = {
      body: formatAQIMessage(airQuality),
      icon: '/icons/notification-icon.png',
      badge: '/icons/badge-icon.png',
      tag: 'welcome',
      requireInteraction: true
    };

    await this.sendNotification(message, options);
  }

  async sendAirQualityUpdate(airQuality: AirQualityData, significant: boolean = false): Promise<void> {
    const { label } = getAQIStatus(airQuality.list[0].main.aqi);
    
    const message = significant 
      ? `⚠️ Significant change in air quality: ${label}`
      : `Current air quality: ${label}`;
      
    const options = {
      body: formatAQIMessage(airQuality),
      icon: '/icons/notification-icon.png',
      tag: 'air-quality-update',
      requireInteraction: significant
    };

    await this.sendNotification(message, options);
  }

  private async sendNotification(
    message: string, 
    options: NotificationOptions, 
    attempts: number = 0
  ): Promise<void> {
    if (Notification.permission !== 'granted') {
      this.notificationQueue.push({ message, options });
      return;
    }

    try {
      const notification = new Notification(message, options);
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      this.logNotification(message, true);
    } catch (error) {
      console.error('Error sending notification:', error);
      this.logNotification(message, false, error);

      if (attempts < this.retryAttempts) {
        setTimeout(() => {
          this.sendNotification(message, options, attempts + 1);
        }, this.retryDelay * (attempts + 1));
      }
    }
  }

  private async processQueue(): Promise<void> {
    setInterval(() => {
      if (Notification.permission === 'granted' && this.notificationQueue.length > 0) {
        const { message, options } = this.notificationQueue.shift()!;
        this.sendNotification(message, options);
      }
    }, 1000);
  }

  private logNotification(message: string, success: boolean, error?: any): void {
    const log = {
      timestamp: new Date().toISOString(),
      message,
      success,
      error: error ? error.message : undefined
    };

    console.log('Notification log:', log);
    // Here you could also send logs to your analytics service
  }
}