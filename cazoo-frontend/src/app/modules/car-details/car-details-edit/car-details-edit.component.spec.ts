import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { CarService } from 'src/app/core/services/car.service';

import { CarDetailsEditComponent } from './car-details-edit.component';

describe('CarDetailsEditComponent', () => {
  let component: CarDetailsEditComponent;
  let fixture: ComponentFixture<CarDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetailsEditComponent],
      providers: [{ provide: CarService }],
      imports: [AppModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
