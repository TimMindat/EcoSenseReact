import { NotificationLogger } from '../core/NotificationLogger';
import { type NotificationPayload } from '../types';

export class MessageHandler {
  private logger: NotificationLogger;

  constructor() {
    this.logger = new NotificationLogger();
  }

  handleForegroundMessage(payload: any): void {
    try {
      if (Notification.permission !== 'granted') return;

      const notification = this.createNotification(payload);
      this.setupNotificationClickHandler(notification, payload.data);
    } catch (error) {
      this.logger.error('Failed to handle foreground message:', error);
    }
  }

  async showNotification(payload: NotificationPayload): Promise<void> {
    if (Notification.permission !== 'granted') {
      throw new Error('Notification permission not granted');
    }

    const notification = new Notification(payload.title, {
      body: payload.body,
      icon: '/icons/notification-icon.png',
      badge: '/icons/badge-icon.png',
      tag: payload.tag,
      data: payload.data,
      requireInteraction: payload.requireInteraction
    });

    this.setupNotificationClickHandler(notification, payload.data);
  }

  private createNotification(payload: any): Notification {
    return new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: '/icons/notification-icon.png',
      badge: '/icons/badge-icon.png',
      tag: payload.data?.tag || 'default',
      data: payload.data
    });
  }

  private setupNotificationClickHandler(notification: Notification, data?: any): void {
    notification.onclick = () => {
      window.focus();
      notification.close();
      
      if (data?.url) {
        window.location.href = data.url;
      }
    };
  }
}