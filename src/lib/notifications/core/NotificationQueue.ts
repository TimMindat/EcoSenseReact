import { NotificationOptions } from '../types';

export class NotificationQueue {
  private queue: Array<{ message: string; options: NotificationOptions }> = [];
  private retryAttempts = 3;
  private retryDelay = 5000;

  constructor() {
    this.processQueue();
  }

  add(message: string, options: NotificationOptions): void {
    this.queue.push({ message, options });
  }

  addWithRetry(message: string, options: NotificationOptions, attempts = 0): void {
    if (attempts < this.retryAttempts) {
      setTimeout(() => {
        this.add(message, options);
      }, this.retryDelay * (attempts + 1));
    }
  }

  private processQueue(): void {
    setInterval(() => {
      if (Notification.permission === 'granted' && this.queue.length > 0) {
        const { message, options } = this.queue.shift()!;
        new Notification(message, options);
      }
    }, 1000);
  }
}