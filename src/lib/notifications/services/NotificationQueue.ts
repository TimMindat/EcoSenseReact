import type { NotificationPayload } from '../types';

export class NotificationQueue {
  private queue: NotificationPayload[] = [];
  private readonly maxRetries = 3;
  private readonly retryDelay = 5000;

  add(notification: NotificationPayload): void {
    this.queue.push(notification);
  }

  addWithRetry(notification: NotificationPayload, attempt = 0): void {
    if (attempt < this.maxRetries) {
      setTimeout(() => {
        this.add(notification);
      }, this.retryDelay * (attempt + 1));
    }
  }

  getAll(): NotificationPayload[] {
    return [...this.queue];
  }

  clear(): void {
    this.queue = [];
  }
}