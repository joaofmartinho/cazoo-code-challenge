import { NotificationType } from 'src/app/shared/constants/contants';
import { Notification } from './../model/notification';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notification$ = new Subject<Notification>();

  get notification$(): Observable<Notification> {
    return this._notification$.asObservable();
  }

  setNewNotification(type: NotificationType, message: string) {
    if (!type && !message) {
      return;
    }
    this._notification$.next(new Notification(type, message));
  }
}
