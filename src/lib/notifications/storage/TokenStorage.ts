import { openDB } from 'idb';
import { NotificationLogger } from '../core/NotificationLogger';

const DB_NAME = 'fcm_store';
const STORE_NAME = 'tokens';
const TOKEN_KEY = 'fcm_token';

export class TokenStorage {
  private logger: NotificationLogger;

  constructor() {
    this.logger = new NotificationLogger();
  }

  private async getDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
  }

  async getToken(): Promise<string | null> {
    try {
      const db = await this.getDB();
      return db.get(STORE_NAME, TOKEN_KEY);
    } catch (error) {
      this.logger.error('Failed to get token from storage:', error);
      return null;
    }
  }

  async saveToken(token: string): Promise<void> {
    try {
      const db = await this.getDB();
      await db.put(STORE_NAME, token, TOKEN_KEY);
    } catch (error) {
      this.logger.error('Failed to save token to storage:', error);
      throw error;
    }
  }

  async removeToken(): Promise<void> {
    try {
      const db = await this.getDB();
      await db.delete(STORE_NAME, TOKEN_KEY);
    } catch (error) {
      this.logger.error('Failed to remove token from storage:', error);
      throw error;
    }
  }
}