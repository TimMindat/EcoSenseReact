import { Messaging, getToken, deleteToken } from 'firebase/messaging';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { TokenStorage } from '../storage/TokenStorage';
import { NotificationLogger } from './NotificationLogger';

const VAPID_KEY = 'BHgGtZwQJGxqXF4Qk8qJEVYm_8q_TXlvDz0tDzE_XKzhzYHpJ3_YYxgqxZqxZqxZqxZqxZqxZqxZqxZqxZq';

export class TokenManager {
  private storage: TokenStorage;
  private logger: NotificationLogger;

  constructor() {
    this.storage = new TokenStorage();
    this.logger = new NotificationLogger();
  }

  async getOrGenerateToken(userId: string, messaging: Messaging): Promise<string | null> {
    try {
      let token = await this.storage.getToken();
      
      if (!token) {
        token = await this.generateNewToken(messaging);
        if (token) {
          await this.saveToken(userId, token);
        }
      }

      return token;
    } catch (error) {
      this.logger.error('Token generation failed:', error);
      return null;
    }
  }

  private async generateNewToken(messaging: Messaging): Promise<string | null> {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      return await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration
      });
    } catch (error) {
      this.logger.error('Failed to generate token:', error);
      return null;
    }
  }

  private async saveToken(userId: string, token: string): Promise<void> {
    try {
      await Promise.all([
        this.storage.saveToken(token),
        setDoc(doc(db, 'fcm_tokens', userId), {
          token,
          createdAt: new Date().toISOString(),
          platform: 'web',
          userAgent: navigator.userAgent
        })
      ]);
    } catch (error) {
      this.logger.error('Failed to save token:', error);
      throw error;
    }
  }

  async deleteToken(userId: string, messaging: Messaging): Promise<void> {
    try {
      const token = await this.storage.getToken();
      if (token) {
        await Promise.all([
          deleteToken(messaging),
          deleteDoc(doc(db, 'fcm_tokens', userId)),
          this.storage.removeToken()
        ]);
      }
    } catch (error) {
      this.logger.error('Failed to delete token:', error);
      throw error;
    }
  }
}