import { CarService } from './core/services/car.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const HEADER_TYPE_NORMAL = 'normal';
const HEADER_TYPE_LANDING = 'landing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CarService],
})
export class AppComponent {
  headerType: string = '';

  constructor(private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.headerType = this.router.url === '/' ? HEADER_TYPE_LANDING : HEADER_TYPE_NORMAL;
    });
  }
}
