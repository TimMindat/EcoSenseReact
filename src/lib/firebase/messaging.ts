import { getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { app, db } from './index';
import { NotificationLogger } from '../notifications/core/NotificationLogger';
import { getTokenFromStorage, saveTokenToStorage, removeTokenFromStorage } from '../utils/tokenStorage';

const VAPID_KEY = 'BHgGtZwQJGxqXF4Qk8qJEVYm_8q_TXlvDz0tDzE_XKzhzYHpJ3_YYxgqxZqxZqxZqxZqxZqxZqxZqxZqxZq';

class FCMService {
  private static instance: FCMService;
  private messaging;
  private logger;

  private constructor() {
    this.messaging = getMessaging(app);
    this.logger = new NotificationLogger();
  }

  static getInstance(): FCMService {
    if (!FCMService.instance) {
      FCMService.instance = new FCMService();
    }
    return FCMService.instance;
  }

  async init(): Promise<void> {
    try {
      if (!('Notification' in window)) {
        throw new Error('This browser does not support notifications');
      }

      // Register service worker
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/'
        });
        console.log('Service Worker registered:', registration);
      }

      // Set up message handler
      onMessage(this.messaging, (payload) => {
        console.log('Received foreground message:', payload);
        this.handleForegroundMessage(payload);
      });

    } catch (error) {
      this.logger.error('Failed to initialize FCM:', error);
      throw error;
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      this.logger.error('Failed to request notification permission:', error);
      return false;
    }
  }

  async getOrGenerateToken(userId: string): Promise<string | null> {
    try {
      // Check storage first
      let token = await getTokenFromStorage();
      
      if (!token) {
        // Generate new token
        token = await getToken(this.messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
        });

        if (token) {
          // Save token
          await this.saveToken(userId, token);
          await saveTokenToStorage(token);
        }
      }

      return token;
    } catch (error) {
      this.logger.error('Failed to generate FCM token:', error);
      return null;
    }
  }

  private async saveToken(userId: string, token: string): Promise<void> {
    try {
      await setDoc(doc(db, 'fcm_tokens', userId), {
        token,
        createdAt: new Date().toISOString(),
        platform: 'web',
        userAgent: navigator.userAgent
      });
    } catch (error) {
      this.logger.error('Failed to save FCM token:', error);
      throw error;
    }
  }

  async deleteToken(userId: string): Promise<void> {
    try {
      const token = await getTokenFromStorage();
      if (token) {
        await deleteToken(this.messaging);
        await deleteDoc(doc(db, 'fcm_tokens', userId));
        await removeTokenFromStorage();
      }
    } catch (error) {
      this.logger.error('Failed to delete FCM token:', error);
      throw error;
    }
  }

  async subscribeToTopic(topic: string): Promise<void> {
    const token = await getTokenFromStorage();
    if (!token) {
      throw new Error('No FCM token available');
    }

    try {
      // Subscribe to topic (handled by backend)
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, topic })
      });
    } catch (error) {
      this.logger.error(`Failed to subscribe to topic ${topic}:`, error);
      throw error;
    }
  }

  async unsubscribeFromTopic(topic: string): Promise<void> {
    const token = await getTokenFromStorage();
    if (!token) {
      throw new Error('No FCM token available');
    }

    try {
      // Unsubscribe from topic (handled by backend)
      await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, topic })
      });
    } catch (error) {
      this.logger.error(`Failed to unsubscribe from topic ${topic}:`, error);
      throw error;
    }
  }

  private handleForegroundMessage(payload: any): void {
    // Create and show notification
    if (Notification.permission === 'granted') {
      const notification = new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/icons/notification-icon.png',
        badge: '/icons/badge-icon.png',
        tag: payload.data?.tag || 'default',
        data: payload.data
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
        
        // Handle click action
        if (payload.data?.url) {
          window.location.href = payload.data.url;
        }
      };
    }
  }
}

export const fcmService = FCMService.getInstance();