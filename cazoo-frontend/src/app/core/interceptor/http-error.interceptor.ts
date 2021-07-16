import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationType } from 'src/app/shared/constants/contants';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
          this.notificationService.setNewNotification(NotificationType.NOTIFICATION_ERROR, errorMessage);
        } else {
          /* Send message for backend for example or deal with untreated calls */
        }
        return throwError(errorMessage);
      })
    );
  };
}
