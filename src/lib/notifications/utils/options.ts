import type { NotificationPayload } from '../types';

export function createNotificationOptions(payload: NotificationPayload): NotificationOptions {
  return {
    body: payload.body,
    icon: 'https://i.imgur.com/4vkOF6D.png',
    badge: 'https://i.imgur.com/4vkOF6D.png',
    tag: payload.tag,
    requireInteraction: payload.requireInteraction ?? false,
    silent: payload.silent ?? false,
    ...payload.options
  };
}