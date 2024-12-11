import { NotificationQueue } from './NotificationQueue';
import { NotificationLogger } from './NotificationLogger';
import { NotificationOptions } from '../types';

export class NotificationService {
  private static instance: NotificationService;
  private queue: NotificationQueue;
  private logger: NotificationLogger;

  private constructor() {
    this.queue = new NotificationQueue();
    this.logger = new NotificationLogger();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async requestPermission(): Promise<boolean> {
    try {
      if (!('Notification' in window)) {
        this.logger.error('Notifications not supported');
        return false;
      }

      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      this.logger.error('Permission request failed', error);
      return false;
    }
  }

  async send(message: string, options: NotificationOptions): Promise<void> {
    if (Notification.permission !== 'granted') {
      this.queue.add(message, options);
      return;
    }

    try {
      const notification = new Notification(message, options);
      notification.onclick = this.handleNotificationClick;
      this.logger.log('Notification sent', { message, success: true });
    } catch (error) {
      this.logger.error('Failed to send notification', error);
      this.queue.addWithRetry(message, options);
    }
  }

  private handleNotificationClick = () => {
    window.focus();
  };
}