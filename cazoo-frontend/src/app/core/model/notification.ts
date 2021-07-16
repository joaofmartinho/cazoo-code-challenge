import { NotificationType } from 'src/app/shared/constants/contants';

export class Notification {
  public type: NotificationType;
  public message: string;

  constructor(type: NotificationType, message: string) {
    this.type = type;
    this.message = message;
  }
}
