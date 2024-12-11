import { NotificationService } from '../core/NotificationService';
import { createDailyInsightNotification, createHourlyInsightNotification } from '../templates/insightTemplates';
import { AirQualityData } from '../../types/airQuality';
import { WeatherResponse } from '../../types/weather';

export class InsightNotificationService {
  private static instance: InsightNotificationService;
  private notificationService: NotificationService;
  private dailySchedule: number | null = null;
  private hourlySchedule: number | null = null;

  private constructor() {
    this.notificationService = NotificationService.getInstance();
  }

  static getInstance(): InsightNotificationService {
    if (!InsightNotificationService.instance) {
      InsightNotificationService.instance = new InsightNotificationService();
    }
    return InsightNotificationService.instance;
  }

  async startDailyInsights(airQuality: AirQualityData, weather: WeatherResponse) {
    if (this.dailySchedule) return;

    const notification = createDailyInsightNotification(airQuality, weather);
    await this.notificationService.send(notification.title, notification.options);

    // Schedule daily notifications at 9 AM
    const now = new Date();
    const next9AM = new Date(now);
    next9AM.setHours(9, 0, 0, 0);
    if (now > next9AM) next9AM.setDate(next9AM.getDate() + 1);

    const timeUntil9AM = next9AM.getTime() - now.getTime();
    this.dailySchedule = window.setTimeout(() => {
      this.sendDailyInsight(airQuality, weather);
      // Repeat daily
      this.dailySchedule = window.setInterval(
        () => this.sendDailyInsight(airQuality, weather),
        24 * 60 * 60 * 1000
      );
    }, timeUntil9AM);
  }

  async startHourlyInsights(airQuality: AirQualityData) {
    if (this.hourlySchedule) return;

    const notification = createHourlyInsightNotification(airQuality);
    await this.notificationService.send(notification.title, notification.options);

    // Schedule hourly notifications
    this.hourlySchedule = window.setInterval(
      () => this.sendHourlyInsight(airQuality),
      60 * 60 * 1000
    );
  }

  private async sendDailyInsight(airQuality: AirQualityData, weather: WeatherResponse) {
    const notification = createDailyInsightNotification(airQuality, weather);
    await this.notificationService.send(notification.title, notification.options);
  }

  private async sendHourlyInsight(airQuality: AirQualityData) {
    const notification = createHourlyInsightNotification(airQuality);
    await this.notificationService.send(notification.title, notification.options);
  }

  stopInsights() {
    if (this.dailySchedule) {
      clearInterval(this.dailySchedule);
      this.dailySchedule = null;
    }
    if (this.hourlySchedule) {
      clearInterval(this.hourlySchedule);
      this.hourlySchedule = null;
    }
  }
}