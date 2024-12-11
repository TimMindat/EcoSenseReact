import { getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging';
import { app } from '../../firebase';
import { TokenManager } from './TokenManager';
import { NotificationLogger } from './NotificationLogger';
import { ServiceWorkerManager } from './ServiceWorkerManager';
import { MessageHandler } from '../handlers/MessageHandler';
import { type NotificationPayload } from '../types';

export class NotificationManager {
  private static instance: NotificationManager;
  private messaging;
  private tokenManager: TokenManager;
  private logger: NotificationLogger;
  private messageHandler: MessageHandler;

  private constructor() {
    this.messaging = getMessaging(app);
    this.tokenManager = new TokenManager();
    this.logger = new NotificationLogger();
    this.messageHandler = new MessageHandler();
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  async init(): Promise<void> {
    try {
      await ServiceWorkerManager.register();
      this.setupMessageHandling();
    } catch (error) {
      this.logger.error('Failed to initialize notifications:', error);
      throw error;
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      if (!('Notification' in window)) {
        throw new Error('Notifications not supported');
      }
      return await Notification.requestPermission() === 'granted';
    } catch (error) {
      this.logger.error('Permission request failed:', error);
      return false;
    }
  }

  private setupMessageHandling(): void {
    onMessage(this.messaging, (payload) => {
      this.messageHandler.handleForegroundMessage(payload);
    });
  }

  async sendNotification(payload: NotificationPayload): Promise<void> {
    try {
      await this.messageHandler.showNotification(payload);
      this.logger.log('Notification sent', { success: true });
    } catch (error) {
      this.logger.error('Failed to send notification:', error);
      throw error;
    }
  }

  async getToken(userId: string): Promise<string | null> {
    return this.tokenManager.getOrGenerateToken(userId, this.messaging);
  }

  async deleteToken(userId: string): Promise<void> {
    await this.tokenManager.deleteToken(userId, this.messaging);
  }
}