import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display according to headerTyepe', () => {
    component.headerType = 'landing';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('header header-landing'))).toBeTruthy;
    expect(fixture.debugElement.query(By.css('header header-normal'))).toBeFalsy;
  });
});
