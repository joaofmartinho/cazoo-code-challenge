import { Notification } from './core/model/notification';
import { CarService } from './core/services/car.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './core/services/notification.service';
import { Subject } from 'rxjs';

const HEADER_TYPE_NORMAL = 'normal';
const HEADER_TYPE_LANDING = 'landing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CarService]
})
export class AppComponent implements OnInit, OnDestroy {
  private destroySubscriptions$ = new Subject<void>();
  headerType: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar, private notificationService: NotificationService) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.headerType = this.router.url === '/' ? HEADER_TYPE_LANDING : HEADER_TYPE_NORMAL;
    });
  }

  ngOnInit() {
    this.notificationService.notification$
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe((notification: Notification) => {
        let classType = '';
        if (notification.type === 'error') {
          classType = 'notification-error';
        } else if (notification.type === 'success') {
          classType = 'notification-success';
        }

        this.snackBar.open(notification.message, '', {
          duration: 2500,
          panelClass: ['mat-toolbar', classType]
        });
      });
  }

  ngOnDestroy() {
    this.destroySubscriptions$.complete();
  }
}
