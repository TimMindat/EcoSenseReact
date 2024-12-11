interface NotificationLog {
  timestamp: string;
  message: string;
  success: boolean;
  error?: string;
}

export class NotificationLogger {
  private logs: NotificationLog[] = [];

  log(message: string, data: { success: boolean; error?: any }): void {
    const log: NotificationLog = {
      timestamp: new Date().toISOString(),
      message,
      success: data.success,
      error: data.error?.message
    };

    this.logs.push(log);
    console.log('Notification:', log);
  }

  error(message: string, error?: any): void {
    this.log(message, { success: false, error });
  }

  getLogs(): NotificationLog[] {
    return [...this.logs];
  }
}