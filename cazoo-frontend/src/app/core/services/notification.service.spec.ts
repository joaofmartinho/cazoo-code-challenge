import { NotificationType } from 'src/app/shared/constants/contants';
import { TestBed } from '@angular/core/testing';
import { Notification } from '../model/notification';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    notificationService = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should emit a new error', done => {
    const mockError: Notification = new Notification(NotificationType.NOTIFICATION_ERROR, 'This is a test Error');

    notificationService.notification$.subscribe(data => {
      expect(data).toEqual(mockError);
      done();
    });

    notificationService.setNewNotification(NotificationType.NOTIFICATION_ERROR, 'This is a test Error');
  });
});
