import { NotificationManager } from '../NotificationManager';
import { NotificationQueue } from './NotificationQueue';
import { NotificationLogger } from './NotificationLogger';
import { validateNotificationPermission } from '../utils/validation';
import { createNotificationOptions } from '../utils/options';
import type { NotificationPayload } from '../types';

export class NotificationService {
  private static instance: NotificationService;
  private manager: NotificationManager;
  private queue: NotificationQueue;
  private logger: NotificationLogger;

  private constructor() {
    this.manager = NotificationManager.getInstance();
    this.queue = new NotificationQueue();
    this.logger = new NotificationLogger();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async send(payload: NotificationPayload): Promise<boolean> {
    try {
      const permission = await validateNotificationPermission();
      if (!permission) {
        this.queue.add(payload);
        return false;
      }

      const options = createNotificationOptions(payload);
      const notification = new Notification(payload.title, options);

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      this.logger.log('Notification sent', { success: true, payload });
      return true;
    } catch (error) {
      this.logger.error('Failed to send notification', error);
      this.queue.addWithRetry(payload);
      return false;
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      this.logger.error('Notifications not supported');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';

      if (granted) {
        this.processQueue();
      }

      return granted;
    } catch (error) {
      this.logger.error('Failed to request permission', error);
      return false;
    }
  }

  private async processQueue(): Promise<void> {
    const queuedNotifications = this.queue.getAll();
    for (const notification of queuedNotifications) {
      await this.send(notification);
    }
    this.queue.clear();
  }
}