import { NotificationLogger } from './NotificationLogger';

export class ServiceWorkerManager {
  private static logger = new NotificationLogger();

  static async register(): Promise<void> {
    try {
      if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker not supported');
      }

      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/'
      });

      this.logger.log('Service Worker registered', { success: true });
      return registration;
    } catch (error) {
      this.logger.error('Service Worker registration failed:', error);
      throw error;
    }
  }
}